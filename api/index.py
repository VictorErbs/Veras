import os
import secrets
import uuid
from datetime import datetime, timezone
from typing import Optional, List
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, Column, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session

load_dotenv()

# Instância FastAPI
app = FastAPI(title="Studio Renata Veras API", version="1.0.0")

# Habilita CORS para desenvolvimento local e produção
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexão com Banco de Dados - carregada estritamente via variável de ambiente (.env ou Vercel)
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("Falha de configuração: DATABASE_URL não definida nas variáveis de ambiente.")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    connect_args={"connect_timeout": 10} if "postgresql" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelo ORM para a tabela clients
class ClientDB(Base):
    __tablename__ = "clients"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    lgpd_consent = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Autenticação HTTP Basic - credenciais carregadas estritamente via ambiente (.env ou Vercel)
security = HTTPBasic()
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

def authenticate_admin(credentials: HTTPBasicCredentials = Depends(security)):
    if not ADMIN_USERNAME or not ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Falha de segurança: ADMIN_USERNAME e ADMIN_PASSWORD não configurados no servidor."
        )
    correct_user = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_pass = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_user and correct_pass):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Schemas de Entrada
class ClientCreate(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=1)
    email: Optional[str] = None
    lgpdConsent: bool

def to_response(client: ClientDB) -> dict:
    created = client.created_at
    if created is None:
        created_str = datetime.now(timezone.utc).isoformat()
    elif isinstance(created, str):
        created_str = created
    else:
        created_str = created.isoformat()

    return {
        "id": str(client.id),
        "name": client.name,
        "phone": client.phone,
        "email": client.email,
        "lgpdConsent": bool(client.lgpd_consent),
        "createdAt": created_str,
    }

# Rotas
@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "veras-python-api"}

@app.post("/api/clients", status_code=status.HTTP_201_CREATED)
@app.post("/clients", status_code=status.HTTP_201_CREATED)
def create_client(client_data: ClientCreate, db: Session = Depends(get_db)):
    if not client_data.lgpdConsent:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O consentimento da LGPD é obrigatório"
        )
    
    clean_email = client_data.email.strip() if client_data.email and client_data.email.strip() else None
    new_client = ClientDB(
        id=str(uuid.uuid4()),
        name=client_data.name.strip(),
        phone=client_data.phone.strip(),
        email=clean_email,
        lgpd_consent=client_data.lgpdConsent,
        created_at=datetime.now(timezone.utc)
    )
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return to_response(new_client)

@app.get("/api/clients")
@app.get("/clients")
def list_clients(admin: str = Depends(authenticate_admin), db: Session = Depends(get_db)):
    clients = db.query(ClientDB).order_by(ClientDB.created_at.desc()).all()
    return [to_response(c) for c in clients]

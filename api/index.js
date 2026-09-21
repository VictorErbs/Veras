// Importação das dependências centrais da API
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');

// Carrega variáveis de ambiente do arquivo .env (local ou serverless)
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch (e) {}
require('dotenv').config();

const app = express();

// Middleware de CORS para permitir requisições de qualquer origem
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser para requisições com corpo em JSON
app.use(express.json());

// Configuração do pool de conexão com o banco PostgreSQL no Supabase
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!DATABASE_URL) {
  console.error("ERRO CRÍTICO: DATABASE_URL não configurada no ambiente.");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Permite certificados autoassinados da nuvem
  connectionTimeoutMillis: 5000,
});

// Teste de conexão no cold start da função serverless
pool.query('SELECT NOW()').catch(err => console.error("Erro na conexão com banco:", err));

// Middleware de segurança Basic Auth para proteção das rotas administrativas
function basicAuth(req, res, next) {
  const adminUser = (process.env.ADMIN_USERNAME || '').trim();
  const adminPass = (process.env.ADMIN_PASSWORD || '').trim();

  if (!adminUser || !adminPass) {
    return res.status(500).json({ detail: "Credenciais de administrador não configuradas no ambiente." });
  }

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).json({ detail: "Credenciais inválidas" });
  }

  // Decodifica as credenciais enviadas em Base64
  const b64auth = authHeader.split(' ')[1] || '';
  const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Validação: usuário case-insensitive e senha exata
  if (user && password) {
    const inputUser = user.trim().toLowerCase();
    const expectedUser = adminUser.toLowerCase();

    if (inputUser === expectedUser && password.trim() === adminPass) {
      return next();
    }
  }

  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).json({ detail: "Credenciais inválidas" });
}

// ROTA 1: Verificação de saúde e disponibilidade da API
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', service: 'veras-node-api' });
});

// ROTA 2: Cadastro público de novos clientes (Leads VIP)
app.post(['/clients', '/api/clients'], async (req, res) => {
  const { name, phone, email, lgpdConsent } = req.body || {};

  // Validações obrigatórias de campos e LGPD
  if (!lgpdConsent) {
    return res.status(400).json({ detail: "O consentimento da LGPD é obrigatório" });
  }
  if (!name || name.trim().length === 0) {
    return res.status(422).json({ detail: "Nome é obrigatório" });
  }
  if (!phone || phone.trim().length === 0) {
    return res.status(422).json({ detail: "Telefone é obrigatório" });
  }

  try {
    const query = `
      INSERT INTO clients (name, phone, email, lgpd_consent) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id, name, phone, email, lgpd_consent as "lgpdConsent", created_at as "createdAt"
    `;
    const cleanEmail = (email || '').trim() || null;
    const values = [name.trim(), phone.trim(), cleanEmail, lgpdConsent];
    
    // Executa a inserção no Supabase
    const result = await pool.query(query, values);
    const client = result.rows[0];
    
    res.status(201).json(client);
  } catch (err) {
    console.error("Erro ao inserir client:", err);
    res.status(500).json({ detail: "Erro interno no banco de dados" });
  }
});

// ROTA 3: Listagem protegida de clientes cadastrados (Apenas administradores autenticados)
app.get(['/clients', '/api/clients'], basicAuth, async (req, res) => {
  try {
    const query = `
      SELECT id, name, phone, email, lgpd_consent as "lgpdConsent", created_at as "createdAt" 
      FROM clients 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar clients:", err);
    res.status(500).json({ detail: "Erro interno no banco de dados" });
  }
});

// Exporta o app para o ambiente Serverless da Vercel
module.exports = app;

// Executa servidor HTTP convencional caso executado localmente via "npm run api"
if (require.main === module) {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Veras Node API rodando na porta ${port}`);
  });
}

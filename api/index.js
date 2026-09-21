const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const crypto = require('crypto');

const path = require('path');

// Carrega variáveis do arquivo .env
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch (e) {}
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Configura conexão com o Supabase PostgreSQL
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres.mlbrsyjdwylgyrfkodvv:NobfwDM3CCZPyK04@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

// Testa a conexão no cold start
pool.query('SELECT NOW()').catch(err => console.error("Erro na conexão com banco:", err));

function basicAuth(req, res, next) {
  const adminUser = (process.env.ADMIN_USERNAME || 'veras').trim();
  const adminPass = (process.env.ADMIN_PASSWORD || 'veras123').trim();

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).json({ detail: "Credenciais inválidas" });
  }

  const b64auth = authHeader.split(' ')[1] || '';
  const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');

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

// Rotas
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', service: 'veras-node-api' });
});

app.post(['/clients', '/api/clients'], async (req, res) => {
  const { name, phone, email, lgpdConsent } = req.body || {};

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
    
    const result = await pool.query(query, values);
    const client = result.rows[0];
    
    res.status(201).json(client);
  } catch (err) {
    console.error("Erro ao inserir client:", err);
    res.status(500).json({ detail: "Erro interno no banco de dados" });
  }
});

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

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Veras Node API rodando na porta ${port}`);
  });
}

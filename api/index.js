// Importação das dependências centrais da API
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');

// Carrega variáveis de ambiente do arquivo .env (local )
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch (e) { }
require('dotenv').config();

const app = express();

// Middleware de CORS: permite mesmo domínio, localhost em dev, previews da Vercel ou origens configuradas
const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.length > 0) {
      return callback(null, allowedOrigins.includes(origin));
    }
    const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    const isVercel = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
    return callback(null, isLocal || isVercel);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser para requisições com corpo em JSON
app.use(express.json({ limit: '16kb' }));

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

// Comparação em tempo constante para evitar timing attacks
function safeEqual(a, b) {
  const bufA = Buffer.from(String(a), 'utf8');
  const bufB = Buffer.from(String(b), 'utf8');
  if (bufA.length !== bufB.length) {
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

// Rate limiter simples em memória para proteção contra spam no cadastro público
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function rateLimitLeads(req, res, next) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.ip) || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ detail: "Muitas tentativas. Aguarde um minuto e tente novamente." });
  }

  entry.count += 1;
  return next();
}

// Middleware de segurança Basic Auth para proteção das rotas administrativas
function basicAuth(req, res, next) {
  const adminUser = (process.env.ADMIN_USERNAME || '').trim();
  const adminPass = process.env.ADMIN_PASSWORD || '';

  if (!adminUser || !adminPass) {
    return res.status(500).json({ detail: "Credenciais de administrador não configuradas no ambiente." });
  }

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).json({ detail: "Credenciais inválidas" });
  }

  // Decodifica as credenciais enviadas em Base64 (preservando ':' na senha)
  const b64auth = authHeader.slice(6);
  const decoded = Buffer.from(b64auth, 'base64').toString('utf8');
  const sepIndex = decoded.indexOf(':');
  if (sepIndex === -1) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).json({ detail: "Credenciais inválidas" });
  }

  const user = decoded.slice(0, sepIndex);
  const password = decoded.slice(sepIndex + 1);

  // Validação: usuário case-insensitive e senha exata em tempo constante
  const inputUser = user.trim().toLowerCase();
  const expectedUser = adminUser.toLowerCase();

  if (safeEqual(inputUser, expectedUser) && safeEqual(password, adminPass)) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="401"');
  res.status(401).json({ detail: "Credenciais inválidas" });
}

// ROTA 1: Verificação de saúde e disponibilidade da API
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', service: 'veras-node-api' });
});

// ROTA 2: Cadastro público de novos clientes (Leads VIP)
app.post(['/clients', '/api/clients'], rateLimitLeads, async (req, res) => {
  const { name, phone, email, lgpdConsent } = req.body || {};

  // Validações obrigatórias de campos e LGPD
  if (lgpdConsent !== true) {
    return res.status(400).json({ detail: "O consentimento da LGPD é obrigatório" });
  }

  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName) {
    return res.status(422).json({ detail: "Nome é obrigatório" });
  }
  if (cleanName.length > 255) {
    return res.status(422).json({ detail: "Nome deve ter no máximo 255 caracteres" });
  }

  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  const phoneDigits = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || phoneDigits.length < 10 || phoneDigits.length > 13 || cleanPhone.length > 20) {
    return res.status(422).json({ detail: "Informe um telefone válido com DDD (10 ou 11 dígitos)" });
  }

  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  if (cleanEmail) {
    if (cleanEmail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(422).json({ detail: "E-mail inválido" });
    }
  }

  try {
    const query = `
      INSERT INTO clients (name, phone, email, lgpd_consent)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, phone, email, lgpd_consent as "lgpdConsent", created_at as "createdAt"
    `;
    const values = [cleanName, cleanPhone, cleanEmail || null, true];

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

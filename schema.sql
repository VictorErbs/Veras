-- Script SQL para criação da tabela no Supabase (PostgreSQL)

CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    lgpd_consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) sem policies públicas:
-- bloqueia acesso direto via API REST do Supabase (anon/authenticated),
-- enquanto o backend Node (via DATABASE_URL / postgres) continua operando normalmente.
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable all actions for authenticated users only" ON clients;

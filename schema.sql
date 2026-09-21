-- Script SQL para criação da tabela no Supabase (PostgreSQL)

CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    lgpd_consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) mas permitindo tudo por enquanto, 
-- já que o backend que fará a comunicação
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all actions for authenticated users only" ON clients
    FOR ALL
    USING (true)
    WITH CHECK (true);

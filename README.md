<div align="center">

# 🌸 Studio Renata Veras

**Landing page de alta conversão, captação de leads com conformidade LGPD e painel administrativo.**

![React](https://img.shields.io/badge/React-19-pink?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-lightgrey?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?style=flat-square&logo=postgresql)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?style=flat-square&logo=vercel)

---

</div>

## 📖 Sobre o Projeto

Sistema web completo de captação digital para um estúdio de estética e micropigmentação. Une uma **landing page** com catálogo de procedimentos, **atendimento direto via WhatsApp**, **formulário de cadastro (Clube VIP)** com consentimento LGPD e um **painel administrativo privativo** para gestão dos leads.

## 🎯 Objetivo

Apresentar os serviços, facilitar o contato imediato pelo WhatsApp e transformar visitantes em leads organizados e consultáveis pela equipe — com total conformidade legal na coleta de dados.

## 👤 Usuários

| Perfil | Acesso |
|---|---|
| **Visitante / Cliente** — conhece serviços, tira dúvidas no WhatsApp e se cadastra | Público |
| **Administrador** — consulta, filtra, exporta contatos e inicia conversas | Privado (`/admin`) |

---

## ✅ Requisitos Funcionais

**Landing page**
- **RF-01** Exibir capa com proposta de valor e CTAs de agendamento.
- **RF-02** Listar procedimentos em cards com descrição, diferenciais e selo de destaque.
- **RF-03** Cada serviço abre uma conversa no WhatsApp com mensagem contextualizada.
- **RF-04** Exibir diferenciais institucionais e depoimentos com avaliação por estrelas.
- **RF-05** Navegação suave entre seções, menu responsivo e botão flutuante de WhatsApp.

**Formulário de captação**
- **RF-06** Cadastro com nome e WhatsApp obrigatórios, e-mail opcional.
- **RF-07** Máscara dinâmica de telefone brasileiro (10–11 dígitos).
- **RF-08** Consentimento LGPD obrigatório — sem ele, o envio não é permitido.
- **RF-09** Validação no cliente e no servidor, com estados de envio claros (carregando/sucesso/erro).

**Painel administrativo**
- **RF-10** Login com credenciais validadas pelo backend (Basic Auth) e expiração automática de sessão.
- **RF-11** Listagem dos leads ordenada por data e busca em tempo real (nome, telefone ou e-mail).
- **RF-12** Métricas resumidas, exportação em CSV e contato direto por WhatsApp (+55 automático).

**API**
- **RF-13** `GET /api/health` — status do serviço.
- **RF-14** `POST /api/clients` — cadastro público de leads (valida LGPD, nome e telefone).
- **RF-15** `GET /api/clients` — listagem protegida por Basic Auth.

---

## ⚙️ Requisitos Não Funcionais

- **RNF-01 Desempenho** — landing page servida como assets estáticos (build Vite), resposta da API em até 1s, timeout de banco em 5s com pool de conexões reutilizado.
- **RNF-02 Usabilidade** — 100% responsivo (320px → desktop), interface em português, acessibilidade por teclado e feedback visual em todas as ações.
- **RNF-03 Confiabilidade** — tratamento de erros em todas as camadas sem expor detalhes internos e endpoint de health check para monitoramento.
- **RNF-04 Segurança** — credenciais apenas em variáveis de ambiente, autenticação validada no servidor, queries parametrizadas (anti SQL Injection) e SSL no banco.
- **RNF-05 Manutenibilidade** — código comentado, commits convencionais, lint com OxLint e deploy automatizado na Vercel.
- **RNF-06 Conformidade (LGPD)** — consentimento explícito registrado no banco, finalidade declarada ao usuário e coleta mínima de dados.

---

## 📐 Regras de Negócio

- Cadastro **não é permitido** sem consentimento LGPD.
- Nome e telefone são obrigatórios (telefone com DDD, 10–11 dígitos); e-mail é opcional.
- Usuário administrador validado *case-insensitive*; senha de forma exata.
- Sessão administrativa expira imediatamente em caso de `401`.
- Exportação CSV respeita o filtro de busca ativo.
- Leads sempre exibidos do mais recente para o mais antigo.

---

## 🏗️ Stack

| Camada | Tecnologias |
|---|---|
| **Frontend** | React 19, Vite 8, React Router 7, Lucide React, OxLint |
| **Backend** | Node.js 20+, Express 5, pg, dotenv, cors |
| **Infra** | Vercel (CDN + serverless), Supabase (PostgreSQL com SSL e RLS), WhatsApp Business |

```
Visitante → Frontend (React/Vite na Vercel)
                │  fetch JSON
                ▼
           API serverless (Express)  ──SSL──►  Supabase (PostgreSQL)
```

---

## 🔌 API

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `GET` | `/api/health` | — | Status do serviço |
| `POST` | `/api/clients` | — | Cadastra lead. **400** sem LGPD, **422** sem nome/telefone, **201** OK |
| `GET` | `/api/clients` | Basic | Lista leads ordenados. **401** se credenciais inválidas |

**Modelo de dados (`clients`):** `id` (UUID), `name`, `phone`, `email` (opcional), `lgpd_consent` (boolean), `created_at` (UTC). Script em [`schema.sql`](./schema.sql).

---

## 🔐 Variáveis de Ambiente

Crie o `.env` a partir do [`.env.example`](./.env.example):

| Variável | Escopo | Descrição |
|---|---|---|
| `DATABASE_URL` | Backend | Conexão PostgreSQL (Supabase) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Backend | Credenciais do painel |
| `VITE_API_URL` | Frontend (dev) | Base URL da API local |
| `VITE_WHATSAPP_NUMBER` | Frontend | Número com DDI+DDD |

> ⚠️ O `.env` está no `.gitignore` — nunca será commitado. Em produção, configure na Vercel.

---

## 💻 Como Rodar Localmente

```bash
# 1. Clonar
git clone https://github.com/VictorErbs/Veras.git
cd Veras

# 2. Instalar dependências
npm install
npm install --prefix frontend

# 3. Configurar ambiente
cp .env.example .env   # edite com suas credenciais

# 4. Criar a tabela no Supabase (SQL Editor)
#    execute o conteúdo de schema.sql

# 5. Subir a API (http://localhost:8000)
npm run api

# 6. Subir o Frontend (http://localhost:5173)
npm run dev
```

| Script | Descrição |
|---|---|
| `npm run dev` | Frontend em modo desenvolvimento |
| `npm run api` | API Express local |
| `npm run build` | Build de produção (`/dist`) |
| `npm run lint` | OxLint |

---

## 🚀 Deploy na Vercel

1. Conecte o repositório na [Vercel](https://vercel.com/).
2. Configure as variáveis de ambiente no painel (*Settings → Environment Variables*).
3. Clique em **Deploy** — build do frontend e funções serverless no mesmo domínio, sem CORS ou portas.

Push na branch `main` dispara deploy automático.

---

## 📁 Estrutura

```
Veras/
├── frontend/          # React + Vite (components, pages, config)
├── api/               # Express serverless (index, clients, health)
├── .env.example       # Modelo de variáveis de ambiente
├── schema.sql         # DDL da tabela clients
├── vercel.json        # Build e rewrites da Vercel
└── package.json       # Scripts e workspaces
```

---

## 🔒 Segurança e LGPD

- Credenciais e URLs de banco **apenas em variáveis de ambiente**.
- Basic Auth validado **no servidor** — nunca só no frontend.
- Queries **parametrizadas** em toda a API (imunidade a SQL Injection).
- Consentimento LGPD registrado (`lgpd_consent`) e coleta mínima de dados.
- SSL obrigatório na conexão com o banco.

> 📌 Os dados coletados são usados exclusivamente para contato, agendamento e promoções, com consentimento revogável a qualquer momento.

---

## 🗺️ Roadmap

- [ ] Agendamento online com calendário de horários
- [ ] Autenticação com JWT e expiração por tempo
- [ ] Notificação automática de novo lead
- [ ] Gráficos de conversão no painel
- [ ] Testes automatizados e CI

---

<div align="center">
  <sub>© {ano atual} Studio Renata Veras. Todos os direitos reservados.</sub>
</div>

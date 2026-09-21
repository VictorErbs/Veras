<div align="center">

# 🌸 Studio Renata Veras ✨
### *Realçando sua beleza natural com delicadeza, cuidado e tecnologia* 💖

<p align="center">
  <b>Landing page de alta conversão, agendamento facilitado e painel administrativo de leads.</b>
</p>

---

![React](https://img.shields.io/badge/React-18-pink?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat-square&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5-lightgrey?style=flat-square&logo=express)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?style=flat-square&logo=vercel)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?style=flat-square&logo=postgresql)

---

</div>

## 🌷 Sobre o Projeto

Espaço digital desenvolvido para transmitir aconchego, sofisticação e credibilidade. O projeto conecta as clientes ao **Studio Renata Veras**, permitindo conhecer os procedimentos de estética e micropigmentação, tirar dúvidas rápidas no WhatsApp e se cadastrar para benefícios exclusivos.

Conta também com uma **área administrativa privativa** para gerenciar os contatos recebidos com total segurança e praticidade.

---

## 🪄 Principais Funcionalidades

- 🌿 **Experiência Visual Imersiva**: Design elegante em tons de rosa suave e dourado, tipografia refinada e micro-interações fluidas.
- 💬 **Atendimento no WhatsApp**: Botão flutuante pulsante e links diretos em cada serviço com mensagens contextuais.
- 📋 **Formulário de Pré-Agendamento**: Captura de leads com máscara brasileira dinâmica para celular com 9 dígitos e consentimento LGPD.
- 🔐 **Painel Administrativo VIP**: Listagem, busca em tempo real, métricas e exportação dos cadastros em CSV com autenticação Basic Auth.
- 📱 **100% Responsivo**: Otimizado para celulares, tablets e computadores.
- ⚡ **Deploy Zero-Config na Vercel**: Frontend estático e Backend serverless no mesmo domínio, sem complexidade de CORS ou portas.

---

## 🎀 Estrutura do Projeto

```
Veras/
├── 🌸 frontend/                 # Interface em React + Vite
│   ├── src/
│   │   ├── assets/              # Logos e ilustrações
│   │   ├── components/          # Hero, Serviços, Depoimentos, LeadForm, WhatsApp
│   │   ├── pages/               # LandingPage, LoginPage, AdminPage
│   │   └── config/              # Parâmetros e constantes globais
│   └── vite.config.js
│
├── ⚡ api/                      # Backend Serverless em Node.js (Express)
│   └── index.js                 # Rotas da API, Basic Auth e Conexão Supabase
│
├── ⚙️ .env                       # Variáveis de ambiente pré-configuradas
├── 🚀 vercel.json               # Configuração de build e rewrites da Vercel
├── 📦 package.json              # Dependências do backend e scripts raiz
└── 📄 schema.sql                # Estrutura SQL da tabela de clientes
```

---

## 💻 Como Rodar Localmente

### 1. Instalar as dependências

```bash
# Dependências do backend
npm install

# Dependências do frontend
npm install --prefix frontend
```

### 2. Rodar a API (Node.js)

```bash
npm run api
```
> API disponível em: `http://localhost:8000`

### 3. Rodar o Frontend (React + Vite)

```bash
npm run dev
```
> Aplicação disponível em: `http://localhost:5173`

---

## 🚀 Deploy na Vercel

O projeto foi configurado com deploy automático:
1. Conecte o repositório na **[Vercel](https://vercel.com/)**.
2. Clique em **Deploy**.
3. A Vercel executará o build do frontend e publicará as funções serverless de `api/index.js` no mesmo domínio, lendo as variáveis diretamente do arquivo `.env`.

---

## 💌 Feito com Amor

Desenvolvido para encantar clientes e facilitar o dia a dia do **Studio Renata Veras**.

> *"Cuidar de você é a nossa maior arte."* 🌿✨

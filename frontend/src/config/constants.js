/**
 * Parâmetros de configuração e constantes globais do sistema.
 */

// Número de telefone para onde os clientes serão redirecionados nas conversões do WhatsApp
// ⚠️  Definido via variável de ambiente VITE_WHATSAPP_NUMBER no arquivo .env (nunca commitar o número real)
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "5581999999999";

// Ponto de entrada da API. Em produção na Vercel usa o mesmo domínio (relativo ''). Local usa VITE_API_URL.
export const API_BASE_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL !== undefined ? import.meta.env.VITE_API_URL : 'http://localhost:8000');

// Dados institucionais exibidos no cabeçalho e rodapé
export const STUDIO_INFO = {
  name: "Studio Renata Veras",
  tagline: "Estética e Micropigmentação",
  instagram: "@renataveras_estetica",
  instagramUrl: "https://www.instagram.com/renataveras_estetica?stkn=ZDNlZDc0MzIxNw==",
  schedule: "Seg a Sex: 14h às 18h"
};

/**
 * Parâmetros de configuração e constantes globais do sistema.
 */

// Número de telefone para onde os clientes serão redirecionados nas conversões do WhatsApp
export const WHATSAPP_NUMBER = "5581999999999";

// Ponto de entrada da API. Em produção, lê a variável definida no build da Vercel
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Dados institucionais exibidos no cabeçalho e rodapé
export const STUDIO_INFO = {
  name: "Studio Renata Veras",
  tagline: "Estética e Micropigmentação",
  instagram: "@studiorenataveras",
  instagramUrl: "https://instagram.com",
  schedule: "Seg a Sex: 09h às 19h | Sáb: 09h às 14h"
};

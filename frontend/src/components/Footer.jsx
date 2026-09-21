import React from 'react';
import { Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/Logo.png';
import { WHATSAPP_NUMBER, STUDIO_INFO } from '../config/constants';

/**
 * Renderiza o ícone do Instagram em formato vetorial SVG puro.
 */
const InstagramIcon = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

/**
 * Rodapé institucional com links de procedimentos, horário de funcionamento e acesso admin.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Coluna 1: Apresentação da marca e link social */}
          <div className="footer-brand">
            <img 
              src={logoImg} 
              alt={STUDIO_INFO.name} 
              className="logo-footer"
            />
            <p>
              Referência em estética avançada, embelezamento do olhar, 
              camuflagem biológica sem tinta e rejuvenescimento com naturalidade.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <a 
                href={STUDIO_INFO.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--primary-pink)', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <InstagramIcon size={20} />
                <span>{STUDIO_INFO.instagram}</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação direta para os procedimentos */}
          <div className="footer-col">
            <h4>Procedimentos</h4>
            <ul className="footer-links">
              <li><a href="#servicos">Limpeza de Pele Turbinada 7 em 1</a></li>
              <li><a href="#servicos">Tratamento Proxy Enzima Botox</a></li>
              <li><a href="#servicos">Camuflagem s/ Tinta</a></li>
              <li><a href="#servicos">Clareamento Íntimo & Axilas</a></li>
              <li><a href="#servicos">Jato de Plasma</a></li>
              <li><a href="#servicos">Nature Barber Masculino</a></li>
            </ul>
          </div>

          {/* Coluna 3: Informações de expediente e canal de atendimento */}
          <div className="footer-col">
            <h4>Atendimento</h4>
            <ul className="footer-links" style={{ gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="var(--primary-pink)" />
                <span>{STUDIO_INFO.schedule}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <WhatsAppIcon size={18} />
                <span>WhatsApp: {WHATSAPP_NUMBER}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={18} color="var(--primary-pink)" />
                <span>Ambiente Seguro e Conforme LGPD</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior de direitos autorais e atalho para o painel administrativo */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.name}. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/admin" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              Acesso Administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Lock } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/Logo.png';
import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * Cabeçalho de navegação e acesso rápido ao WhatsApp.
 */
const Header = () => {
  const handleGeneralWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de tirar dúvidas e agendar uma avaliação no Studio Renata Veras.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="top-announcement">
        <Sparkles size={16} />
        <span>Agende sua avaliação personalizada para esta semana | Atendimento exclusivo</span>
      </div>

      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo-wrapper" title="Studio Renata Veras">
            <img 
              src={logoImg} 
              alt="Studio Renata Veras" 
              className="logo-img"
            />
          </Link>

          <nav>
            <ul className="nav-links">
              <li><a href="#hero">Início</a></li>
              <li><a href="#servicos">Procedimentos</a></li>
              <li><a href="#diferenciais">Diferenciais</a></li>
              <li><a href="#depoimentos">Avaliações</a></li>
              <li><a href="#contato">Clube VIP</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button 
              onClick={handleGeneralWhatsApp} 
              className="btn btn-whatsapp"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp</span>
            </button>

            <Link 
              to="/admin" 
              title="Acesso Administrativo" 
              style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <Lock size={18} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

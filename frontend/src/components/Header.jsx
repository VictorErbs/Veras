import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/Logo.png';
import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * Cabeçalho responsivo com navegação suave, remoção de hash feia na URL e menu mobile.
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');
  const navigate = useNavigate();
  const location = useLocation();

  const handleGeneralWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de tirar dúvidas e agendar uma avaliação no Studio Renata Veras.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  /**
   * Navegação suave que evita sujeira como /#hero na barra de endereço.
   */
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (!targetId || targetId === 'hero' || targetId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (!targetId || targetId === 'hero' || targetId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
      setActiveNav('inicio');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${targetId}`);
      setActiveNav(targetId);
    }
  };

  return (
    <>
      {/* Faixa superior de aviso */}
      <div className="top-announcement">
        <div className="container announcement-inner">
          <span className="announcement-divider"></span>
          <span className="announcement-badge">
            <span className="announcement-lotus">🌸</span>
            <span>Avaliação personalizada • Atendimento exclusivo</span>
          </span>
          <span className="announcement-divider"></span>
        </div>
      </div>

      <header className="header">
        <div className="container header-content">
          <Link 
            to="/" 
            className="logo-wrapper" 
            title="Studio Renata Veras"
            onClick={(e) => handleNavClick(e, 'inicio')}
          >
            <img 
              src={logoImg} 
              alt="Studio Renata Veras - Estética e Micropigmentação" 
              className="logo-img"
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <a 
                  href="#inicio" 
                  className={activeNav === 'inicio' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, 'inicio')}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#servicos" 
                  className={activeNav === 'servicos' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, 'servicos')}
                >
                  Procedimentos
                </a>
              </li>
              <li>
                <a 
                  href="#diferenciais" 
                  className={activeNav === 'diferenciais' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, 'diferenciais')}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#depoimentos" 
                  className={activeNav === 'depoimentos' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, 'depoimentos')}
                >
                  Avaliações
                </a>
              </li>
              <li>
                <a 
                  href="#contato" 
                  className={activeNav === 'contato' ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, 'contato')}
                >
                  Contato & VIP
                </a>
              </li>
            </ul>
          </nav>

          {/* Ações do Cabeçalho */}
          <div className="header-actions">
            <button 
              onClick={handleGeneralWhatsApp} 
              className="btn-header-whatsapp"
              title="Falar pelo WhatsApp"
            >
              <WhatsAppIcon size={18} />
              <span>Falar pelo WhatsApp</span>
            </button>

            <Link 
              to="/admin" 
              className="admin-lock-link"
              title="Acesso Administrativo" 
            >
              <Lock size={16} />
            </Link>

            {/* Botão Hambúrguer Mobile */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Drawer Mobile */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <ul className="mobile-nav-links">
              <li>
                <a 
                  href="#inicio" 
                  onClick={(e) => handleNavClick(e, 'inicio')}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#servicos" 
                  onClick={(e) => handleNavClick(e, 'servicos')}
                >
                  Procedimentos
                </a>
              </li>
              <li>
                <a 
                  href="#diferenciais" 
                  onClick={(e) => handleNavClick(e, 'diferenciais')}
                >
                  Sobre o Studio
                </a>
              </li>
              <li>
                <a 
                  href="#depoimentos" 
                  onClick={(e) => handleNavClick(e, 'depoimentos')}
                >
                  Depoimentos & Avaliações
                </a>
              </li>
              <li>
                <a 
                  href="#contato" 
                  onClick={(e) => handleNavClick(e, 'contato')}
                >
                  Contato & Clube VIP
                </a>
              </li>
            </ul>

            <div className="mobile-drawer-footer">
              <button 
                onClick={handleGeneralWhatsApp} 
                className="btn-hero-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <WhatsAppIcon size={18} />
                <span>Falar no WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;


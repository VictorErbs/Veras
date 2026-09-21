import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import renataHeroImg from '../assets/veras_transparente.png';
import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * Seção de destaque inicial com a foto profissional de Renata Veras.
 */
const Capa = () => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Olá Renata! Gostaria de agendar uma consulta de avaliação no Studio.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="hero-section">
      {/* Detalhes de Fundo de Alto Padrão (Flor de Lótus, Linhas Orgânicas e Brilhos Suaves) */}
      <div className="hero-bg-decorations" aria-hidden="true">
        {/* Brilhos suaves rosé e champanhe */}
        <div className="hero-glow-orb hero-glow-orb-1"></div>
        <div className="hero-glow-orb hero-glow-orb-2"></div>

        {/* Linhas curvas orgânicas com gradiente suave */}
        <svg className="hero-bg-curves" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path d="M-60 280C260 360 480 140 760 220C1040 300 1200 110 1500 150" stroke="url(#hero-gold-line)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M-80 340C220 420 540 190 820 280C1100 370 1260 170 1540 210" stroke="url(#hero-pink-line)" strokeWidth="1.2" strokeDasharray="6 6" />
          <defs>
            <linearGradient id="hero-gold-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="25%" stopColor="#E5B887" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#E5B887" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-pink-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C00D5A" stopOpacity="0" />
              <stop offset="50%" stopColor="#D70372" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C00D5A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Flor de Lótus em traço fino no canto superior direito (idêntica à referência) */}
        <svg className="hero-bg-lotus-top" viewBox="0 0 200 130" fill="none">
          <path d="M100 8C100 8 72 58 100 112C128 58 100 8 100 8Z" stroke="rgba(215, 3, 114, 0.28)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 112C68 102 46 64 68 26C80 48 96 86 100 112Z" stroke="rgba(215, 3, 114, 0.24)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 112C132 102 154 64 132 26C120 48 104 86 100 112Z" stroke="rgba(215, 3, 114, 0.24)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 112C50 112 18 78 40 46C56 68 82 96 100 112Z" stroke="rgba(215, 3, 114, 0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M100 112C150 112 182 78 160 46C144 68 118 96 100 112Z" stroke="rgba(215, 3, 114, 0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Pétalas de Lótus suaves no canto inferior esquerdo (idênticas à referência) */}
        <svg className="hero-bg-lotus-bottom" viewBox="0 0 320 280" fill="none">
          <path d="M-20 300C40 240 100 170 140 90C70 140 15 190 -20 210V300Z" fill="url(#petal-grad-1)" />
          <path d="M-20 300C80 260 170 200 220 100C140 150 60 180 -20 200V300Z" fill="url(#petal-grad-2)" />
          <path d="M-20 300C130 280 230 230 290 140C200 180 100 200 -20 220V300Z" fill="url(#petal-grad-3)" />
          <defs>
            <linearGradient id="petal-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F48FB1" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#FCE4EC" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="petal-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F06292" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#F8BBD0" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="petal-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E91E63" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FCE4EC" stopOpacity="0.02" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-tag">
              <span className="badge-flower">🌸</span>
              <span>Estética Avançada & Micropigmentação</span>
            </div>

            <h1>
              Realce sua beleza <br />
              com <em>naturalidade</em>
            </h1>

            <p className="hero-subtitle">
              Procedimentos personalizados para valorizar seus traços, cuidar da sua pele e elevar sua autoestima.
            </p>

            <div className="hero-actions">
              <button onClick={handleWhatsAppClick} className="btn-hero-primary">
                <Calendar size={18} />
                <span>Agendar avaliação</span>
                <ArrowRight size={16} />
              </button>

              <a href="#servicos" className="btn-hero-secondary">
                <span>Conhecer procedimentos</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-item">
                <ShieldCheck size={18} />
                <span>Biossegurança e Padrão Ouro</span>
              </div>
              <div className="trust-item">
                <Heart size={18} />
                <span>Técnicas Sem Dor & Sem Tinta Artificial</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-renata-wrapper">
              <img 
                src={renataHeroImg} 
                alt="Renata Veras - Esteticista e Especialista em Estética Avançada e Micropigmentação" 
                className="hero-renata-img"
              />
            </div>
          </div>
        </div>

        <div className="stats-banner">
          <div className="stat-box">
            <h3>+1000</h3>
            <p>Procedimentos Concluídos</p>
          </div>
          <div className="stat-box">
            <h3>99%</h3>
            <p>Clientes Satisfeitas</p>
          </div>
          <div className="stat-box">
            <h3>100%</h3>
            <p>Personalizado para Você</p>
          </div>
          <div className="stat-box">
            <h3>5 Estrelas</h3>
            <p>Padrão de Excelência</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capa;

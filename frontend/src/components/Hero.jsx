import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Star } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import logoImg from '../assets/Logo.png';
import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * Seção de destaque inicial e proposta de valor.
 */
const Hero = () => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Olá! Gostaria de agendar uma consulta de avaliação no Studio Renata Veras.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-tag">
              <Sparkles size={14} />
              <span>Estética Avançada & Micropigmentação</span>
            </div>

            <h1>
              A arte de realçar sua beleza com <span>naturalidade e elegância</span>
            </h1>

            <p className="hero-subtitle">
              Procedimentos exclusivos e de alta precisão desenvolvidos para valorizar seus traços únicos, 
              proporcionando bem-estar, rejuvenescimento e autoestima em um ambiente acolhedor.
            </p>

            <div className="hero-actions">
              <button onClick={handleWhatsAppClick} className="btn btn-whatsapp">
                <WhatsAppIcon size={20} />
                <span>Agendar Avaliação</span>
              </button>

              <a href="#servicos" className="btn btn-secondary">
                <span>Ver Procedimentos</span>
              </a>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-item">
                <ShieldCheck size={20} />
                <span>Biossegurança e Padrão Ouro</span>
              </div>
              <div className="trust-item">
                <Heart size={20} />
                <span>Técnicas Sem Dor & Sem Tinta Artificial</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img 
                src={logoImg} 
                alt="Studio Renata Veras" 
                className="hero-logo-display"
              />
              
              <div className="floating-pill floating-pill-1">
                <Star size={18} fill="#FFB800" color="#FFB800" />
                <span>Avaliação 5.0 ★ no Atendimento</span>
              </div>

              <div className="floating-pill floating-pill-2">
                <Award size={18} color="var(--primary-pink)" />
                <span>Especialista Certificada</span>
              </div>
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

export default Hero;

import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * Botão flutuante fixado no canto da tela com animação de pulso contínuo.
 * Facilita o início imediato de conversa pelo WhatsApp em qualquer ponto da rolagem.
 */
const FloatingWhatsApp = () => {
  // Dispara o redirecionamento ao clicar no botão
  const handleClick = (e) => {
    e.preventDefault();
    const text = encodeURIComponent("Olá Renata! Gostaria de tirar dúvidas sobre os procedimentos estéticos.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="floating-whatsapp">
      {/* Tooltip com dica de agendamento rápido */}
      <div className="floating-tooltip">
        Agende pelo WhatsApp
      </div>
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        onClick={handleClick}
        className="floating-whatsapp-btn"
        title="Falar no WhatsApp"
      >
        <div className="pulse-ring"></div>
        <WhatsAppIcon size={36} />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;

import React from 'react';
import wwpImg from '../assets/wwp.png';

/**
 * Exibe o ícone do WhatsApp com dimensões customizáveis.
 * Permite ajustar tamanho e estilos adicionais via props.
 * 
 * @param {number} size - Largura e altura da imagem em pixels
 * @param {object} style - Objeto de estilos inline adicionais
 * @param {string} className - Classes CSS extras
 */
const WhatsAppIcon = ({ size = 20, style = {}, className = "" }) => {
  return (
    <img 
      src={wwpImg} 
      alt="WhatsApp" 
      width={size} 
      height={size} 
      className={className}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        objectFit: 'contain', 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        flexShrink: 0,
        ...style 
      }} 
    />
  );
};

export default WhatsAppIcon;

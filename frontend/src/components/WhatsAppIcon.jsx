import React from 'react';

/**
 * Exibe o ícone vetorial do WhatsApp com cores e dimensões customizáveis.
 * Por padrão adota a cor do texto do elemento pai (currentColor).
 */
const WhatsAppIcon = ({ size = 20, color = "currentColor", style = {}, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color} 
      className={className}
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        flexShrink: 0,
        ...style 
      }} 
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.15c-.24.67-1.39 1.28-1.92 1.36-.51.08-1.17.11-3.37-.8-2.61-1.08-4.29-3.73-4.42-3.9-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.53-.33.71-.33.18 0 .35 0 .5.01.16.01.38-.06.59.45.22.53.76 1.85.83 1.99.07.14.11.31.02.49-.09.18-.14.29-.28.45-.14.16-.3.35-.43.47-.14.14-.29.3-.12.59.16.29.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.28 1.4.29.14.46.12.63-.07.17-.2.73-.85.92-1.15.2-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.14.49.22.56.34.07.12.07.7-.17 1.37z" />
    </svg>
  );
};

export default WhatsAppIcon;


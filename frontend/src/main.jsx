import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Ponto de entrada do React no DOM do navegador.
 * Inicializa a aplicação dentro da div #root em StrictMode.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

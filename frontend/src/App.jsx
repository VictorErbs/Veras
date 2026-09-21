import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import './index.css';

/**
 * Roteador principal da aplicação React.
 * Define a rota raiz (landing page pública), login e área administrativa de leads.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page de acesso público */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Formulário de autenticação do administrador */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Painel administrativo com listagem de clientes e métricas */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, KeyRound, ArrowLeft } from 'lucide-react';
import logoImg from '../assets/Logo.png';

/**
 * Tela de autenticação para controle de acesso ao painel de leads.
 * Armazena as credenciais codificadas em Base64 no localStorage para envio no header Authorization.
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Valida as credenciais fornecidas contra o usuário padrão configurado no backend.
   * Em caso de sucesso, gera o token HTTP Basic e redireciona para a rota /admin.
   */
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      const basicToken = btoa(`${username}:${password}`);
      localStorage.setItem('adminToken', basicToken);
      navigate('/admin');
    } else {
      setError('Credenciais incorretas. Verifique usuário e senha.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="login-form" style={{ width: '100%', maxWidth: '440px', background: '#FFFFFF', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(226, 109, 140, 0.15)', border: '1px solid var(--border-subtle)' }}>
        
        {/* Link para retornar à página pública */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
          <span>Voltar para o site</span>
        </Link>

        {/* Cabeçalho do formulário com logotipo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src={logoImg} 
            alt="Studio Renata Veras" 
            style={{ height: '55px', margin: '0 auto 16px auto' }}
          />
          <h2 style={{ fontSize: '1.6rem' }}>Área Administrativa</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Acesso restrito para gestão de cadastros e clientes VIP
          </p>
        </div>

        {/* Formulário de autenticação */}
        <form onSubmit={handleLogin}>
          <div className="form-group-modern">
            <label>Usuário</label>
            <div className="input-with-icon">
              <User size={18} />
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Ex: admin"
                required 
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label>Senha</label>
            <div className="input-with-icon">
              <KeyRound size={18} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          {error && (
            <div style={{ background: '#FFEBEE', color: '#C62828', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            <Lock size={18} />
            <span>Entrar no Painel</span>
          </button>
        </form>

        {/* Lembrete das credenciais padrão para ambiente de homologação */}
        <div style={{ marginTop: '24px', padding: '12px', background: 'var(--bg-body)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          💡 <strong>Acesso Padrão:</strong> Usuário <code>admin</code> e senha <code>admin123</code>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

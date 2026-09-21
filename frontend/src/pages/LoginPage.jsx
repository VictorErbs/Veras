import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, KeyRound, ArrowLeft } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import { API_BASE_URL } from '../config/constants';

/**
 * Tela de autenticação para controle de acesso ao painel de leads.
 * As credenciais são validadas exclusivamente pelo backend (Basic Auth).
 * Nenhuma senha fica exposta no código frontend.
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Envia as credenciais ao backend via Basic Auth e aguarda a resposta.
   * Credenciais corretas (200) → armazena token e redireciona.
   * Credenciais erradas (401) → exibe mensagem de erro.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const basicToken = btoa(`${username}:${password}`);

    try {
      const response = await fetch(`${API_BASE_URL}/api/clients`, {
        headers: { 'Authorization': `Basic ${basicToken}` }
      });

      if (response.ok || response.status === 200) {
        localStorage.setItem('adminToken', basicToken);
        navigate('/admin');
      } else if (response.status === 401) {
        setError('Credenciais incorretas. Verifique usuário e senha.');
      } else {
        let errorMsg = 'Erro ao conectar com o servidor. Tente novamente.';
        try {
          const errData = await response.json();
          if (errData.detail) errorMsg = errData.detail;
        } catch {}
        setError(errorMsg);
      }
    } catch {
      setError('Servidor offline ou inacessível no momento.');
    } finally {
      setLoading(false);
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
                placeholder="Usuário"
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

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
            <Lock size={18} />
            <span>{loading ? 'Verificando...' : 'Entrar no Painel'}</span>
          </button>
        </form>

        <div style={{ marginTop: '24px', padding: '12px', background: 'var(--bg-body)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          🔒 Acesso restrito à equipe Studio Renata Veras
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

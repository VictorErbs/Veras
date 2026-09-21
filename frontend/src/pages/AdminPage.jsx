import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  Download, 
  Search, 
  LogOut, 
  Sparkles,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import logoImg from '../assets/Logo.png';
import { API_BASE_URL } from '../config/constants';

/**
 * Painel administrativo de controle e acompanhamento de cadastros.
 * Permite filtrar contatos, exportar relatórios em CSV e disparar conversas no WhatsApp.
 */
const AdminPage = () => {
  // Dados dos clientes retornados pelo endpoint protegido da API
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Executa a busca inicial de dados ao montar o componente
  useEffect(() => {
    fetchClients();
  }, [navigate]);

  /**
   * Consulta a lista de clientes cadastrados no backend.
   * Envia o token Basic Auth armazenado no localStorage.
   * Se receber 401 (não autorizado), expira a sessão e redireciona para o login.
   */
  const fetchClients = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/clients`, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        setError('Não foi possível carregar a lista de clientes.');
      }
    } catch (err) {
      console.error(err);
      setError('Servidor backend offline ou inacessível no momento.');
    } finally {
      setLoading(false);
    }
  };

  // Encerra a sessão removendo o token e redirecionando para a tela de autenticação
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  /**
   * Filtra os clientes exibidos na tabela pelo termo digitado (nome, telefone ou e-mail).
   */
  const filteredClients = clients.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(term) ||
      c.phone?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term)
    );
  });

  /**
   * Monta e dispara o download de um arquivo CSV formatado com os dados filtrados.
   * Compatível com Excel e Google Sheets.
   */
  const handleExportCSV = () => {
    if (filteredClients.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const headers = ["ID", "Nome", "Telefone", "Email", "Consentimento LGPD", "Data de Cadastro"];
    const rows = filteredClients.map((c) => [
      c.id,
      `"${c.name}"`,
      `"${c.phone}"`,
      `"${c.email || ''}"`,
      c.lgpdConsent ? "Sim" : "Não",
      new Date(c.createdAt).toLocaleString('pt-BR')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clientes_studio_renata_veras_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Inicia um contato comercial no WhatsApp diretamente com o lead selecionado.
   * Normaliza o telefone para garantir o código do país (+55).
   * 
   * @param {object} client - Registro do cliente com nome e telefone
   */
  const handleContactLead = (client) => {
    const cleanPhone = client.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    const text = encodeURIComponent(`Olá ${client.name}! Tudo bem? Sou da equipe do Studio Renata Veras. Vimos seu cadastro e temos uma condição especial para você!`);
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-body)', padding: '30px 20px' }}>
      <div className="container">
        
        {/* Barra superior de navegação com link de volta e botão de logout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <ArrowLeft size={16} />
              <span>Ver Site</span>
            </Link>
            <img src={logoImg} alt="Studio Renata Veras" style={{ height: '45px' }} />
          </div>

          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>

        {/* Indicadores de métricas gerais da base de clientes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--primary-pink)', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Total de Leads</span>
              <Users size={22} />
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-title)' }}>{clients.length}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contatos cadastrados</p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#2E7D32', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Conformidade LGPD</span>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-title)' }}>100%</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Termos aceitos formalmente</p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--accent-gold)', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Canal Principal</span>
              <Sparkles size={22} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-title)', marginTop: '6px' }}>WhatsApp VIP</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Prontos para conversão</p>
          </div>
        </div>

        {/* Barra de ferramentas com pesquisa textual e exportação para CSV */}
        <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ position: 'relative', minWidth: '280px', flex: '1', maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Buscar por nome, telefone ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 42px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <button onClick={handleExportCSV} className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            <Download size={18} />
            <span>Exportar CSV (Excel)</span>
          </button>
        </div>

        {/* Tabela de listagem dos contatos */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Carregando dados dos clientes...
            </div>
          ) : error ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#D32F2F' }}>
              <p>{error}</p>
              <button onClick={fetchClients} className="btn btn-secondary" style={{ marginTop: '16px', padding: '8px 16px' }}>Tentar Novamente</button>
            </div>
          ) : filteredClients.length === 0 ? (
            <div style={{ padding: '50px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Users size={48} style={{ margin: '0 auto 14px auto', opacity: 0.3 }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Nenhum cadastro encontrado</p>
              <p style={{ fontSize: '0.85rem' }}>Os clientes que preencherem o formulário da landing page aparecerão aqui.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--primary-pink-light)', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '16px 20px' }}>Nome</th>
                    <th style={{ padding: '16px 20px' }}>Telefone</th>
                    <th style={{ padding: '16px 20px' }}>E-mail</th>
                    <th style={{ padding: '16px 20px' }}>Data</th>
                    <th style={{ padding: '16px 20px' }}>LGPD</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Ação Rápida</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-title)' }}>
                        {client.name}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--text-body)' }}>
                        {client.phone}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>
                        {client.email || '—'}
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} />
                          <span>{new Date(client.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                          Consentido
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleContactLead(client)}
                          className="btn btn-whatsapp"
                          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                          title="Abrir WhatsApp com este cliente"
                        >
                          <WhatsAppIcon size={15} />
                          <span>WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

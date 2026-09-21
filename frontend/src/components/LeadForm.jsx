import React, { useState } from 'react';
import { User, Phone, Mail, ShieldCheck, CheckCircle2, Sparkles, Gift } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_NUMBER, API_BASE_URL } from '../config/constants';

/**
 * Formulário de captação de clientes com consentimento LGPD.
 */
const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lgpdConsent: false
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Formata número de telefone/celular brasileiro
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length === 10 && digits[2] !== '9') {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e) => {
    setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
  };

  // Garante que a tecla Backspace apague dígitos mesmo se o cursor estiver após separadores como '-' ou ')'
  const handlePhoneKeyDown = (e) => {
    if (e.key === 'Backspace') {
      const { selectionStart, selectionEnd, value } = e.target;
      if (selectionStart === selectionEnd && selectionStart > 0) {
        const charBefore = value[selectionStart - 1];
        if (charBefore === '-' || charBefore === ')' || charBefore === ' ') {
          e.preventDefault();
          const before = value.slice(0, selectionStart - 1).replace(/\D/g, '').slice(0, -1);
          const after = value.slice(selectionStart).replace(/\D/g, '');
          setFormData((prev) => ({ ...prev, phone: formatPhone(before + after) }));
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Envio dos dados para a API Spring Boot
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.lgpdConsent) {
      alert("Por favor, confirme o consentimento da LGPD para prosseguir.");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() ? formData.email.trim() : null,
        lgpdConsent: formData.lgpdConsent
      };

      const response = await fetch(`${API_BASE_URL}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || 'Ocorreu um erro ao registrar os dados.');
        setStatus('error');
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setErrorMessage('Servidor inacessível. Tente novamente em instantes.');
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="lead-section">
      <div className="container">
        <div className="lead-wrapper">
          <div className="lead-info-side">
            <div>
              <div className="badge-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
                <Gift size={14} />
                <span>Condições Especiais</span>
              </div>
              <h2>Faça Parte do Clube VIP Renata Veras</h2>
              <p>
                Cadastre-se para receber em primeira mão condições exclusivas, novidades em procedimentos 
                e dicas de cuidados especiais para sua pele.
              </p>

              <ul className="vip-benefits">
                <li>
                  <Sparkles size={18} />
                  <span>Descontos especiais de aniversário</span>
                </li>
                <li>
                  <Sparkles size={18} />
                  <span>Prioridade na lista de espera de agendamento</span>
                </li>
                <li>
                  <ShieldCheck size={18} />
                  <span>Dados 100% protegidos conforme a LGPD</span>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '30px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
              Studio Renata Veras • Estética e Micropigmentação
            </div>
          </div>

          <div className="lead-form-side">
            {status === 'success' ? (
              <div className="success-screen">
                <div className="success-icon-badge">
                  <CheckCircle2 size={42} />
                </div>
                <h3>Cadastro Realizado com Sucesso!</h3>
                <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px 0', fontSize: '0.95rem' }}>
                  Seus dados foram registrados com segurança em conformidade com a LGPD.
                  Aproveite e chame nossa equipe agora mesmo no WhatsApp para validar suas vantagens!
                </p>

                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de me cadastrar no site do Studio Renata Veras e gostaria de conhecer as promoções exclusivas.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  <WhatsAppIcon size={20} />
                  <span>Falar Conosco no WhatsApp</span>
                </a>
              </div>
            ) : (
              <>
                <h3>Cadastre-se Gratuitamente</h3>
                <p className="sub">Preencha seus dados abaixo para ativar seus benefícios.</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group-modern">
                    <label htmlFor="name">Nome Completo *</label>
                    <div className="input-with-icon">
                      <User size={18} />
                      <input 
                        id="name"
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Ex: Ana Clara Martins"
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="phone">WhatsApp com DDD *</label>
                    <div className="input-with-icon">
                      <Phone size={18} />
                      <input 
                        id="phone"
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handlePhoneChange} 
                        onKeyDown={handlePhoneKeyDown}
                        placeholder="(11) 98765-4321"
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group-modern">
                    <label htmlFor="email">E-mail</label>
                    <div className="input-with-icon">
                      <Mail size={18} />
                      <input 
                        id="email"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="seuemail@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="lgpd-box">
                    <input 
                      type="checkbox" 
                      id="lgpdConsent" 
                      name="lgpdConsent" 
                      checked={formData.lgpdConsent} 
                      onChange={handleChange} 
                      required 
                    />
                    <label htmlFor="lgpdConsent">
                      <strong>Concordo com os Termos LGPD:</strong> Autorizo o Studio Renata Veras 
                      a armazenar meus dados (Nome, Telefone e E-mail) exclusivamente para contato, 
                      agendamentos e envio de promoções personalizadas, podendo revogar a qualquer momento.
                    </label>
                  </div>

                  {status === 'error' && (
                    <p style={{ color: '#D32F2F', fontSize: '0.85rem', marginBottom: '14px' }}>
                      {errorMessage || "Erro ao conectar com o servidor. Verifique o backend."}
                    </p>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Registrando...' : 'Quero Minhas Vantagens Exclusivas'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;

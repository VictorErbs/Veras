import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Clock } from 'lucide-react';

/**
 * Seção que lista os pilares de qualidade, segurança e biossegurança da clínica.
 */
const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Biossegurança Rigorosa',
      desc: 'Materiais descartáveis, esterilização hospitalar e conformidade total com os padrões da Anvisa.'
    },
    {
      icon: Sparkles,
      title: 'Tecnologia & Inovação',
      desc: 'Equipamentos modernos e protocolos biológicos de ponta sem pigmentos artificiais agressivos.'
    },
    {
      icon: HeartHandshake,
      title: 'Atendimento Humanizado',
      desc: 'Avaliação personalizada individual para entender as reais necessidades e expectativas da sua pele.'
    },
    {
      icon: Clock,
      title: 'Pós-Procedimento Atento',
      desc: 'Acompanhamento contínuo via canal exclusivo de suporte para garantir a melhor cicatrização.'
    }
  ];

  return (
    <section id="diferenciais" className="features-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>Por que nos escolher</span>
          </div>
          <h2>O Padrão Renata Veras</h2>
          <p>Compromisso inegociável com a sua saúde, segurança e satisfação.</p>
        </div>

        {/* Grade com os 4 diferenciais */}
        <div className="features-grid">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="feature-box">
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

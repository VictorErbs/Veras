import React from 'react';
import { Star, Sparkles } from 'lucide-react';

/**
 * Seção de depoimentos com avaliação por estrelas para gerar prova social.
 */
const Testimonials = () => {
  // Lista de avaliações de pacientes com tratamento realizado e nota
  const reviews = [
    {
      name: 'Mariana Silveira',
      treatment: 'Camuflagem s/ Tinta de Estrias',
      comment: 'Fiz o tratamento de camuflagem sem tinta e o resultado foi inacreditável! Minhas estrias sumiram sem parecer artificial. O atendimento da Renata é impecável!',
      rating: 5,
      avatar: 'MS'
    },
    {
      name: 'Camila Fernandes',
      treatment: 'Limpeza de Pele Turbinada 7 em 1',
      comment: 'Minha pele nunca ficou tão iluminada e limpa sem ficar vermelha. O cuidado em cada etapa e o ambiente cheiroso e relaxante me conquistaram.',
      rating: 5,
      avatar: 'CF'
    },
    {
      name: 'Rodrigo Medeiros',
      treatment: 'Nature Barber & Facial',
      comment: 'Espaço excepcional! O design de sobrancelha e cuidado facial masculino foi feito com total naturalidade, sem ficar marcado. Recomendo de olhos fechados.',
      rating: 5,
      avatar: 'RM'
    }
  ];

  return (
    <section id="depoimentos" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>Depoimentos Reais</span>
          </div>
          <h2>O Que Nossos Clientes Dizem</h2>
          <p>A satisfação de quem confiou seus cuidados estéticos ao Studio Renata Veras.</p>
        </div>

        {/* Cards de depoimentos */}
        <div className="testimonials-grid">
          {reviews.map((rev, index) => (
            <div key={index} className="testimonial-card">
              <div>
                {/* Renderização dinâmica das estrelas da avaliação */}
                <div className="stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
                <p className="testimonial-text">"{rev.comment}"</p>
              </div>

              {/* Informações do autor do depoimento */}
              <div className="testimonial-author">
                <div className="author-avatar">{rev.avatar}</div>
                <div className="author-info">
                  <h5>{rev.name}</h5>
                  <span>{rev.treatment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

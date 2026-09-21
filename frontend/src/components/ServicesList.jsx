import React from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Sun, 
  Zap, 
  Scissors, 
  Check, 
  ArrowRight
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_NUMBER } from '../config/constants';

/**
 * Matriz de procedimentos disponíveis na clínica.
 * Cada item contém título, categoria, ícone representativo, descrição detalhada e diferenciais.
 */
const SERVICES = [
  {
    id: 1,
    title: 'Limpeza de Pele Turbinada 7 em 1',
    category: 'Facial Profundo',
    icon: Sparkles,
    desc: 'Protocolo completo com 7 etapas de purificação, remoção de cravos sem dor, hidratação profunda e renovação celular imediata.',
    features: [
      'Peeling ultrassônico & vapor de ozônio',
      'Extração sem marcas ou dor',
      'Fototerapia LED & máscara ouro'
    ],
    highlight: 'Mais Procurado'
  },
  {
    id: 2,
    title: 'Tratamento Proxy Enzima Botox',
    category: 'Rejuvenescimento',
    icon: Flame,
    desc: 'Técnica enzimática de alta performance que mimetiza o efeito tensor do botox, suavizando rugas e linhas de expressão com acabamento natural.',
    features: [
      'Sem agulhas invasivas',
      'Estímulo intensivo de colágeno',
      'Efeito lifting progressivo'
    ],
    highlight: 'Efeito Tensor'
  },
  {
    id: 3,
    title: 'Tratamento e Camuflagem s/tinta de Olheiras, estrias e cicatrizes',
    category: 'Exclusividade Biológica',
    icon: ShieldCheck,
    desc: 'Inovação mundial sem o uso de pigmentos ou tintas artificiais! Estimula a melanogênese natural e regeneração tecidual permanente.',
    features: [
      '100% livre de tintas e manchas futuras',
      'Uniformização do tom natural da pele',
      'Tratamento biológico de cicatrizes e estrias'
    ],
    highlight: 'Zero Tinta'
  },
  {
    id: 4,
    title: 'Clareamento de axilas, virilha, entrepernas',
    category: 'Uniformização Corporal',
    icon: Sun,
    desc: 'Protocolo clareador com nanotecnologia e ácidos biocompatíveis que eliminam o escurecimento por atrito e depilação com total segurança.',
    features: [
      'Seguro para todos os fototipos',
      'Ação calmante e regeneradora',
      'Resultados visíveis nas primeiras sessões'
    ],
    highlight: 'Pele Renovada'
  },
  {
    id: 5,
    title: 'Jato de Plasma',
    category: 'Lifting Avançado',
    icon: Zap,
    desc: 'Tratamento de alta precisão para blefaroplastia sem cortes, retração de excesso de pele nas pálpebras, remoção de sinais e estrias profundas.',
    features: [
      'Blefaroplastia não-cirúrgica',
      'Retração imediata de flacidez',
      'Recuperação rápida e segura'
    ],
    highlight: 'Alta Precisão'
  },
  {
    id: 6,
    title: 'Nature Barber',
    category: 'Cuidados Masculinos',
    icon: Scissors,
    desc: 'Design e alinhamento facial masculino de excelência, tratamento para barba, sobrancelhas e controle de oleosidade com estética natural.',
    features: [
      'Design respeitando a anatomia masculina',
      'Revitalização e saúde dos fios',
      'Ambiente reservado e profissional'
    ],
    highlight: 'Exclusivo Barber'
  }
];

/**
 * Grid de serviços interativos.
 * Ao interagir com qualquer card, direciona o lead para o chat do WhatsApp
 * com o texto de interesse correspondente já preenchido.
 */
const ServicesList = () => {

  /**
   * Monta a URL da API do WhatsApp com mensagem codificada para envio direto.
   * 
   * @param {string} serviceTitle - Nome do procedimento selecionado
   */
  const handleServiceClick = (serviceTitle) => {
    const message = `Olá! Gostaria de saber mais sobre o serviço ${serviceTitle}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Abre a conversa em uma nova janela para não interromper a navegação no site
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="servicos" className="services-section">
      <div className="container">
        {/* Título e introdução da seção */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>Nossos Procedimentos</span>
          </div>
          <h2>Excelência em Cada Detalhe</h2>
          <p>
            Escolha o tratamento desejado abaixo para conversar diretamente com a nossa equipe no WhatsApp 
            e receber uma consultoria personalizada.
          </p>
        </div>

        {/* Mapeamento e renderização dos cards */}
        <div className="services-grid">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => handleServiceClick(service.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleServiceClick(service.title)}
                title={`Clique para consultar sobre ${service.title}`}
              >
                <div className="card-top">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div className="service-icon-box">
                      <IconComponent size={28} />
                    </div>
                    <span className="badge-tag" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                      {service.highlight}
                    </span>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>

                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <Check size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão de contato direto */}
                <div className="service-cta-btn">
                  <WhatsAppIcon size={18} />
                  <span>Consultar no WhatsApp</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;

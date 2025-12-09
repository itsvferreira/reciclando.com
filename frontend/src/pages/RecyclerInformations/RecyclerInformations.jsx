import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  MapPin, 
  CheckCircle,
  TrendingUp,
  Calendar,
  MessageCircle,
  Award
} from 'lucide-react';

import recyclerPhoto from '../../assets/reciclador.jpg'; 
import avatar1 from '../../assets/avaliacao-homem-1.jpg'; 
import avatar2 from '../../assets/avalicao-mulher.jpg'; 
import avatar3 from '../../assets/avaliacao-homem-2.jpg'; 

import './RecyclerInformations.css';

const RecyclerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // Dados MOCKADOS //
  const mockData = {
    name: "João Silva",
    location: "Vila Mariana, SP",
    distance: "2.5 km",
    rating: 4.8,
    ratingCount: 127,
    about: "Reciclador com mais de 10 anos de experiência. Especializado em coleta de papel, papelão e plástico. Atuo na região da Vila Mariana e arredores.",
    materials: ["Papel", "Papelão", "Plástico"],
    stats: [
      { number: "1247", label: "Coletas", icon: <TrendingUp size={24} /> },
      { number: "10 anos", label: "Ativo", icon: <Calendar size={24} /> },
      { number: "2 horas", label: "Resposta", icon: <MessageCircle size={24} /> },
      { number: "4.8", label: "Avaliação", icon: <Award size={24} /> }
    ],
    contact: {
      phone: "(11) 98765-4321",
      email: "joao.silva@email.com",
      hours: "Segunda a Sábado, 8h às 18h"
    },
    reviews: [
      {
        name: "Carlos Alberto",
        date: "15/11/2025",
        comment: "Excelente profissional! Pontual e muito cuidadoso com a coleta. Recomendo!",
        avatar: avatar1,
        rating: 5
      },
      {
        name: "Mariana Silva",
        date: "10/11/2025",
        comment: "Muito atencioso e educado. Fez a coleta rapidamente e deixou tudo organizado.",
        avatar: avatar2,
        rating: 5
      },
      {
        name: "Roberto Costa",
        date: "05/11/2025",
        comment: "Bom serviço. Chegou no horário combinado e foi muito profissional.",
        avatar: avatar3,
        rating: 4
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Buscando dados da API...");
        const response = await fetch('http://localhost:8081/api/v1/recyclers/1');
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Dados recebidos da API:", data);
          setApiData(data);
        } else {
          console.log("⚠️ API respondeu com erro:", response.status);
          setError(`API respondeu com status ${response.status}`);
        }
      } catch (error) {
        console.log("❌ Erro ao conectar com API:", error.message);
        setError("Não foi possível conectar com o servidor");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchData, 500);
  }, []);

  // COMBINA dados da API com mock
  const profileData = apiData ? {
    name: `${apiData.firstName || ''} ${apiData.lastName || ''}`.trim() || mockData.name,
    location: `${apiData.city || ''}, ${apiData.state || ''}`.trim() || mockData.location,
    materials: apiData.acceptedMaterials || mockData.materials,
    distance: mockData.distance,
    rating: mockData.rating,
    ratingCount: mockData.ratingCount,
    about: mockData.about,
    stats: mockData.stats,
    contact: mockData.contact,
    reviews: mockData.reviews
  } : mockData;

  
  const StarRating = ({ rating }) => {
    return (
      <div className="review-stars">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={`star-icon ${index < rating ? 'full' : 'empty'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando perfil...</p>
        {error && <p className="error-message" style={{ color: '#666', fontSize: '14px' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="recycler-profile-container">
      <div className="profile-wrapper">     
        <div className="profile-main">        
          <div className="profile-card header-card">
            <div className="profile-header-content">             
              <div className="profile-header-top">                
                <div className="recycler-photo no-border">
                  <img 
                    src={recyclerPhoto} 
                    alt="Foto de João Silva"
                    className="photo-img"
                  />
                </div>


                <div className="profile-info-right">                  
                  <div className="name-and-badge">
                    <div className="name-and-verification">
                      <h1 className="profile-name">{profileData.name}</h1>
                      <CheckCircle size={20} className="verification-icon" />
                    </div>
                    <div className="availability-badge">Disponível</div>
                  </div>

                  {/* Localização e avaliação */}
                  <div className="location-and-rating">
                    <div className="profile-location">
                      <MapPin size={16} className="location-icon" />
                      <span>{profileData.location} • {profileData.distance}</span>
                    </div>
                    <div className="profile-rating">
                      <Star size={16} className="star-icon" />
                      <span className="rating-value">{profileData.rating}</span>
                      <span className="rating-label">({profileData.ratingCount} avaliações)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="profile-divider" />

              {/*  SOBRE */}
              <div className="about-section">
                <h2 className="section-title">Sobre</h2>
                <p className="about-content">{profileData.about}</p>
              </div>

              {/*  MATERIAIS COLETADOS */}
              <div className="materials-section">
                <h2 className="section-title">Materiais coletados</h2>
                <div className="materials-grid">
                  {profileData.materials.map((material, index) => (
                    <div key={index} className="material-item">
                      <span className="material-name">{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="profile-card stats-card">
            <h2 className="section-title">Estatísticas</h2>
            <div className="stats-grid">
              {profileData.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AVALIAÇÕES */}
          <div className="profile-card reviews-card">
            <h2 className="section-title">Avaliações recentes</h2>
            <div className="reviews-list">
              {profileData.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  {/* FOTO DO AVALIADOR */}
                  <div className="reviewer-avatar no-border">
                    <img 
                      src={review.avatar}
                      alt={`Foto de ${review.name}`}
                      className="avatar-img"
                    />
                  </div>
                  
                  {/* AVALIAÇÃO */}
                  <div className="review-content">                    
                    <div className="review-header">                     
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.name}</span>
                      </div>                   
                        <span className="review-date">{review.date}</span>
                    </div>
                    
                    {/* ESTRELAS ABAIXO DO NOME */}
                    <div className="review-stars-container">
                      <StarRating rating={review.rating} />
                    </div>
                    
                  
                    <p className="review-comment">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informações de contato */}
        <div className="profile-sidebar">          
          <div className="profile-card contact-card">
            <h2 className="section-title">Informações de contato</h2>
            
            <div className="contact-list">
              {/* Telefone */}
              <div className="contact-item">
                <div className="contact-item-inner">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Telefone</span>
                    <span className="contact-value">{profileData.contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* E-mail */}
              <div className="contact-item">
                <div className="contact-item-inner">
                  <div className="contact-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">E-mail</span>
                    <span className="contact-value">{profileData.contact.email}</span>
                  </div>
                </div>
              </div>

              {/* Horário */}
              <div className="contact-item">
                <div className="contact-item-inner">
                  <div className="contact-icon">
                    <Clock size={18} />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Horário de funcionamento</span>
                    <span className="contact-value">{profileData.contact.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="buttons-container">
              <button className="btn-primary">
                <Phone size={16} className="btn-icon" />
                Contatar
              </button>
              <button className="btn-secondary">Voltar para listagem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclerProfile;
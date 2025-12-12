import React, { useState, useEffect } from 'react';
import recyclerPhoto from '../../assets/reciclador.jpg';
import Badge from '../../components/ui/Badge/Badge';
import { Phone, Mail, Clock, Star, MapPin, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import './RecyclerInformations.css';

const RecyclerInformations = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Buscando dados da API...');
        const response = await fetch(
          `http://localhost:8081/api/v1/recyclers/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Dados recebidos da API:', data);
          setApiData(data);
        } else {
          console.log('⚠️ API respondeu com erro:', response.status);
          setError(`API respondeu com status ${response.status}`);
        }
      } catch (error) {
        console.log('❌ Erro ao conectar com API:', error.message);
        setError('Não foi possível conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // COMBINA dados da API com mock
  const profileData = apiData
    ? {
        name: `${apiData.firstName || ''} ${apiData.lastName || ''}`.trim(),
        location: `${apiData.city || ''}, ${apiData.state || ''}`.trim(),
        materials: apiData.acceptedMaterials || [],
        distance: apiData.distance || '',
        rating: apiData.rating || '',
        ratingCount: apiData.ratingCount || '',
        about: apiData.aboutMe || apiData.about || '',
        stats: apiData.stats || [],
        contact: {
          phone: apiData.phone || '',
          email: apiData.email || '',
          hours: apiData.hours || '',
        },
        reviews: apiData.reviews || [],
      }
    : null;

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
        <p>Carregando perfil...</p>
        {error && (
          <p
            className='error-message'
            style={{ color: '#666', fontSize: '14px' }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  if (!profileData) {
    return <p>Reciclador não encontrado.</p>;
  }

  return (
    <div className='recycler-profile-container'>
      <div className='profile-wrapper'>
        <div className='profile-main'>
          <div className='profile-card header-card'>
            <div className='profile-header-content'>
              <div className='profile-header-top'>
                <div className='recycler-photo no-border'>
                  <img
                    src={recyclerPhoto}
                    alt={`Foto de ${profileData.name}`}
                    className='photo-img'
                  />
                </div>

                <div className='profile-info-right'>
                  <div className='name-and-badge'>
                    <div className='name-and-verification'>
                      <h1 className='profile-name'>{profileData.name}</h1>
                      <CheckCircle size={20} className='verification-icon' />
                    </div>
                  </div>

                  {/* Localização e avaliação */}
                  <div className='location-and-rating'>
                    <div className='profile-location'>
                      <MapPin size={16} className='location-icon' />
                      <span>
                        {profileData.location}{' '}
                        {profileData.distance && `• ${profileData.distance}`}
                      </span>
                    </div>
                    {profileData.rating && (
                      <div className='profile-rating'>
                        <Star size={16} className='star-icon' />
                        <span className='rating-value'>
                          {profileData.rating}
                        </span>
                        <span className='rating-label'>
                          ({profileData.ratingCount} avaliações)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className='profile-divider' />

              {profileData.about && (
                <div className='about-section'>
                  <h2 className='section-title'>Sobre</h2>
                  <p className='about-content'>{profileData.about}</p>
                </div>
              )}

              {/* MATERIAIS COLETADOS */}
              <div className='materials-section'>
                <h2 className='section-title'>Materiais coletados</h2>
                <div className='materials-grid'>
                  {profileData.materials.map((material, index) => (
                    <div key={index} className='materialItem'>
                      <Badge value={material} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {profileData.stats && profileData.stats.length > 0 && (
            <div className='profile-card stats-card'>
              <h2 className='section-title'>Estatísticas</h2>
              <div className='stats-grid'>
                {profileData.stats.map((stat, index) => (
                  <div key={index} className='stat-item'>
                    <div className='stat-icon-wrapper'>{stat.icon}</div>
                    <span className='stat-number'>{stat.number}</span>
                    <span className='stat-label'>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Informações de contato */}
        <div className='profile-sidebar'>
          <div className='profile-card contact-card'>
            <h2 className='section-title'>Informações de contato</h2>

            <div className='contact-list'>
              <div className='contact-item'>
                <div className='contact-item-inner'>
                  <div className='contact-icon'>
                    <Phone size={18} />
                  </div>
                  <div className='contact-details'>
                    <span className='contact-label'>Telefone</span>
                    <span className='contact-value'>
                      {profileData.contact.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* E-mail */}
              <div className='contact-item'>
                <div className='contact-item-inner'>
                  <div className='contact-icon'>
                    <Mail size={18} />
                  </div>
                  <div className='contact-details'>
                    <span className='contact-label'>E-mail</span>
                    <span className='contact-value'>
                      {profileData.contact.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Horário */}
              <div className='contact-item'>
                <div className='contact-item-inner'>
                  <div className='contact-icon'>
                    <Clock size={18} />
                  </div>
                  <div className='contact-details'>
                    <span className='contact-label'>
                      Horário de funcionamento
                    </span>
                    <span className='contact-value'>
                      Segunda a Sexta, 8hr às 18hrs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES */}
            <div className='buttons-container'>
              <button className='btnPrimary'>
                <Phone size={16} className='btn-icon' />
                Contatar
              </button>
              <button className='btn-secondary'>Voltar para listagem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclerInformations;

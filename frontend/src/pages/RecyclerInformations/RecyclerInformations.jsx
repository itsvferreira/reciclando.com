import React, { useState, useEffect } from 'react';
import recyclerPhoto from '../../assets/reciclador.jpg';
import Badge from '../../components/ui/Badge/Badge';
import { Phone, Mail, Clock, Star, MapPin, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import styles from './RecyclerInformations.module.css';

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
      <div className={styles['loading-container']}>
        <div className={styles['loading-spinner']}></div>
        <p>Carregando perfil...</p>
        {error && (
          <p
            className={styles['error-message']}
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
    <div
      className={
        styles['container d-flex justify-content-center align-items-start']
      }
    >
      <div className={styles['profile-wrapper']}>
        <div className={styles['profile-main']}>
          <div className={styles['profile-card header-card']}>
            <div className={styles['profile-header-content']}>
              <div className={styles['profile-header-top']}>
                <div className={styles['recycler-photo no-border']}>
                  <img
                    src={recyclerPhoto}
                    alt={`Foto de ${profileData.name}`}
                    className={styles['photo-img']}
                  />
                </div>

                <div className={styles['profile-info-right']}>
                  <div className={styles['name-and-badge']}>
                    <div className={styles['name-and-verification']}>
                      <h1 className={styles['profile-name']}>
                        {profileData.name}
                      </h1>
                      <CheckCircle
                        size={20}
                        className={styles['verification-icon']}
                      />
                    </div>
                  </div>

                  {/* Localização e avaliação */}
                  <div className={styles['location-and-rating']}>
                    <div className={styles['profile-location']}>
                      <MapPin size={16} className={styles['location-icon']} />
                      <span>
                        {profileData.location}{' '}
                        {profileData.distance && `• ${profileData.distance}`}
                      </span>
                    </div>
                    {profileData.rating && (
                      <div className={styles['profile-rating']}>
                        <Star size={16} className={styles['star-icon']} />
                        <span className={styles['rating-value']}>
                          {profileData.rating}
                        </span>
                        <span className={styles['rating-label']}>
                          ({profileData.ratingCount} avaliações)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className={styles['profile-divider']} />

              {profileData.about && (
                <div className={styles['about-section']}>
                  <h2 className={styles['section-title']}>Sobre</h2>
                  <p className={styles['about-content']}>{profileData.about}</p>
                </div>
              )}

              {/* MATERIAIS COLETADOS */}
              <div className={styles['materials-section']}>
                <h2 className={styles['section-title']}>Materiais coletados</h2>
                <div className={styles['materials-grid']}>
                  {profileData.materials.map((material, index) => (
                    <div key={index} className={styles['material-item']}>
                      <Badge value={material} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {profileData.stats && profileData.stats.length > 0 && (
            <div className={styles['profile-card stats-card']}>
              <h2 className={styles['section-title']}>Estatísticas</h2>
              <div className={styles['stats-grid']}>
                {profileData.stats.map((stat, index) => (
                  <div key={index} className={styles['stat-item']}>
                    <div className={styles['stat-icon-wrapper']}>
                      {stat.icon}
                    </div>
                    <span className={styles['stat-number']}>{stat.number}</span>
                    <span className={styles['stat-label']}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Informações de contato */}
        <div className={styles['profile-sidebar']}>
          <div className={styles['profile-card contact-card']}>
            <h2 className={styles['section-title']}>Informações de contato</h2>

            <div className={styles['contact-list']}>
              <div className={styles['contact-item']}>
                <div className={styles['contact-item-inner']}>
                  <div className={styles['contact-icon']}>
                    <Phone size={18} />
                  </div>
                  <div className={styles['contact-details']}>
                    <span className={styles['contact-label']}>Telefone</span>
                    <span className={styles['contact-value']}>
                      {profileData.contact.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* E-mail */}
              <div className={styles['contact-item']}>
                <div className={styles['contact-item-inner']}>
                  <div className={styles['contact-icon']}>
                    <Mail size={18} />
                  </div>
                  <div className={styles['contact-details']}>
                    <span className={styles['contact-label']}>E-mail</span>
                    <span className={styles['contact-value']}>
                      {profileData.contact.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Horário */}
              <div className={styles['contact-item']}>
                <div className={styles['contact-item-inner']}>
                  <div className={styles['contact-icon']}>
                    <Clock size={18} />
                  </div>
                  <div className={styles['contact-details']}>
                    <span className={styles['contact-label']}>
                      Horário de funcionamento
                    </span>
                    <span className={styles['contact-value']}>
                      {profileData.contact.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES */}
            <div className={styles['buttons-container']}>
              <button className={styles['btn-primary']}>
                <Phone size={16} className={styles['btn-icon']} />
                Contatar
              </button>
              <button className={styles['btn-secondary']}>
                Voltar para listagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclerInformations;

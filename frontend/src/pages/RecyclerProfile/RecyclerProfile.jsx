import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import UserAdCard from '../../components/UserAdCard/UserAdCard';
import '../../index.css';
import styles from './RecyclerProfile.module.css';
import { useFetchCollects } from '../../hooks/useFetchCollects';
import { user as userData } from '../../utils/loggedUsers';

export default function RecyclerProfile() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    return userData ? userData : null;
  });

  const [collects, setCollects] = useState([]);

  useFetchCollects(user, setCollects);

  if (!user) {
    return null;
  }

  return (
    <main>
      <div className='container'>
        <div className={styles.profileLayout}>
          <aside className={styles.profileSidebar}>
            <UserCard user={user} />
          </aside>

          <main className={styles.profileMain}>
            <div className={styles.profileHeader}>
              <div>
                <h2>Histórico de Coletas</h2>
                <p className={styles.collectsCount}>
                  {collects.length} coletas concluídas
                </p>
              </div>
              <button
                className={styles.profileAdsButton}
                onClick={() => navigate('/anuncios')}
              >
                Ver Anúncios
              </button>
            </div>

            <div className={styles.collectsList}>
              {collects.length === 0 ? (
                <div className={styles.noCollects}>
                  <p>Nenhuma coleta encontrada</p>
                </div>
              ) : (
                collects.map((collect) => (
                  <UserAdCard key={collect.id} ad={collect} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}

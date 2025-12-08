import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adsService } from "../../services/api";
import UserCard from "../../components/UserCard/UserCard";
import UserAdCard from "../../components/UserAdCard/UserAdCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../index.css";
import styles from "./RecyclerProfile.module.css";

export default function RecyclerProfile() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const [collects, setCollects] = useState([]);

  useEffect(() => {
    const fetchCollects = async () => {
      if (!user || !user.id) {
        return;
      }

      try {
        // Buscar todos os anúncios concluídos
        const response = await adsService.getAll();
        
        // Filtrar apenas anúncios concluídos
        const concludedAds = response.data.filter(ad => ad.status === 'concluded');
        
        const mappedCollects = concludedAds.map(ad => ({
          id: ad.id,
          title: ad.title,
          description: ad.description,
          material: ad.category?.[0] || "Não especificado",
          location: ad.donorLocation || "Não especificado",
          date: new Date(ad.createdAt).toLocaleDateString('pt-BR'),
          status: 'concluded',
          image: "https://via.placeholder.com/150"
        }));
        
        setCollects(mappedCollects);
      } catch (error) {
        console.error("Erro ao buscar coletas:", error);
        setCollects([]);
      }
    };

    fetchCollects();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
    <Header />
    <div className={styles.profileContainer}>
      <div className={styles.profileLayout}>
        <aside className={styles.profileSidebar}>
          <UserCard user={user} />
        </aside>

        <main className={styles.profileMain}>
          <div className={styles.profileHeader}>
            <div>
              <h2>Histórico de Coletas</h2>
              <p className={styles.collectsCount}>{collects.length} coletas concluídas</p>
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
              collects.map(collect => (
                <UserAdCard
                  key={collect.id}
                  ad={collect}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
    <Footer />
    </>
  );
}

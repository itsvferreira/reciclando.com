import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adsService } from "../../services/api";
import UserCard from "../../components/UserCard/UserCard";
import AdsFilter from "../../components/AdsFilter/AdsFilter";
import UserAdCard from "../../components/UserAdCard/UserAdCard";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import ConcludeAdModal from "../../components/ConcludeAdModal/ConcludeAdModal";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../index.css";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const [ads, setAds] = useState([]);
 
  const [filter, setFilter] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [isConcludeModalOpen, setIsConcludeModalOpen] = useState(false);
  const [adToConclude, setAdToConclude] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, type: '', message: '' });

  
  useEffect(() => {
    const fetchAds = async () => {
      if (!user || !user.id) {
        return;
      }
      
      try {
        const response = await adsService.getByDonor(user.id);

        const mappedAds = response.data.map(ad => ({
          id: ad.id,
          title: ad.title,
          description: ad.description,
          material: ad.category?.[0] || "Não especificado",
          location: ad.donorLocation || "Não especificado",
          date: new Date(ad.createdAt).toLocaleDateString('pt-BR'),
          status: ad.status || "active",
          image: "https://via.placeholder.com/150"
        }));
        setAds(mappedAds);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
        setAds([]);
      }
    };

    fetchAds();
  }, [user]);

  const handleDeleteAd = (id) => {
    const ad = ads.find(a => a.id === id);
    setAdToDelete(ad);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!adToDelete) return;

    try {
      await adsService.delete(adToDelete.id);
      setAds(ads.filter(ad => ad.id !== adToDelete.id));
      setIsDeleteModalOpen(false);
      setAdToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir anúncio:", error);
      alert("Erro ao excluir anúncio. Tente novamente.");
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setAdToDelete(null);
  };

  const handleConcludeAd = (id) => {
    const ad = ads.find(a => a.id === id);
    setAdToConclude(ad);
    setIsConcludeModalOpen(true);
  };

  const confirmConclude = async (recyclerCode) => {
    if (!adToConclude) return;

    try {
      await adsService.conclude(adToConclude.id, recyclerCode);
      setAds(ads.map(ad => 
        ad.id === adToConclude.id 
          ? { ...ad, status: 'concluded' } 
          : ad
      ));
      setIsConcludeModalOpen(false);
      setAdToConclude(null);
      
      // Mostrar modal de sucesso
      setFeedbackModal({
        isOpen: true,
        type: 'success',
        message: 'Anúncio concluído com sucesso!'
      });
    } catch (error) {
      console.error("Erro ao concluir anúncio:", error);
      setIsConcludeModalOpen(false);
      setAdToConclude(null);
      
      // Determinar mensagem de erro
      let errorMessage = 'Erro ao concluir anúncio. Tente novamente.';
      
      if (error.response?.status === 400) {
        errorMessage = 'Código do reciclador incorreto. Verifique e tente novamente.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Anúncio não encontrado.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
      }
      
      // Mostrar modal de erro
      setFeedbackModal({
        isOpen: true,
        type: 'error',
        message: errorMessage
      });
    }
  };

  const cancelConclude = () => {
    setIsConcludeModalOpen(false);
    setAdToConclude(null);
  };

  const handleEditAd = (id) => {
    alert(`Editar anúncio ${id}`);
  };

  const filteredAds = ads.filter(ad => {
    if (filter === "all") return true;
    if (filter === "active") return ad.status === "active";
    if (filter === "concluded") return ad.status === "concluded";
    return true;
  });

  const adsStats = {
    total: ads.length,
    active: ads.filter(ad => ad.status === 'active').length,
    concluded: ads.filter(ad => ad.status === 'concluded').length
  };

 

  return (
    <>
    <Header />
    <div className={styles.profileContainer}>
      <div className={styles.profileLayout}>
        <aside className={styles.profileSidebar}>
          <UserCard user={user} adsStats={adsStats} />
        </aside>

        <main className={styles.profileMain}>
          <div className={styles.profileHeader}>
            <div>
              <h2>Meus Anúncios</h2>
              <p className={styles.adsCount}>{filteredAds.length} anúncios encontrados</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.btnRecyclers} onClick={() => navigate('/recicladores')}>Recicladores</button>
              <button className={styles.btnCreateAd}>+ Criar Anúncio</button>
            </div>
          </div>

          <AdsFilter 
            filter={filter}
            onFilterChange={setFilter}
          />

          <div className={styles.adsList}>
            {filteredAds.length === 0 ? (
              <div className={styles.noAds}>
                <p>Nenhum anúncio encontrado</p>
              </div>
            ) : (
              filteredAds.map(ad => (
                <UserAdCard
                  key={ad.id}
                  ad={ad}
                  onEdit={handleEditAd}
                  onDelete={handleDeleteAd}
                  onConclude={handleConcludeAd}
                />
              ))
            )}
          </div>
        </main>
      </div>

      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        adTitle={adToDelete?.title || ""}
      />

      <ConcludeAdModal 
        isOpen={isConcludeModalOpen}
        onClose={cancelConclude}
        onConfirm={confirmConclude}
        adTitle={adToConclude?.title || ""}
      />

      <FeedbackModal 
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ isOpen: false, type: '', message: '' })}
        type={feedbackModal.type}
        message={feedbackModal.message}
      />
    </div>
    <Footer />
    </>
  );
}

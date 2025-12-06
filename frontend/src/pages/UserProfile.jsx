import React, { useState, useEffect } from "react";
import { adsService } from "../services/api";
import UserCard from "../components/UserCard/UserCard";
import AdsFilter from "../components/AdsFilter/AdsFilter";
import UserAdCard from "../components/UserAdCard/UserAdCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal/ConfirmDeleteModal";
import ConcludeAdModal from "../components/ConcludeAdModal/ConcludeAdModal";
import "../index.css";
import "./UserProfile.css";

export default function UserProfile() {
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
    } catch (error) {
      console.error("Erro ao concluir anúncio:", error);
      alert("Erro ao concluir anúncio. Verifique o código do reciclador e tente novamente.");
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
    <div className="profile-container">
      <button className="profile-back-button" onClick={() => window.history.back()}>
        ← Voltar
      </button>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <UserCard user={user} adsStats={adsStats} />
        </aside>

        <main className="profile-main">
          <div className="profile-header">
            <div>
              <h2>Meus Anúncios</h2>
              <p className="ads-count">{filteredAds.length} anúncios encontrados</p>
            </div>
            <div className="header-actions">
              <button className="btn-recyclers">Ver Catadores</button>
              <button className="btn-create-ad">+ Criar Anúncio</button>
            </div>
          </div>

          <AdsFilter 
            filter={filter}
            onFilterChange={setFilter}
          />

          <div className="ads-list">
            {filteredAds.length === 0 ? (
              <div className="no-ads">
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
    </div>
  );
}

import React from "react";
import { MapPin } from "lucide-react";
import styles from "./UserCard.module.css";
import userImg from '../../assets/uifaces-human-avatar.jpg';
import recyclerImg from '../../assets/profile-1.jpg';

export default function UserCard({ user, adsStats }) {
  if (!user) return null;

  // Se for reciclador, mostra imagem mokada
  const isRecycler = user && user.tipo === 'reciclador';
  const isComum = user && user.tipo === 'comum';
  let avatarSrc = "https://via.placeholder.com/150";
  if (isRecycler) avatarSrc = recyclerImg;
  if (isComum) avatarSrc = userImg;
  
  return (
    <div className={styles.userCard}>
      <div className={styles.userAvatar}>
        <img 
          src={avatarSrc}
          alt={user.firstName || "Usuário"}
        />
      </div>

      <h2 className={styles.userName}>
        {user.firstName && user.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user.name || "Usuário"}
      </h2>
      
      <p className={styles.userMemberSince}>
        Membro desde {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
      </p>

      {user.code && (
        <div className={styles.userInfoSection}>
          <h3>Código de Coleta</h3>
          <p className={styles.recyclerCode}>{user.code}</p>
        </div>
      )}

      <div className={styles.userInfoSection}>
        <h3>Email</h3>
        <p>{user.email || "usuario@teste.com"}</p>
      </div>

      <div className={styles.userInfoSection}>
        <h3>Telefone</h3>
        <p>{user.telefone || user.phone || "(11) 98765-4321"}</p>
      </div>

      <div className={styles.userInfoSection}>
        <h3>Localização</h3>
        <p>
          <MapPin size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
          {user.cidade && user.estado 
            ? `${user.cidade}, ${user.estado}` 
            : "São Paulo, SP"}
        </p>
      </div>

      {adsStats && (
        <>
          <h3 className={styles.statsTitle}>Estatísticas</h3>

          <div className={styles.userStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{adsStats.total}</div>
              <div className={styles.statLabel}>Total</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{adsStats.active}</div>
              <div className={styles.statLabel}>Ativos</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{adsStats.concluded}</div>
              <div className={styles.statLabel}>Concluídos</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

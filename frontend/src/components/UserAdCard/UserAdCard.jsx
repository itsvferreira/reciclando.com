import React from 'react';
import { MapPin, Package, CalendarDays, SquarePen, Trash2 } from 'lucide-react';
import styles from './UserAdCard.module.css';

import { useNavigate } from 'react-router-dom';
import Badge from "../ui/Badge/Badge";

export default function UserAdCard({ ad, onEdit, onDelete, onConclude }) {
  const navigate = useNavigate();
  return (
    <div className={styles.userAdCard}>
      <div className={styles.userAdImage}>
        <img src={ad.image} alt={ad.title} />
      </div>

      <div className={styles.userAdContent}>
        <div className={styles.userAdHeader}>
          <h3 className={styles.userAdTitle}>{ad.title}</h3>
          <span className={`${styles.userAdStatus} ${styles[ad.status]}`}>
            {ad.status === 'active' ? 'Ativo' : 'Concluído'}
          </span>
        </div>

        <div className={styles.userAdMeta}>
          <span>
            <MapPin
              size={14}
              style={{
                display: 'inline',
                marginRight: '4px',
                verticalAlign: 'text-bottom',
              }}
            />
            {ad.location}
          </span>
        </div>

        <p className={styles.userAdDescription}>{ad.description}</p>

        <div>
          <Badge value={ad.material} />
        </div>

        <span className={styles.userAdDate}>
          <CalendarDays
            size={14}
            style={{
              display: 'inline',
              marginRight: '4px',
              verticalAlign: 'text-bottom',
            }}
          />
          {ad.date}
        </span>
        <div className={styles.userAdFooter}>
          <div className={styles.userAdActions}>
            {ad.status === 'active' && (
              <>
                <button
                  className={styles.btnConclude}
                  onClick={() => onConclude(ad.id)}
                >
                  Finalizar
                </button>
                <button
                  className={styles.btnEdit}
                  onClick={() => navigate(`/anuncios/edicao/${ad.id}`)}
                >
                  <SquarePen size={16} />
                  Editar
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => onDelete(ad.id)}
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

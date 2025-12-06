import React from "react";
import { MapPin, Package, CalendarDays, SquarePen, Trash2 } from "lucide-react";
import styles from "./UserAdCard.module.css";

export default function UserAdCard({ ad, onEdit, onDelete, onConclude }) {
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
            <MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
            {ad.location}
          </span>
        </div>

        <p className={styles.userAdDescription}>{ad.description}</p>

        <div className={styles.userAdMaterialTag}>{ad.material}</div>

        <div className={styles.userAdFooter}>
          <div className={styles.userAdActions}>
            {ad.status === 'active' && (
              <>
                <button className={styles.btnConclude} onClick={() => onConclude(ad.id)}>
                  Concluir Anúncio
                </button>
                <button className={styles.btnEdit} onClick={() => onEdit(ad.id)}>
                  <SquarePen size={16} />
                  Editar
                </button>
                <button className={styles.btnDelete} onClick={() => onDelete(ad.id)}>
                  <Trash2 size={16} />
                  Excluir
                </button>
              </>
            )}
          </div>
          <span className={styles.userAdDate}>
            <CalendarDays size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
            {ad.date}
          </span>
        </div>
      </div>
    </div>
  );
}

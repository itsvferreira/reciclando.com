import React from "react";
import { MapPin, CalendarDays, Star } from "lucide-react";
import styles from "./RecyclerCollectCard.module.css";

export default function RecyclerCollectCard({ collect }) {
  return (
    <div className={styles.collectCard}>
      <div className={styles.collectImage}>
        <img src={collect.image} alt={collect.title} />
      </div>

      <div className={styles.collectContent}>
        <div className={styles.collectHeader}>
          <h3 className={styles.collectTitle}>{collect.title}</h3>
          <span className={styles.collectStatus}>Concluída</span>
        </div>
        
        <div className={styles.collectMeta}>
          <span>
            <MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
            {collect.location}
          </span>
        </div>

        <p className={styles.collectDescription}>{collect.description}</p>

        <div className={styles.collectMaterialTag}>{collect.material}</div>

        <div className={styles.collectFooter}>
          <div className={styles.donorInfo}>
            <span className={styles.donorLabel}>Doador:</span>
            <span className={styles.donorName}>{collect.donorName}</span>
          </div>
          <div className={styles.collectRight}>
            {collect.rating && (
              <div className={styles.collectRating}>
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span>{collect.rating}</span>
              </div>
            )}
            <span className={styles.collectDate}>
              <CalendarDays size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
              {collect.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import styles from "./AdsFilter.module.css";

export default function AdsFilter({ filter, onFilterChange }) {
  return (
    <div className={styles.adsFilterContainer}>
      <div className={styles.adsFilters}>
        <button 
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Todos
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Ativos
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'concluded' ? styles.active : ''}`}
          onClick={() => onFilterChange('concluded')}
        >
          Concluídos
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { X, CircleCheckBig, CircleAlert } from "lucide-react";
import styles from "./modalInformations.module.css";

export function ModalInformations({ isOpen, onClose, material }) {
  if (!isOpen || !material) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.modalHeader}>
          <div 
            className={styles.iconCircle} 
            style={{ backgroundColor: material.color }}
          >
            <material.icon size={40} strokeWidth={2} color="white" />
          </div>
          <h2>{material.title}</h2>
          <p className={styles.description}>{material.description}</p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <CircleCheckBig size={24} className={styles.checkIcon} />
            Como Reciclar
          </h3>
          <ul className={styles.stepsList}>
            {material.howToRecycle.map((step, index) => (
              <li key={index}>
                <CircleCheckBig size={20} strokeWidth={2} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitleWarning}>
            <CircleAlert size={24} className={styles.warningIcon} />
            Cuidados Importantes
          </h3>
          <ul className={styles.warningsList}>
            {material.importantCare.map((care, index) => (
              <li key={index}>
                <CircleAlert size={20} strokeWidth={2} />
                <span>{care}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
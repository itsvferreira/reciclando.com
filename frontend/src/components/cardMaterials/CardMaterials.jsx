import React, { useState } from "react";
import styles from "./CardMaterials.module.css";
import { ModalInformations } from "../modalInformations/ModalInformations";

export function CardMaterials({ icon: Icon, color, title, description, materialData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.cardMaterial}>
        <div className={styles.iconBox} style={{ backgroundColor: color, color: 'white' }}>
          <Icon size={32} strokeWidth={2} />
        </div>

        <div className={styles.textBox}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <button 
          className={styles.buttonSaibaMais}
          onClick={() => setIsModalOpen(true)}
        >
          Saiba mais
        </button>
      </div>

      <ModalInformations
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        material={materialData}
      />
    </>
  );
}
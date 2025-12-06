import React from "react";
import { CircleCheckBig } from "lucide-react";
import styles from "./CardTips.module.css";

export function CardTips() {
  const tips = [
    "Mantenha os materiais limpos e secos sempre que possível",
    "Separe os recicláveis do lixo orgânico e rejeitos",
    "Informe-se sobre os dias de coleta seletiva na sua região",
    "Reduza o consumo antes de pensar em reciclar"
  ];

  return (
    <div className={styles.dicasSection}>
      <h2 className={styles.dicasTitulo}>Dicas Importantes</h2>
      
      <div className={styles.dicasGrid}>
        {tips.map((tip, index) => (
          <div key={index} className={styles.dicaCard}>
            <CircleCheckBig size={24} className={styles.dicaIcon} />
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
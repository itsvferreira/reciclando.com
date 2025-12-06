import styles from './Badge.module.css';

const Badge = (props) => {
  const MATERIAL_LABELS = {
    PLASTIC: 'Plástico',
    PAPER: 'Papel',
    METAL: 'Metal',
    GLASS: 'Vidro',
    ELECTRONICS: 'Eletrônicos',
    BATTERIES: 'Baterias',
  };

  return (
    <span className={`${styles['bg-badge']} ${styles.badge} badge`}>
      {MATERIAL_LABELS[props.value] || props.value}
    </span>
  );
};

export default Badge;

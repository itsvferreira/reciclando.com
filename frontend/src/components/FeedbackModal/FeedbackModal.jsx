import { X } from 'lucide-react';
import styles from './FeedbackModal.module.css';

export default function FeedbackModal({ isOpen, onClose, type, message }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isSuccess = type === 'success';

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className={`${styles.modalTitle} ${isSuccess ? styles.success : styles.error}`}>
          {isSuccess ? 'Sucesso!' : 'Erro'}
        </h2>
        
        <p className={styles.modalMessage}>
          {message}
        </p>

        <button 
          className={styles.btnClose} 
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

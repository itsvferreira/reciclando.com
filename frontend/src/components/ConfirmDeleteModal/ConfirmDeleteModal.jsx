import styles from './ConfirmDeleteModal.module.css';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Excluir anúncio?</h2>
        
        <p className={styles.modalMessage}>
          Esta ação não pode ser desfeita. O anúncio será permanentemente excluído.
        </p>

        <div className={styles.modalActions}>
          <button 
            className={styles.btnCancel} 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className={styles.btnConfirm} 
            onClick={onConfirm}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import styles from './ConcludeAdModal.module.css';

export default function ConcludeAdModal({ isOpen, onClose, onConfirm, adTitle }) {
  const [recyclerCode, setRecyclerCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!recyclerCode.trim()) {
      setError('Por favor, insira o código do reciclador');
      return;
    }
    onConfirm(recyclerCode);
    setRecyclerCode('');
    setError('');
  };

  const handleClose = () => {
    setRecyclerCode('');
    setError('');
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Concluir anúncio?</h2>
        
        <p className={styles.modalMessage}>
          Digite o código do reciclador que coletou o material do anúncio <strong>"{adTitle}"</strong>.
        </p>

        <div className={styles.inputGroup}>
          <label htmlFor="recyclerCode" className={styles.label}>
            Código do Reciclador
          </label>
          <input
            id="recyclerCode"
            type="text"
            className={styles.input}
            placeholder="Ex: 12345"
            value={recyclerCode}
            onChange={(e) => {
              setRecyclerCode(e.target.value);
              setError('');
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleConfirm();
              }
            }}
          />
          {error && <span className={styles.error}>{error}</span>}
        </div>

        <div className={styles.modalActions}>
          <button 
            className={styles.btnCancel} 
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button 
            className={styles.btnConfirm} 
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

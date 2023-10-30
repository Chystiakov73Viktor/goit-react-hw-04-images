import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ modalData, closeModal }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const { largeImageURL, tags } = modalData;

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

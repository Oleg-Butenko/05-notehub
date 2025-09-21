import css from './Modal.module.css'
import NoteForm from '../NoteForm/NoteForm'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';



interface ModalProps {
  onClose: () => void,
}
const Modal = ({ onClose }: ModalProps) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
    };
    
    useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
	  };
	}, [onClose]);

    return createPortal(
        <div onClick={handleBackdropClick} className={css.backdrop} role="dialog" aria-modal="true">
            <div className={css.modal}>
                <NoteForm onClose={onClose} />
            </div>
        </div>,
    document.body
  );



}

export default Modal
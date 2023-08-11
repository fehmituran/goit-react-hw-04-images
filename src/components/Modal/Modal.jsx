import React from 'react';
import { Overlay, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ url, tag, onClose }) => {
    
  useEffect(() => {
    const handleClickEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClickEsc);

    return () => window.removeEventListener('keydown', handleClickEsc);
  }, [onClose]);

  const closeOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={closeOverlayClick}>
      <ModalImage>
        <img src={url} alt={tag} />
      </ModalImage>
    </Overlay>
  );
};

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

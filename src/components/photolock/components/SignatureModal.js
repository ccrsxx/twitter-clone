import React from 'react';
import imageStyles from '../styles/images.module.css';

const SignatureModal = ({ isVisible, signature, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className={imageStyles.signatureModal} onClick={onClose}>
      <div className={imageStyles.signatureModalContent} onClick={e => e.stopPropagation()}>
        <span className={imageStyles.signatureModalClose} onClick={onClose}>&times;</span>
        <pre>{signature}</pre>
      </div>
    </div>
  );
};

export default SignatureModal;

import React from 'react';
import imageStyles from '../styles/images.module.css';

const ImageModal = ({ isVisible, image, imageJson, imageFilename, onClose, onDownloadClick, openSignatureModal }) => {
  if (!isVisible) return null;

  return (
    <div className={`${imageStyles.fullImg} ${isVisible ? imageStyles.show : ''}`} id="fullImgBox">
      <div className={imageStyles.imageDetails}>
        <h3>Image Details: {imageFilename || 'No Details'}</h3> {/* Adjust as per your data structure */}
        <img src={image} alt="Full Size" />

        {imageJson && (
          <div className={imageStyles.jsonContainer}>
            {Object.keys(imageJson).map((key) => {
              if (key !== 'Signature_Base64') {
                return (
                  <li key={key}>
                    <strong>{key}:</strong> {imageJson[key]}
                  </li>
                );
              } else {
                return (
                  <button onClick={openSignatureModal} key={key}>View Signature</button>
                );
              }
            })}
          </div>
        )}
        <div className={imageStyles.buttonContainer}>
          <button onClick={onDownloadClick}>
            Download Image and Metadata
          </button>
        </div>
        <div>
        <span onClick={onClose}>X</span>
        </div>
      </div>
     
    </div>
  );
};

export default ImageModal;

import React from 'react';
import imageStyles from '../styles/images.module.css';

const ImageGallery = ({ images, onImageSelect, numColumns = 3 }) => {
  console.log("Images in Gallery function: " + images); // Place this in `Login.js` and `ImageGallery.js`

  return (
    <div 
      className={imageStyles.imgGallery}
      style={{ '--num-columns': numColumns }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.imageUrl}
          alt={`Image ${index}`}
          onClick={() => onImageSelect(image)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;

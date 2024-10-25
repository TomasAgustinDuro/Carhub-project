import React, { useState } from 'react';
import styles from './Gallery.module.scss'; // Asegúrate de que el nombre del archivo sea correcto

interface GalleryProps {
  images: string[]; // Propiedad que espera un array de URLs de imágenes
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); 

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length); 
  };

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); 
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.selectedImage}>
        <button onClick={handlePrevious} disabled={images.length <= 1} className={styles.arrowButtonLeft}>
          &#8592; 
        </button>
        <img src={images[selectedIndex]} alt={`Imagen ${selectedIndex + 1}`} />
        <button onClick={handleNext} disabled={images.length <= 1} className={styles.arrowButtonRight}>
          &#8594; 
        </button>
      </div>

      <div className={styles.imageThumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${selectedIndex === index ? styles.active : ''}`} 
            onClick={() => handleImageClick(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

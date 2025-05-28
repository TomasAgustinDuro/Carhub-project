import React, { useState } from "react";

interface GalleryProps {
  images: { url: string }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No hay imágenes disponibles
      </div>
    );
  }

  const handleImageClick = (index: number) => setSelectedIndex(index);
  const handleNext = () =>
    setSelectedIndex((prev) => (prev + 1) % images.length);
  const handlePrevious = () =>
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-4xl aspect-[16/9] overflow-hidden">
        <button
          onClick={handlePrevious}
          className="absolute text-3xl text-bold top-1/2 left-2 -translate-y-1/2 z-10 bg-black/70 text-white rounded-full p-2 hover:bg-black/70 transition"
        >
          &#8592;
        </button>

        <img
          src={images[selectedIndex].url}
          alt={`Imagen ${selectedIndex + 1}`}
          className="w-full h-full object-cover rounded"
        />

        <button
          onClick={handleNext}
          className="absolute text-3xl text-bold top-1/2 right-2 -translate-y-1/2 z-10 bg-black/70 text-white rounded-full p-2 hover:bg-black/70 transition"
        >
          &#8594;
        </button>
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={`Miniatura ${i + 1}`}
            onClick={() => handleImageClick(i)}
            className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md transition ${
              i === selectedIndex
                ? "border-blue-500 scale-105"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

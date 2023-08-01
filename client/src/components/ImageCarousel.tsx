import React, { useState } from "react";
import "./styles.css";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };

  const goNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="imgContainer">
      <div className="imgContainer row">
        <button onClick={goPrevious} className="btn btn-prev">
          Prev
        </button>
        <img
          className="img"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
        />
        <button onClick={goNext} className="btn btn-next">
          Next
        </button>
      </div>
      <ul className="dots">
        {Array.from(images, (_, i) => (
          <li
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`${currentIndex === i ? "active" : ""}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageCarousel;

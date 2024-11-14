import React, { useEffect, useRef, useState } from "react";
import Image1 from "./Card1";
import Image2 from "./Card2";
import Image3 from "./Card3";
import Image4 from "./Card4";

const Carousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [<Image1 />, <Image2 />, <Image3 />, <Image4 />];

  // Function to move carousel smoothly
  const scrollCarousel = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Scroll one image at a time
    const totalImages = images.length;
    const imageWidth = carousel.clientWidth;

    // Scroll forward by one image width
    if (carousel.scrollLeft >= totalImages * imageWidth) {
      carousel.scrollLeft = 0; // Reset the scroll position when we reach the end
    } else {
      carousel.scrollBy({ left: imageWidth, behavior: "smooth" });
    }

    // Update current index (scroll position / image width)
    setCurrentIndex(Math.floor(carousel.scrollLeft / imageWidth));
  };

  useEffect(() => {
    const interval = setInterval(scrollCarousel, 2000); // Scroll every 2 seconds
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-hidden w-full scroll-snap-x scroll-snap-mandatory"
        style={{ scrollBehavior: "smooth" }}>
        {/* Duplicate images to create a seamless loop */}
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {images.map((ImageComponent, index) => (
              <div key={index} className="scroll-snap-start flex-none w-full">
                {ImageComponent}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Image Indicator (current image index / total images) */}
      <div className="absolute bottom-4 left-4 text-white font-semibold">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Carousel;

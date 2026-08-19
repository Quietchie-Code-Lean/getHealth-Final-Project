import { useRef, useState, useEffect } from "react";
import CardGen from "./CardGen.jsx";

const SpecialitiesCarousel = ({ specialities }) => {
  const carouselRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 0);

    setCanScrollRight(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
    );
  };

  useEffect(() => {
    updateScrollButtons();
  }, [specialities]);

  const scrollLeft = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const card = carousel.firstElementChild;

    if (!card) return;

    const gap = 24;
    const scrollAmount = card.clientWidth + gap;

    carousel.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const card = carousel.firstElementChild;

    if (!card) return;

    const gap = 24;
    const scrollAmount = card.clientWidth + gap;

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className="absolute left-0 top-[130%] z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xl shadow-md disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous speciality"
      >
        ←
      </button>

      <div
        ref={carouselRef}
        onScroll={updateScrollButtons}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        {specialities.map((speciality) => (
          <div
            key={speciality.id}
            className="w-[calc((100%-3rem)/3)] flex-shrink-0 snap-start"
          >
            <CardGen
              title={speciality.name}
              description={speciality.description}
              className="h-full"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollRight}
        disabled={!canScrollRight}
        className="absolute right-0 top-[130%] z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xl shadow-md disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next speciality"
      >
        →
      </button>
    </div>
  );
};

export default SpecialitiesCarousel;

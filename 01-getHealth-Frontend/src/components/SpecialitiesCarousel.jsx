import { useRef, useState, useEffect } from "react";
import CardGen from "./CardGen.jsx";

const SpecialitiesCarousel = ({ specialities }) => {
  // References the carousel element to control and read its scroll position.
  const carouselRef = useRef(null);

  // Determines whether the user can navigate to the previous or next cards.
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Updates the navigation buttons according to the current carousel position.
  const updateScrollButtons = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 0);

    setCanScrollRight(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
    );
  };

  // Recalculates the navigation state whenever the specialties list changes.
  useEffect(() => {
    updateScrollButtons();
  }, [specialities]);

  // Moves the carousel one card to the left.
  const scrollLeft = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const card = carousel.firstElementChild;

    if (!card) return;

    // Includes the card width and the gap between cards in the scroll amount.
    const gap = 24;
    const scrollAmount = card.clientWidth + gap;

    carousel.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  // Moves the carousel one card to the right.
  const scrollRight = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const card = carousel.firstElementChild;

    if (!card) return;

    // Includes the card width and the gap between cards in the scroll amount.
    const gap = 24;
    const scrollAmount = card.clientWidth + gap;

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Previous button is disabled when the carousel is at the beginning. */}
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

      {/* Next button is disabled when there are no more cards to display. */}
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

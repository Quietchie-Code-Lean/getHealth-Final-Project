import { useRef, useState, useEffect } from "react";
import CardGen from "./CardGen.jsx";

const SpecialitiesCarousel = ({ specialities }) => {

  /* Preset Tailwind Styles */

  const carouselWrapperClass = "relative px-12";
  const carouselClass = "flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory";
  const cardWrapperClass = "w-[calc((100%-3rem)/3)] flex-shrink-0 snap-start";
  const navigationButtonClass = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-600 bg-slate-800/70 px-3 py-2 text-xl text-slate-200 shadow-md backdrop-blur-sm transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-30";
  const previousButtonClass = `${navigationButtonClass} left-0`;
  const nextButtonClass = `${navigationButtonClass} right-0`;

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
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1
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
    <div className={carouselWrapperClass}>

      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={previousButtonClass}
        aria-label="Previous speciality">
        ←
      </button>

      <div
        ref={carouselRef}
        onScroll={updateScrollButtons}
        className={carouselClass}>
        {specialities.map((speciality) => (

          <div
            key={speciality.id}
            className={cardWrapperClass}>

            <CardGen
              title={speciality.name}
              description={speciality.description}
              className="h-full" />

          </div>

        ))}
      </div>

      <button
        type="button"
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={nextButtonClass}
        aria-label="Next speciality">
        →
      </button>

    </div>
  );
};

export default SpecialitiesCarousel;

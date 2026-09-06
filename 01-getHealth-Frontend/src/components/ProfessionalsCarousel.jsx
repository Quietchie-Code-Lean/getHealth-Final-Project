import { useRef, useState, useEffect } from "react";
import CardGen from "./CardGen.jsx";
import { useNavigate } from "react-router-dom";

// ============================================================
// PROFESSIONALS CAROUSEL COMPONENT
// ============================================================

const ProfessionalsCarousel = ({ professionals }) => {

  /* Preset Tailwind Styles */

  const carouselWrapperClass = "relative px-12";
  const carouselClass = "flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory";
  const cardWrapperClass = "w-[calc((100%-3rem)/3)] flex-shrink-0 cursor-pointer snap-start";
  const navigationButtonClass = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-600 bg-slate-800/70 px-3 py-2 text-xl text-slate-200 shadow-md backdrop-blur-sm transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-30";
  const previousButtonClass = `${navigationButtonClass} left-0`;
  const nextButtonClass = `${navigationButtonClass} right-0`;
  const biographyClass = "text-sm leading-relaxed text-slate-400";

  // ============================================================
  // NAVIGATION
  // ============================================================

  const navigate = useNavigate();

  // ============================================================
  // CAROUSEL STATE
  // ============================================================

  const carouselRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(false);

  // ============================================================
  // UPDATE SCROLL BUTTONS
  // ============================================================

  // Updates the navigation buttons according to the carousel position.
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

  }, [professionals]);

  // ============================================================
  // SCROLL LEFT
  // ============================================================

  // Moves the carousel one card to the left.
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

  // ============================================================
  // SCROLL RIGHT
  // ============================================================

  // Moves the carousel one card to the right.
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

  // ============================================================
  // PROFESSIONALS CAROUSEL RENDER
  // ============================================================

  return (
    <div className={carouselWrapperClass}>

      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={previousButtonClass}
        aria-label="Previous professional">
        ←
      </button>

      <div
        ref={carouselRef}
        onScroll={updateScrollButtons}
        className={carouselClass}>

        {professionals.map((professional) => (

          <div
            key={professional.id}
            onClick={() =>
              navigate(`/professionals/${professional.id}`)
            }
            className={cardWrapperClass}>

            <CardGen
              title={`${professional.first_name} ${professional.last_name}`}
              description={
                professional.specialties
                  ?.map((specialty) => specialty.name)
                  .join(", ") || "No specialties available"
              }
              className="h-full">

              {professional.biography && (
                <p className={biographyClass}>
                  {professional.biography}
                </p>
              )}

            </CardGen>

          </div>

        ))}

      </div>

      <button
        type="button"
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={nextButtonClass}
        aria-label="Next professional">
        →
      </button>

    </div>
  );
};

export default ProfessionalsCarousel;
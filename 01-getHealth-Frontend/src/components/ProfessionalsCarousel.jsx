import { useRef, useState, useEffect } from "react";
import CardGen from "./CardGen.jsx";
import { useNavigate } from "react-router-dom";

// ============================================================
// PROFESSIONALS CAROUSEL COMPONENT
// ============================================================
const ProfessionalsCarousel = ({ professionals }) => {
  const navigate = useNavigate();

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
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
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
    <div className="relative">
      <button
        type="button"
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className="absolute left-0 top-[130%] z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xl shadow-md disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous professional"
      >
        ←
      </button>

      <div
        ref={carouselRef}
        onScroll={updateScrollButtons}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        {professionals.map((professional) => (
          <div
            key={professional.id}
            onClick={() => {
              navigate(`/professionals/${professional.id}`);
            }}
            className="w-[calc((100%-3rem)/3)] flex-shrink-0 cursor-pointer snap-start"
          >
            <CardGen
              title={`${professional.first_name} ${professional.last_name}`}
              description={
                professional.specialties
                  ?.map((specialty) => specialty.name)
                  .join(", ") || "No specialties available"
              }
              className="h-full"
            >
              {professional.biography && (
                <p className="text-sm leading-relaxed text-gray-600">
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
        className="absolute right-0 top-[130%] z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-xl shadow-md disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next professional"
      >
        →
      </button>
    </div>
  );
};

export default ProfessionalsCarousel;

import React from "react";

const HeroSection = () => {
    /* Preset Tailwind styles */
    const btnClass = "px-4 py-2 text-gray-500 hover:bg-slate-800 transition";

    return (
        <section>

            <h1>getHealth</h1>

            <h2>Find healthcare professionals and book <br /> your appointment in just a few steps.</h2>
    <br />
            <h2>BACKGROUND IMAGE HERO SECTION</h2>
    <br />
            <button type="submit" className={btnClass}>Book Appointment</button>
            <button type="submit" className={btnClass}>Find Professionals</button>

        </section>
    );
};

export default HeroSection;

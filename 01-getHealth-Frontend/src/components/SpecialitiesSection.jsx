import React from 'react'
import CardGen from './CardGen.jsx';

const SpecialitiesSection = () => {

    /* Preset Tailwind Styles */
    const btnSpecClass = "rounded-lg bg-blue-600 px-4 py-2 text-white";
    const cardsContainer = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

    return (

        <div>
            <h1>Our Specialities</h1>
            <br />
            <h3>Find the care you need</h3>
            <br />
            <div className={cardsContainer}>
                <CardGen
                    title="Cardiology"
                    icon=""
                    description="Search by speciality and find the right healthcare professional for you" />

                <CardGen
                    title="Dermatology"
                    icon=""
                    description="Check the professional’s availability and select the date and time that works best for you." />


                <CardGen
                    title="Traumatology"
                    icon=""
                    description="Review the details and confirm your booking. Your appointment is ready!" />

            </div>
            <button className={btnSpecClass}>
                View all Specialities
            </button>

        </div>

    );
};

export default SpecialitiesSection;

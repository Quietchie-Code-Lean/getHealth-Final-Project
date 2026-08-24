import React from 'react';

import HeroSection from '../components/HeroSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import ProfessionalsSection from '../components/ProfessionalsSection.jsx';
import SpecialitiesSection from '../components/SpecialitiesSection.jsx';


const Home = () => {

  /* Preset Tailwind Styles */
  const pageClass = "bg-slate-100";

  return (

    <div className={pageClass}>

      <HeroSection />
      <HowItWorks />
      <ProfessionalsSection />
      <SpecialitiesSection />

    </div>

  )
}

export default Home

import React from 'react'
import CardGen from './CardGen.jsx'

const HowItWorks = () => {

    /*  Preset Tailwind Styles*/
    const cardsContainer = "flex"


  return (
    
    
    <div>
        <h1>How getHealth Works:</h1>
        <div className={cardsContainer}>

            <CardGen 
            title="Find a Professional"
            icon=""
            description="Search by speciality and find the right healthcare professional for you"

            />
      
            <CardGen 
            title="Choose an Available Time"
            icon=""
            description="Check the professional’s availability and select the date and time that works best for you."
            />
      
            <CardGen 
            title="Confirm Your Appointment"
            icon=""
            description="Review the details and confirm your booking. Your appointment is ready!"
            />
      

        </div>

    </div>
  )
}

export default HowItWorks

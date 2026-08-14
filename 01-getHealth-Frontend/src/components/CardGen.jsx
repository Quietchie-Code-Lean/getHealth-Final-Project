

import React from 'react'

const CardGen = ({icon, title, description, children, className = "",}) => {

    /* Preset Tailwind styles */
    const genCardClass = `bg-white rounded-2xl border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${className}`;
    const iconClass = "mb-4 text-blue-600";
    const tittleClass = "mb-2 text-xl font-semibold text-gray-900";
    const descriptionClass = "text-sm leading-relaxed text-gray-600";
    const extraClass = "mt-4";


    return (

        <div className={genCardClass}>

            {/* Optional icon */}
            {icon && (
                <div className={iconClass}> {icon} </div>
                )}

            {/* Optional title */}
            {title && (
                <h3 className={tittleClass}> {title} </h3>
            )}

            {/* Optional description */}
            {description && (
                <p className={descriptionClass}>{description}</p>
            )}

            {/* Extra custom content */}
            {children && (
                <div className={extraClass}>{children}</div>
            )}</div>

    );
};

export default CardGen

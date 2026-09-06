

const CardGen = ({ icon, title, description, children, className = "" }) => {

/* Preset Tailwind styles */

const genCardClass = `h-full rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-700 hover:shadow-md ${className}`;
const iconClass = "mb-4 text-violet-400";
const tittleClass = "mb-2 text-xl font-semibold text-slate-100";
const descriptionClass = "text-sm leading-relaxed text-slate-400";
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

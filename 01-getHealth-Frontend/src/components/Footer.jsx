
const Footer = () => {
    /* Preset Tailwind styles */
    const footClass = "w-full bg-slate-800 text-white text-center py-4";
    const textClass = "text-sm";
    const footContClass = "flex flex-row justify-evenly";
    
    return (
<>
    <footer className={footClass}>
        <div className={footContClass}>

            <p className={textClass}> getHealth Logo </p> 
            <p className={textClass}> About | Contact | Privacy | Terms </p> 
            <p className={textClass}>© 2026 getHealth</p>


        </div>

    </footer>

</>
    )
};

export default Footer;
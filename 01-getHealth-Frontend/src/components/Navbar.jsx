import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {


  /* Preset Tailwind Styles */
  const navClass = "w-full bg-slate-800 text-white sticky top-0";
  const wrapperClass = "px-6";
  const innerClass = "flex h-16 items-center justify-between";
  const logoClass = "text-xs font-semibold";
  const leftGroupClass = "flex gap-4 items-center";
  const linksContainerClass = "flex gap-4 text-sm";
  const linkBaseClass = "px-2 py-1 rounded-md transition-colors duration-200";

  return (

    <>

      <nav className={navClass}>

        <div className={wrapperClass}>
            <div className={innerClass}>

                <h2 className={logoClass}>getHealth</h2>

                <SearchBar />

                <div className={leftGroupClass}>

                    <div className={linksContainerClass}>



                        <NavLink to="/" className={linkBaseClass}>Home</NavLink>
                        <NavLink to="/professionals" className={linkBaseClass}>Professionals</NavLink>
                        <NavLink to="/specialities" className={linkBaseClass}>Specialities</NavLink>
                        <NavLink to="/register" className={linkBaseClass}>Register</NavLink>
                        {/* 
                        <NavLink to="/login" className={linkBaseClass}>Logout</NavLink>
                        <NavLink to="/login" className={linkBaseClass}>Profile</NavLink> 
                        */}
                        <NavLink to="/login" className={linkBaseClass}>Login</NavLink>


                    </div>

                </div>

            </div>
        </div>

      </nav>

    </>

  );
};

export default Navbar;

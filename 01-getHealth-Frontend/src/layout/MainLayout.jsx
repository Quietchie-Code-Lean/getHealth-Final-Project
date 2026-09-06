import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {

  /* Preset Tailwind Styles */
const containerClass = "flex min-h-screen flex-col bg-slate-950";
const wrapperClass = "flex flex-1 flex-col";

  return (
    <>

        <div className={ containerClass }>
          <Navbar />

          <main className={ wrapperClass }>
            <Outlet />
          </main>

          <Footer />
        </div>

    </>
  );
};

export default MainLayout;
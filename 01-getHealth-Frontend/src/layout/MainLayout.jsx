import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
  /* Preset Tailwind Styles */
  const ContainerClass = "flex min-h-screen flex-col bg-slate-50";
  const wrapperClass = "flex-1";


  return (
    <>

        <div className={ ContainerClass }>
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
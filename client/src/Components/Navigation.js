import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import MobileNavbar from "./MobileNavbar";
import LoginModal from "./Forms/LoginModal";

const Navigation = () => {
  const { modalActive } = React.useContext(AuthContext);
  const [showMenu, setMenu] = React.useState(false);
  React.useEffect(() => {
    const handleMenu = () => {
      if (window.innerWidth > 768) {
        setMenu(false);
      }
    };

    window.addEventListener("resize", handleMenu);
    return () => {
      window.removeEventListener("resize", handleMenu);
    };
  });
  return (
    <>
      {modalActive && <LoginModal />}
      <nav>
        {!showMenu && (
          <div className="baner">
            <h1>
              <Link to="/">Old Town</Link>
            </h1>
          </div>
        )}
        <MobileNavbar showMenu={showMenu} />
        <div onClick={() => setMenu(!showMenu)} className="mobile-menu-bar">
          <i className="fas fa-align-right"></i>
        </div>
      </nav>
    </>
  );
};
export default Navigation;

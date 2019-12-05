import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import { StoreConsumer } from "./Store";
const MobileNavbar = ({ showMenu }) => {
  const { showModal, isAuthorized, userID, logoutUser } = React.useContext(
    AuthContext
  );
  const { cartStore } = React.useContext(StoreConsumer);
  return (
    <div style={{ display: showMenu ? "flex" : null }} className="mobileNavbar">
      <Link to="/">Home</Link>
      <Link to="/list">Books</Link>
      <Link className="link-cart" to="/yourCart">
        Cart
      </Link>

      {isAuthorized ? (
        <Link to={`/auth/user/${userID}`}>Profile</Link>
      ) : (
        <span onClick={showModal}>Sign in</span>
      )}

      <div className="cart">
        <Link to="/yourCart">
          <i className="fas fa-shopping-cart" />
          {cartStore.length > 0 ? (
            <div className="items">
              <span>{cartStore.length}</span>
            </div>
          ) : null}
        </Link>
      </div>
      {isAuthorized && (
        <span onClick={logoutUser}>
          <i className="fas fa-sign-out-alt"></i>
        </span>
      )}
    </div>
  );
};
export default MobileNavbar;

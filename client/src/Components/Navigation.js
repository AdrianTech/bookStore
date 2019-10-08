import React from "react";
import { Link } from "react-router-dom";
import { StoreConsumer } from "./Store";
import { AuthContext } from "./context/Auth";

const Navigation = () => {
   const { cartStore } = React.useContext(StoreConsumer);
   const { user, isAuthorized } = React.useContext(AuthContext);
   return (
      <nav>
         <div className="baner">
            <h1>
               <Link to="/">Old Town</Link>
            </h1>
         </div>
         <div className="cart">
            <Link to="/yourCart">
               <i className="fas fa-shopping-cart" />
               {cartStore.length > 0 ? (
                  <div className="items">
                     <span>{cartStore.length}</span>
                  </div>
               ) : null}
            </Link>
            {isAuthorized ? <p>{user.nickName}'s cart</p> : <p>Book cart</p>}
         </div>
      </nav>
   );
};
export default Navigation;

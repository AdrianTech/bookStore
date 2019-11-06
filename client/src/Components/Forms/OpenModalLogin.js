import React from "react";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";

const OpenModalLogin = () => {
   const { isAuthorized, userID, user } = React.useContext(AuthContext);
   return (
      <>
         {isAuthorized && (
            <div className="user-nav-link">
               <Link to={`/auth/user/${userID}`}>
                  <i className="far fa-user-circle" /> Hello, {user.nickName}
               </Link>
            </div>
         )}
      </>
   );
};
export default OpenModalLogin;

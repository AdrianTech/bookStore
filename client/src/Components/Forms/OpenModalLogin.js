import React from "react";
import LoginForm from "./LoginForm";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";

const OpenModalLogin = () => {
   return (
      <>
         <AuthContext>
            {data => (
               <>
                  {!data.isAuthorized ? (
                     <button className="secondary-btn button-login" onClick={data.showModal}>
                        <i className="far fa-user-circle" />
                        Sign In
                     </button>
                  ) : (
                     <div className="user-nav-link">
                        <Link to={`/auth/user/${data.userID}`}>
                           <i className="far fa-user-circle" /> Hello, {data.user.nickName}
                        </Link>
                     </div>
                  )}
                  {data.modalActive && (
                     <div className="loginForm">
                        <button className="formModalClose" onClick={data.showModal}>
                           <i className="fas fa-times" />
                        </button>
                        <LoginForm data={data} />
                     </div>
                  )}
               </>
            )}
         </AuthContext>
      </>
   );
};
export default OpenModalLogin;

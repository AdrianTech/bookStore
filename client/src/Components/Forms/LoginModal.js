import React from "react";
import LoginForm from "./LoginForm";
import { AuthContext } from "../context/Auth";
const LoginModal = () => {
   const { showModal, step } = React.useContext(AuthContext);
   return (
      <div className="loginForm">
         <button className="formModalClose" onClick={showModal}>
            <i className="fas fa-times" />
         </button>
         <LoginForm step={step} />
      </div>
   );
};
export default LoginModal;

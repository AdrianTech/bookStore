import React from "react";
import LoginForm from "./LoginForm";
import { StoreConsumer, Context } from "../Store";

const OpenModalLogin = () => {
   return (
      <>
         <Context>
            {data => (
               <>
                  {!data.confirmed ? (
                     <button className="secondary-btn button-login" onClick={data.showModal}>
                        <i className="far fa-user-circle" />
                        Sign In
                     </button>
                  ) : (
                     <h4>
                        <i className="far fa-user-circle" /> Hello, {data.nickName}
                     </h4>
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
         </Context>
      </>
   );
};
export default OpenModalLogin;

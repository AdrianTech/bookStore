import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
const ConfirmInfo = () => {
   const { nickName } = useContext(AuthContext);
   return (
      <>
         <h2 className="done">{nickName}, your account has been successfully created. Sign in to you Old Town account.</h2>
      </>
   );
};
export default ConfirmInfo;

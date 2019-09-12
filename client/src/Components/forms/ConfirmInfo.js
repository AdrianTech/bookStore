import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
const ConfirmInfo = () => {
   const { nickName, info } = useContext(AuthContext);
   return (
      <>
         <h2 className="done">
            {nickName}, {info}. Now, you'll be able to sign in.
         </h2>
      </>
   );
};
export default ConfirmInfo;

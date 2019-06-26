import React from "react";
import { useContext } from "react";
import { StoreConsumer } from "../Store";
const ConfirmInfo = () => {
   const { nickName } = useContext(StoreConsumer);
   return (
      <>
         <h2 className="done">{nickName}, your account has been successfully created</h2>
      </>
   );
};
export default ConfirmInfo;

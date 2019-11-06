import React from "react";
import { StoreConsumer } from "./Store";
const InfoModal = () => {
   const { info } = React.useContext(StoreConsumer);
   return (
      <>
         <div className="showModalBox">
            <span>{info}</span>
         </div>
      </>
   );
};
export default InfoModal;

import React from "react";
import { StoreConsumer } from "./Store";
const InfoModal = () => {
   const { info, displayInfo } = React.useContext(StoreConsumer);
   console.log(info);
   let show = "showModalBox";
   if (displayInfo) {
      show += " show";
   }
   console.log(show);
   return (
      <>
         <div className={show}>
            <span>{info}</span>
         </div>
      </>
   );
};
export default InfoModal;

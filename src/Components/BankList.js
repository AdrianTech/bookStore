import React from "react";
import payForm from "./payForm";
import { Link } from "react-router-dom";
const BankList = ({ sum, click, nickName, confirmed }) => {
   const mapPayForm = payForm.map(item => (
      <div key={item.id} className="list">
         <Link to="/end">
            <i className={item.icon} />
            <p>{item.name}</p>
         </Link>
      </div>
   ));

   return (
      <div className="bankList" onClick={click}>
         <button onClick={click}>
            <i className="far fa-times-circle" />
         </button>
         {confirmed ? (
            <h3>
               {nickName}, you'll pay only: {sum} &euro;
            </h3>
         ) : (
            <h3>You'll pay only: {sum} &euro;</h3>
         )}
         <div className="showPayForm">{mapPayForm}</div>
      </div>
   );
};

export default BankList;

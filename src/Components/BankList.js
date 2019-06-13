import React from "react";
import payForm from "./payForm";
import { Link } from "react-router-dom";
const BankList = ({ sum, click }) => {
   const mapPayForm = payForm.map(item => (
      <div key={item.id} className="list">
         <Link to="/end">
            <i className={item.icon} />
            <p>{item.name}</p>
         </Link>
      </div>
   ));

   return (
      <div className="bankList">
         <button onClick={click}>
            <i className="far fa-times-circle" />
         </button>
         <h3>You'll pay only {sum} &euro;</h3>
         <div className="showPayForm">{mapPayForm}</div>
      </div>
   );
};

export default BankList;

import React, { useContext } from "react";
import payForm from "./payForm";
import { Link } from "react-router-dom";
import { StoreConsumer } from "../Components/Store";
const BankList = ({ click }) => {
   const { sum, nickName, confirmed } = useContext(StoreConsumer);
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
            <h3 style={{ marginBottom: nickName.length > 7 ? "8px" : null }}>
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

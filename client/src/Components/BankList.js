import React, { useContext } from "react";
import payForm from "./payForm";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import { StoreConsumer } from "./Store";
const BankList = ({ click, resetBasket }) => {
   const { user } = useContext(AuthContext);
   const { sum } = useContext(StoreConsumer);
   const mapPayForm = payForm.map(item => (
      <div key={item.id} className="list" onClick={resetBasket}>
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
         {user ? (
            <h3 style={{ marginBottom: user.nickName.length > 7 ? "8px" : null }}>
               {user.nickName}, you'll pay only: {sum} &euro;
            </h3>
         ) : (
            <h3>
               You'll pay only:{" "}
               {sum.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
               })}{" "}
               &euro;
            </h3>
         )}
         <div className="showPayForm">{mapPayForm}</div>
      </div>
   );
};

export default BankList;

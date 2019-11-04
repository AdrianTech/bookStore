import React from "react";
import { Link } from "react-router-dom";
const Terms = () => {
   return (
      <div className="terms">
         <h2>Our Terms & Conditions</h2>
         <h3> First of all, it's not a real servis, which means, that you needn't to accept any terms...</h3>
         <h4>Hmm, that's it!</h4>
         <h3>Thanks for testing my dummy bookstore</h3>
         <Link to="/yourCart">Return to Your Basket</Link>
      </div>
   );
};
export default Terms;

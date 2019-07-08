import React from "react";
import { useContext } from "react";
import { StoreConsumer } from "../Store";
import { Link } from "react-router-dom";
const SignUpFinal = () => {
   const { handleForms, nickName, dateBirth, handleStepDown, phone, handleSubmitForm } = useContext(StoreConsumer);
   return (
      <>
         <div className="form">
            <form onSubmit={handleSubmitForm}>
               <label>Enter your nickname</label>
               <input type="text" name="nickName" value={nickName} onChange={handleForms} />
               <label>Your date of birth*</label>
               <input type="date" min="1900-01-01" name="dateBirth" value={dateBirth} onChange={handleForms} />
               <label>Your phone number*</label>
               <input type="text" name="phone" value={phone} onChange={handleForms} />
               <button className="form-btn">Confirm data</button>
            </form>
            <button className="form-btn" onClick={handleStepDown}>
               Previous form
            </button>
            <p>
               By clicking on Confirm Data, you agree to OldTow's <Link to="/terms">Terms and Conditions of Use.</Link>
            </p>
            <h6>* - it's not required</h6>
         </div>
      </>
   );
};
export default SignUpFinal;

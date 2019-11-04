import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";
const SignUpFinal = () => {
   const { handleForms, handleStepDown, phone, handleSubmitForm, password } = useContext(AuthContext);
   return (
      <>
         <div className="form">
            <form className="forms" onSubmit={handleSubmitForm}>
               <label>Password</label>
               <input type="password" name="password" value={password} onChange={handleForms} />
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

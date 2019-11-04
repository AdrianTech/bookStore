import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
const SignUp = () => {
   const { handleForms, fullname, handleStepUp, email, nickName } = useContext(AuthContext);
   return (
      <>
         <div className="form">
            <div className="forms">
               <h2>Create your account</h2>
               <label>Your full name:</label>
               <input type="text" name="fullname" value={fullname} onChange={handleForms} />
               <label>Your email:</label>
               <input type="email" name="email" value={email} onChange={handleForms} />
               <label>Enter your nickname</label>
               <input type="text" name="nickName" value={nickName} onChange={handleForms} />
               <button className="form-btn" onClick={handleStepUp}>
                  Next form
               </button>
            </div>
         </div>
      </>
   );
};
export default SignUp;

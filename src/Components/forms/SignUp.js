import React from "react";
import { useContext } from "react";
import { StoreConsumer } from "../Store";
const SignUp = () => {
   const { handleForms, firstName, lastName, email, handleSubmitForm } = useContext(StoreConsumer);
   return (
      <>
         <div className="form">
            <form onSubmit={handleSubmitForm} noValidate>
               <h2>Create your account</h2>
               <label>First name:</label>
               <input type="text" name="firstName" value={firstName} onChange={handleForms} />
               <label>Last name:</label>
               <input type="text" name="lastName" value={lastName} onChange={handleForms} />
               <label>Your email:</label>
               <input type="email" name="email" value={email} onChange={handleForms} />
               <button className="form-btn">Next form</button>
            </form>
         </div>
      </>
   );
};
export default SignUp;

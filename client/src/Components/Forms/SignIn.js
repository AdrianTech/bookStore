import React from "react";
import { useContext } from "react";
// import { StoreConsumer } from "../Store";
import { AuthContext } from "../context/Auth";
const SignIn = () => {
   const { handleLogIn, handleForms, handleStepUp, email, password } = useContext(AuthContext);
   return (
      <>
         <div className="form">
            <form className="forms" onSubmit={handleLogIn}>
               <h3>Sign in</h3>
               <label htmlFor="LogIn">Your Email</label>
               <input type="text" name="email" value={email} onChange={handleForms} />
               <label htmlFor="password">Password</label>
               <input type="password" name="password" value={password} onChange={handleForms} />
               <button className="form-btn">Log in</button>
            </form>
            <h3>OR</h3>
            <button className="signUp-btn" onClick={handleStepUp}>
               Create account
            </button>
         </div>
      </>
   );
};
export default SignIn;

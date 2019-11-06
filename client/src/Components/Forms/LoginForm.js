import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignUpFinal from "./SignUpFinal";
import ConfirmInfo from "./ConfirmInfo";

const LoginForm = ({ step }) => {
   let showForms;
   if (step === 1) {
      return (showForms = <SignIn />);
   } else if (step === 2) {
      return (showForms = <SignUp />);
   } else if (step === 3) {
      return (showForms = <SignUpFinal />);
   } else if (step === 4) {
      return (showForms = <ConfirmInfo />);
   }

   return <>{showForms}</>;
};
export default LoginForm;

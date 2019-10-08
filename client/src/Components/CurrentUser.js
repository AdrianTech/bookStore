import React from "react";
import { AuthContext } from "./context/Auth";
const CurrentUser = () => {
   const { user, deleteUserAccount } = React.useContext(AuthContext);
   return (
      <>
         <h3> Your Name: {user.fullname}</h3>
         <h3> Nickname: {user.nickName}</h3>
         <h3> Phone number: {user.phone}</h3>
         <h3> Your email: {user.email}</h3>
         <h3> You're here since: {user.registerDate}</h3>
         <button onClick={() => deleteUserAccount(user._id)} className="btn-delete-user">
            Delete account
         </button>
      </>
   );
};
export default CurrentUser;

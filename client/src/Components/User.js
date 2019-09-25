import React, { useContext, useState } from "react";
import AdminPanel from "./AdminPanel";
import { AuthContext } from "./context/Auth";
import { Link } from "react-router-dom";
const User = () => {
   const { user, logoutUser } = useContext(AuthContext);
   const [showPanel, displayAdminPanel] = useState(false);
   return (
      <>
         {user && (
            <div className="userProfil">
               <button className="user-btn">Edit your data</button>
               <Link to="/yourCart">
                  <button className="secondary-btn user-btn-logout" onClick={logoutUser}>
                     <i className="fas fa-sign-out-alt"></i>
                     Logout
                  </button>
               </Link>
               <h2> Your Name: {user.fullname}</h2>
               <h3> Nickname: {user.nickName}</h3>
               <h3> Phone number: {user.phone}</h3>
               <h3> Your email: {user.email}</h3>
               <h3> You're here since: {user.registerDate}</h3>
               {user.isAdmin && (
                  <button onClick={() => displayAdminPanel(!showPanel)} className="main-btn btn-admin">
                     Show Admin Panel
                  </button>
               )}
               {showPanel && <AdminPanel />}
            </div>
         )}
      </>
   );
};
export default User;

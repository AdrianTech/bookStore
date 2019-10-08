import React from "react";
import { AuthContext } from "./context/Auth";

const UpdateUser = ({ click }) => {
   const { user, fullname, email, phone, nickName, updateUserData, handleForms } = React.useContext(AuthContext);
   return (
      <div className="show-modal">
         <form onSubmit={updateUserData} className="cms-form ">
            <div onClick={() => click(false)} className="close">
               <i className="far fa-times-circle"></i>
            </div>
            <label> Change your full name</label>
            <input type="text" value={fullname} name="fullname" placeholder={user.fullname} onChange={handleForms} />

            <label>Your nickname</label>
            <input type="text" value={nickName} name="nickName" placeholder={user.nickName} onChange={handleForms} />

            <label>Your email</label>
            <input type="text" value={email} name="email" placeholder={user.email} onChange={handleForms} />

            <label>Your phone number</label>
            <input type="text" value={phone} name="phone" placeholder={user.phone} onChange={handleForms} />
            <button>Confirm</button>
         </form>
      </div>
   );
};
export default UpdateUser;

import React from "react";
import { AuthContext } from "./context/Auth";

const UpdateUser = ({ click }) => {
  const {
    user,
    fullname,
    email,
    phone,
    nickName,
    password,
    newPassword,
    updateUserData,
    handleForms
  } = React.useContext(AuthContext);
  const [changePass, setNewPass] = React.useState(false);
  return (
    <div className="show-modal">
      <form onSubmit={updateUserData} className="cms-form ">
        <div onClick={() => click(false)} className="close">
          <i className="far fa-times-circle"></i>
        </div>
        <label> Change your full name</label>
        <input
          type="text"
          value={fullname}
          name="fullname"
          placeholder={user.fullname}
          onChange={handleForms}
        />

        <label>Your nickname</label>
        <input
          type="text"
          value={nickName}
          name="nickName"
          placeholder={user.nickName}
          onChange={handleForms}
        />

        <label>Your email</label>
        <input
          type="email"
          value={email}
          name="email"
          placeholder={user.email}
          onChange={handleForms}
        />

        <label>Your phone number</label>
        <input
          type="text"
          value={phone}
          name="phone"
          placeholder={user.phone}
          onChange={handleForms}
        />
        {changePass && (
          <>
            <label>Enter new password</label>
            <input
              type="password"
              value={newPassword}
              name="newPassword"
              onChange={handleForms}
              autoComplete="new-password"
            />{" "}
          </>
        )}
        <label>
          {changePass ? <>To confirm, enter old password</> : <>To confirm, enter password</>}
        </label>
        <input type="password" value={password} name="password" onChange={handleForms} />
        <button>Confirm</button>
        {!changePass && <button onClick={() => setNewPass(true)}>Change old password</button>}
      </form>
    </div>
  );
};
export default UpdateUser;

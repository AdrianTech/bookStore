import React from "react";
import { AuthContext } from "./context/Auth";
const CurrentUser = () => {
  const { user, deleteUserAccount, chatStatus } = React.useContext(AuthContext);
  let date = user.registerDate.split("");
  date.splice(-3);
  return (
    <>
      <div className="user-list">
        <h3>Full name:</h3>
        <span>{user.fullname}</span>
      </div>
      <div className="user-list">
        <h3>Nickname:</h3>
        <span>{user.nickName}</span>
      </div>
      <div className="user-list">
        <h3>Phone:</h3>
        <span>{user.phone}</span>
      </div>
      <div className="user-list">
        <h3>Email:</h3>
        <span>{user.email}</span>
      </div>
      <div className="user-list">
        <h3>Registration:</h3>
        <span>{date}</span>
      </div>
      <div className="user-data-buttons">
        <button
          onClick={() => deleteUserAccount(user._id)}
          className="btn-delete-user"
        >
          Delete account
        </button>
        <button
          className="btn-chat-status"
          onClick={() => chatStatus(user.isChatActive)}
        >
          {user.isChatActive ? "Hide chat" : "Show chat"}
        </button>
      </div>
    </>
  );
};
export default CurrentUser;

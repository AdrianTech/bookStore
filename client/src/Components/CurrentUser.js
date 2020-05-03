import React from "react";
import { AuthContext } from "./context/Auth";
import { Redirect } from "react-router-dom";
const CurrentUser = () => {
  const { user, deleteUserAccount, chatStatus, isAuthorized, userID } = React.useContext(AuthContext);
  let date = user.registerDate.split("");
  date.splice(-3);
  if (!isAuthorized) {
    setTimeout(() => {
      return <Redirect to="/" />;
    }, 2500);
  }
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
        <button onClick={() => deleteUserAccount(userID)} className="btn-delete-user">
          Delete account
        </button>
        <button className="btn-chat-status" onClick={() => chatStatus(user.isChatActive)}>
          {user.isChatActive ? "Hide chat" : "Show chat"}
        </button>
      </div>
    </>
  );
};
export default CurrentUser;

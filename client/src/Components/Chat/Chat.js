import React from "react";
import { AuthContext } from "../context/Auth";
import ChatUser from "./ChatUser";
const Chat = () => {
  const [showChat, setChat] = React.useState(false);
  const { chatUsers, userID } = React.useContext(AuthContext);
  let users;
  if (showChat) {
    users = chatUsers
      .filter(user => user._id !== userID && !user.isAdmin && user.isChatActive)
      .map(user => <ChatUser key={user._id} chatUser={user} />);
  }
  return (
    <>
      {!showChat ? (
        <div onClick={() => setChat(true)} className="chat">
          Your Chat
        </div>
      ) : (
        <div className="chat">
          <div className="chat-buttons">
            <span className="chat-close-btn" onClick={() => setChat(false)}>
              <i className="far fa-window-close"></i>
            </span>
          </div>
          <ul>{users}</ul>
        </div>
      )}
    </>
  );
};
export default Chat;

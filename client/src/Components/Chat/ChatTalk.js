import React from "react";
import { AuthContext } from "../context/Auth";
const ChatTalk = ({ chatUser }) => {
  const {
    showChatWindow,
    chatTalks,
    handleForms,
    chatMessage,
    sendMessage,
    deleteMessage,
    userID,
    user
  } = React.useContext(AuthContext);
  const { _id, nickName } = chatUser[0];
  let chat;
  let messageAuthor;
  if (chatTalks.length > 0) {
    chat = chatTalks.map(chat => {
      if (chat.from === userID) messageAuthor = user.nickName;
      else messageAuthor = nickName;
      return (
        <div
          style={{
            backgroundColor:
              messageAuthor === user.nickName ? "#d3f8ef" : "#f7d9b3"
          }}
          key={chat.id}
          className="chatMessages"
          onDoubleClick={() => deleteMessage(chat.id, userID)}
        >
          <span className="from">{messageAuthor} said:</span>
          <p>{chat.message}</p>
        </div>
      );
    });
  } else {
    chat = (
      <p style={{ textAlign: "center", backgroundColor: "#fff" }}>
        Just say "Hello"
      </p>
    );
  }
  React.useEffect(() => {
    const chatContent = document.querySelector(".chatContent");
    chatContent.scrollTop = chatContent.scrollHeight;
  }, [chatTalks.length]);
  return (
    <div className="chatWindow">
      <div className="chat-buttons talk">
        <p>{chatUser[0].nickName}</p>
        <span onClick={() => showChatWindow(false)}>
          <i className="far fa-window-close"></i>
        </span>
      </div>
      <div className="chatContent">{chat}</div>
      <form data-id={_id} onSubmit={sendMessage}>
        <input
          autoComplete="off"
          type="text"
          value={chatMessage}
          name="chatMessage"
          onChange={handleForms}
        />
      </form>
    </div>
  );
};
export default ChatTalk;

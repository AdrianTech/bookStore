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
  let chat;
  let messageAuthor;
  if (chatUser.length === 1 && chatTalks.length > 0) {
    chat = chatTalks.map(chat => {
      if (chat.from === userID) messageAuthor = user.nickName;
      else messageAuthor = chatUser[0].nickName;
      return (
        <div
          style={{
            backgroundColor:
              messageAuthor === user.nickName ? "#d3f8ef" : "bisque"
          }}
          key={chat.id}
          className="chatMessages"
          onDoubleClick={() => deleteMessage(chat.id, chat.from)}
        >
          <span className="from">
            {messageAuthor} said:{" "}
            <span className="chat-time">[{chat.time}]</span>
          </span>
          <p>{chat.message}</p>
        </div>
      );
    });
  } else {
    chat = (
      <p
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          marginTop: "15px",
          fontFamily: "Poppins",
          fontSize: "16px"
        }}
      >
        Your Chat
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
      <form data-id={chatUser[0]._id} onSubmit={sendMessage}>
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

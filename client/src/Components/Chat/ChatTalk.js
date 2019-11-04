import React from "react";
import { AuthContext } from "../context/Auth";
const ChatTalk = ({ user }) => {
   const { showChatWindow, chatTalks, handleForms, chatMessage, sendMessage } = React.useContext(AuthContext);
   const { _id } = user[0];
   let chat;
   if (chatTalks.length > 0) {
      chat = chatTalks.map(chat => (
         <div key={chat.id} className="chatMessages">
            <span className="from">{chat.from} said:</span>
            <p>{chat.message}</p>
         </div>
      ));
   } else {
      chat = <p style={{ textAlign: "center", backgroundColor: "#fff" }}>Just say "Hello"</p>;
   }
   React.useEffect(() => {
      const chatContent = document.querySelector(".chatContent");
      chatContent.scrollTop = chatContent.scrollHeight;
   }, [chatTalks]);
   return (
      <div className="chatWindow">
         <div className="chat-buttons">
            <p>{user[0].nickName}</p>
            <span onClick={() => showChatWindow(false)}>
               <i className="far fa-window-close"></i>
            </span>
         </div>
         <div className="chatContent">{chat}</div>
         <form data-id={_id} onSubmit={sendMessage}>
            <input type="text" value={chatMessage} name="chatMessage" onChange={handleForms} />
         </form>
      </div>
   );
};
export default ChatTalk;

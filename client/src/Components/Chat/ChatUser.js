import React from "react";
import { AuthContext } from "../context/Auth";
const ChatUser = ({ chatUser }) => {
   const { showChatWindow } = React.useContext(AuthContext);
   return (
      <>
         <li onClick={() => showChatWindow(true, chatUser._id)}>{chatUser.nickName}</li>
      </>
   );
};
export default ChatUser;

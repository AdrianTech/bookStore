import React from "react";
import { AuthContext } from "../context/Auth";
const ChatUser = ({ user }) => {
   const { showChatWindow } = React.useContext(AuthContext);
   return (
      <>
         <li onClick={() => showChatWindow(true, user._id)}>{user.nickName}</li>
      </>
   );
};
export default ChatUser;

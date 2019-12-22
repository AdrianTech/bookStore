import "./styles/main.scss";
import "./index.scss";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import BookList from "./Components/BookList";
import ViewBook from "./Components/ViewBook";
import YourCart from "./Components/BookCart";
import PageNotFound from "./Components/NotFound";
import End from "./Components/End";
import Terms from "./Components/Forms/Terms";
import EnterPage from "./Components/EnterPage";
import User from "./Components/User";
import Chat from "./Components/Chat/Chat";
import ChatTalk from "./Components/Chat/ChatTalk";
import InfoModal from "./Components/InfoModal";
import { AuthContext } from "./Components/context/Auth";
import { StoreConsumer } from "./Components/Store";

const BookStore = () => {
  const { isAuthorized, openChatWindow, chatUsers, user } = React.useContext(
    AuthContext
  );
  const { displayInfo } = React.useContext(StoreConsumer);
  let chatUser;
  if (openChatWindow.bool) {
    chatUser = chatUsers.filter(item => item._id === openChatWindow["id"]);
  }
  return (
    <>
      <div className="wrapper">
        <Switch>
          <Route path="/" exact component={EnterPage} />
          <Route path="/list" exact component={BookList} />
          <Route path="/viewBook/:id" component={ViewBook} />
          <Route path="/end" component={End} />
          <Route path="/yourCart" component={YourCart} />
          <Route path="/terms" component={Terms} />
          <Route path="/auth/user/:id" component={User} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Navigation />
      {displayInfo && <InfoModal />}
      {isAuthorized && user.isChatActive && <Chat />}
      {isAuthorized && user.isChatActive && openChatWindow["bool"] && (
        <ChatTalk chatUser={chatUser} />
      )}
    </>
  );
};
export default BookStore;

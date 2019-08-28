import "./styles/main.scss";
import "./index.scss";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import BookList from "./Components/BookList";
import ViewBook from "./Components/ViewBook";
import YourCart from "./Components/BookCart";
import PageNotFound from "./Components/NotFound";
import End from "./Components/End";
import Terms from "./Components/forms/Terms";
import EnterPage from "./Components/EnterPage";
//import bg from "./img/bookStore.jpg";

class BookStore extends Component {
   render() {
      // const bgImg = {
      //    backgroundImage: `url(${bg})`,
      //    backgroundPosition: "cover",
      //    position: "relative",
      //    zIndex: "-100"
      // };

      return (
         <>
            <Navigation />
            <div className="wrapper">
               <Switch>
                  <Route path="/" exact component={EnterPage} />
                  <Route path="/list" exact component={BookList} />
                  <Route path="/viewBook/:id" component={ViewBook} />
                  <Route path="/end" component={End} />
                  <Route path="/yourCart" component={YourCart} />
                  <Route path="/terms" component={Terms} />
                  <Route component={PageNotFound} />
               </Switch>
            </div>
         </>
      );
   }
}
export default BookStore;
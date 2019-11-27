import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import BookStore from "./BookStore";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./Components/Store";
import { AuthProvider } from "./Components/context/Auth";
// if (
//    process.env.NODE_ENV === "production"
// ) {
//    window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
// }

ReactDOM.render(
  <StoreProvider>
    <AuthProvider>
      <Router>
        <BookStore />
      </Router>
    </AuthProvider>
  </StoreProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();

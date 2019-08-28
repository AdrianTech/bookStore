import React, { Component } from "react";
const AuthContext = React.createContext();

class AuthProvider extends Component {
   state = {
      isAutenticated: false,
      token: null
   };

   componentDidMount() {}

   render() {
      const { isAutenticated, token } = this.state;

      return <AuthContext.Provider value={{ isAutenticated, token }}>{this.props.children}</AuthContext.Provider>;
   }
}
export { AuthProvider, AuthContext };

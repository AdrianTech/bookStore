import React, { Component } from "react";
const AuthContext = React.createContext();

class AuthProvider extends Component {
   state = {
      isAuthorized: false,
      token: null,
      step: 1,
      fullname: "",
      nickName: "",
      email: "",
      password: "",
      modalActive: "",
      phone: "",
      confirmed: false,
      info: "",
      user: null,
      userID: ""
   };
   componentDidMount() {
      this.getUser();
   }
   logoutUser = () => {
      localStorage.clear();
      console.log("Logout");
      this.setState({
         isAuthorized: false,
         token: null,
         userID: "",
         user: null
      });
   };

   getUser = () => {
      const userAuth = JSON.parse(localStorage.getItem("auth-token"));
      if (!userAuth || !userAuth.id) return;
      const myHeaders = new Headers({
         "Content-Type": "application/json",
         "auth-token": userAuth.token
      });
      fetch(`/user/${userAuth.id}`, {
         headers: myHeaders
      })
         .then(res => {
            if (res.ok) return res.json();
            else return;
         })
         .then(data => {
            console.log(data);
            this.setState({
               user: data,
               userID: data._id,
               isAuthorized: true,
               token: userAuth.token
            });
         })
         .catch(err => err);
   };
   handleForms = e => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
         [name]: value
      });
   };
   handleLogIn = e => {
      e.preventDefault();
      const { password, email } = this.state;
      fetch("/user/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      })
         .then(res => res.json())
         .then(res => {
            const userToken = { token: res.token, id: res.id };
            localStorage.setItem("auth-token", JSON.stringify(userToken));
            if (res.user) {
               this.setState({
                  user: res.user,
                  isAuthorized: true,
                  modalActive: false,
                  userID: res.id,
                  token: res.token,
                  email: "",
                  password: ""
               });
            }
         });
   };
   handleSubmitForm = e => {
      e.preventDefault();
      let registerDate;
      registerDate = new Date().toLocaleString();
      const { nickName, fullname, email, password, phone, step } = this.state;
      fetch("/user/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ fullname, email, nickName, password, phone, registerDate })
      })
         .then(res => {
            if (res.ok) {
               this.setState({
                  step: step + 1
               });
            }
            return res.json();
         })
         .then(res => {
            this.setState({
               info: res
            });
         });
   };

   handleStepUp = () => {
      const { email, step, nickName, fullname } = this.state;
      if (step === 2) {
         const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
         if (fullname.trim().length > 5 && nickName.trim().length > 2 && validate.test(email)) {
            this.setState({
               confirmed: false,
               step: step + 1
            });
         } else {
            alert("Please, fill out correctly all the required fields");
            return;
         }
      }
      this.setState({
         step: step + 1
      });
   };
   handleStepDown = () => {
      const { step } = this.state;
      this.setState({
         step: step - 1
      });
   };
   showModal = () => {
      const { modalActive } = this.state;
      this.setState({
         modalActive: !modalActive,
         step: 1
      });
   };

   render() {
      const {
         isAuthorized,
         token,
         email,
         phone,
         confirmed,
         fullname,
         nickName,
         modalActive,
         step,
         info,
         password,
         user,
         userID
      } = this.state;
      const { showModal, handleForms, handleLogIn, handleStepDown, handleStepUp, handleSubmitForm, logoutUser } = this;

      return (
         <AuthContext.Provider
            value={{
               isAuthorized,
               token,
               user,
               email,
               phone,
               userID,
               confirmed,
               nickName,
               modalActive,
               step,
               info,
               password,
               fullname,
               showModal,
               handleForms,
               handleLogIn,
               handleStepDown,
               handleStepUp,
               handleSubmitForm,
               logoutUser
            }}
         >
            {this.props.children}
         </AuthContext.Provider>
      );
   }
}
export { AuthProvider, AuthContext };

import { StoreConsumer } from "../../Components/Store";
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
      newPassword: "",
      modalActive: "",
      phone: "",
      confirmed: false,
      info: "",
      user: null,
      userID: "",
      chatUsers: [],
      chatMessage: "",
      chatTalks: [],
      openChatWindow: false
   };
   static contextType = StoreConsumer;
   componentDidMount() {
      this.getUser();
      this.getChatUser();
   }
   logoutUser = () => {
      localStorage.clear();
      this.setState({
         isAuthorized: false,
         token: null,
         userID: "",
         user: null,
         chatUsers: []
      });
   };
   getTokenFromLS() {
      const userAuth = JSON.parse(localStorage.getItem("auth-token"));
      return userAuth;
   }
   sendMessage = async e => {
      e.preventDefault();
      const { id } = e.target.dataset;
      const { userID, chatMessage, user } = this.state;
      const userAuth = this.getTokenFromLS();
      const data = {
         from: user.nickName,
         chatMessage,
         Ids: [id, userID],
         time: new Date().toLocaleString()
      };
      const fetchSettings = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "auth-token": userAuth.token
         },
         body: JSON.stringify(data)
      };

      try {
         let response = await fetch(`/user/sendMessage`, fetchSettings);
         const data = await response.json();
         if (response.ok) {
            this.setState(() => ({
               chatMessage: "",
               chatTalks: data
            }));
         }
      } catch (err) {
         alert(err);
      }
   };
   // test = async data => {
   //    console.log(data);
   //    const userAuth = this.getTokenFromLS();
   //    const data = {
   //       id1: id,
   //       id2: this.state.userID
   //    };
   //    const fetchSettings = {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/json",
   //          "auth-token": userAuth.token
   //       },
   //       body: JSON.stringify(data)
   //    };

   //    try {
   //       let response = await fetch(`/user/getChatTalk`, fetchSettings);
   //       const data = await response.json();
   //       this.setState(() => ({
   //          chatTalks: data
   //       }));
   //    } catch (err) {
   //       alert(err);
   //    }
   // };
   showChatWindow = async (bool, id) => {
      this.setState({
         openChatWindow: { bool, id },
         chatTalks: []
      });
      if (!id) return;
      const userAuth = this.getTokenFromLS();
      const data = {
         id1: id,
         id2: this.state.userID
      };
      const fetchSettings = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "auth-token": userAuth.token
         },
         body: JSON.stringify(data)
      };
      const { showInfo } = this.context;
      try {
         let response = await fetch(`/user/getChatTalk`, fetchSettings);
         const data = await response.json();
         if (response.ok) {
            this.setState(() => ({
               chatTalks: data
            }));
         }
      } catch (err) {
         showInfo(err);
      }
   };

   getUser = () => {
      const userAuth = this.getTokenFromLS();
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
      const { showInfo } = this.context;
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
               this.getChatUser();
            } else {
               showInfo(res);
            }
         });
   };
   async getChatUser() {
      const userAuth = this.getTokenFromLS();
      if (!userAuth) return;
      const fetchSettings = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "auth-token": userAuth.token
         }
      };
      let res = await fetch("/user/getChatUser", fetchSettings);
      let data = await res.json();
      this.setState({
         chatUsers: data
      });
   }
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
         body: JSON.stringify({ fullname, email, nickName, password, phone, registerDate, isChatActiv: true })
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
            if (this.state.step === 3) return alert(res);
            this.setState({
               info: res
            });
         });
   };
   updateUserData = async e => {
      const userAuth = this.getTokenFromLS();
      e.preventDefault();
      const { fullname, email, phone, nickName, userID, password, newPassword } = this.state;
      const updateData = {
         fullname,
         email,
         phone,
         nickName,
         password,
         newPassword
      };
      let validate = 0;
      Object.entries(updateData).map(([prop, value]) => {
         if (!value) validate++;
         return validate;
      });
      if (validate === Object.keys(updateData).length) return alert("Change at least one field");
      const fetchSettings = {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            "auth-token": userAuth.token
         },
         body: JSON.stringify(updateData)
      };
      const { showInfo } = this.context;
      try {
         let response = await fetch(`/user/${userID}`, fetchSettings);
         if (response.ok) {
            this.setState({
               fullname: "",
               email: "",
               phone: "",
               nickName: "",
               userID: "",
               password: "",
               newPassword: ""
            });
            this.getUser();
         }
         const data = await response.json();
         showInfo(data);
      } catch (err) {
         showInfo(err);
      }
   };

   handleStepUp = () => {
      const { email, step, nickName, fullname } = this.state;
      const { showInfo } = this.context;
      if (step === 2) {
         const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
         if (fullname.trim().length > 5 && nickName.trim().length > 2 && validate.test(email)) {
            this.setState({
               confirmed: false,
               step: step + 1
            });
         } else {
            showInfo("Please, fill out correctly all the required fields");
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
   deleteUserAccount = async id => {
      const userAuth = JSON.parse(localStorage.getItem("auth-token"));
      const cfm = window.confirm("Are you sure that you want to delete the account?");
      if (!cfm) return;
      const fetchSettings = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            "auth-token": userAuth.token
         },
         body: JSON.stringify()
      };
      const { showInfo } = this.context;
      try {
         let response = await fetch(`/user/delete/${id}`, fetchSettings);
         if (response.ok) {
            this.setState({
               user: null,
               isAuthorized: false
            });
            localStorage.clear();
         }
         const data = await response.json();
         showInfo(data);
      } catch (err) {
         showInfo(err);
      }
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
         chatMessage,
         password,
         user,
         userID,
         newPassword,
         chatUsers,
         openChatWindow,
         chatTalks
      } = this.state;
      const {
         showModal,
         handleForms,
         handleLogIn,
         handleStepDown,
         handleStepUp,
         handleSubmitForm,
         logoutUser,
         updateUserData,
         deleteUserAccount,
         showChatWindow,
         sendMessage
      } = this;

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
               chatUsers,
               newPassword,
               openChatWindow,
               showModal,
               chatMessage,
               chatTalks,
               handleForms,
               handleLogIn,
               handleStepDown,
               handleStepUp,
               handleSubmitForm,
               logoutUser,
               updateUserData,
               deleteUserAccount,
               showChatWindow,
               sendMessage
            }}
         >
            {this.props.children}
         </AuthContext.Provider>
      );
   }
}
export { AuthProvider, AuthContext };

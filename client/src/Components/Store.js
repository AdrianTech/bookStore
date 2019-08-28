import React, { Component } from "react";
//import { books } from "../data";

const BookContext = React.createContext();

class StoreProvider extends Component {
   state = {
      booksData: [],
      cartStore: [],
      sum: 0,
      itemSum: 0,
      step: 1,
      firstName: "",
      lastName: "",
      nickName: "",
      email: "",
      password: "",
      dateBirth: "",
      modalActive: "",
      phone: "",
      confirmed: false,
      info: ""
   };
   componentDidMount() {
      //this.setBook();
      this.getData();
   }

   getData = () => {
      fetch("/products")
         .then(response => response.json())
         .then(data => {
            this.setState({ booksData: data });
         })
         .catch(err => err);
   };

   // setBook = () => {
   //    let booksData = [];
   //    books.forEach(item => {
   //       const book = { ...item };
   //       booksData = [...booksData, book];
   //    });
   //    this.setState({
   //       booksData
   //    });
   // };

   addToBasket = id => {
      const { booksData, cartStore } = this.state;
      let data = [...booksData];
      const book = booksData.find(item => item._id === id);
      const index = data.indexOf(book);
      const item = data[index];
      item.isActive = true;
      item.count = 1;
      const price = item.price;
      item.total = price;
      this.setState(
         {
            booksData: data,
            cartStore: [...cartStore, item]
         },
         () => this.summary()
      );
   };
   deleteItem = id => {
      const { cartStore, booksData } = this.state;
      let cart = [...cartStore];
      let books = [...booksData];
      cart = cart.filter(item => item._id !== id);
      const findItem = booksData.find(item => item._id === id);
      const index = books.indexOf(findItem);
      let deletedItem = books[index];
      deletedItem.isActive = false;
      deletedItem.count = 0;
      deletedItem.total = 0;
      this.summary();
      this.setState({
         cartStore: cart,
         booksData: books
      });
   };
   addItem = id => {
      let cart = [...this.state.cartStore];
      const findItem = cart.find(item => item._id === id);
      const index = cart.indexOf(findItem);
      const item = cart[index];
      item.count = item.count + 1;
      item.total = item.count * item.price;
      this.summary();
      this.setState({
         cartStore: [...cart]
      });
   };
   subtractItem = id => {
      let cart = [...this.state.cartStore];
      const findItem = cart.find(item => item._id === id);
      const index = cart.indexOf(findItem);
      const item = cart[index];
      if (item.count <= 0) return;
      item.count = item.count - 1;
      item.total = item.count * item.price;
      this.summary();
      this.setState({
         cartStore: [...cart]
      });
   };
   summary = () => {
      const { cartStore } = this.state;
      let itemTotal = 0;
      cartStore.map(item => {
         const float = parseFloat(item.total);
         itemTotal += float;
         return itemTotal;
      });
      const sum = itemTotal.toFixed(2);
      this.setState({
         sum
      });
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
            console.log(res);
            localStorage.setItem("auth-token", res.token);
         });
      // if (step === 1) {
      //    if (nickName.trim().length > 2 && password.trim().length > 4) {
      //       this.setState({
      //          confirmed: true,
      //          modalActive: false
      //       });
      //    } else {
      //       alert("Fields 'Nickname' and 'Password' should be at least 2 and 4 characters");
      //       return;
      //    }
      // }
   };
   handleSubmitForm = e => {
      let info;
      e.preventDefault();
      const { nickName, lastName, firstName, email, password, phone, step } = this.state;
      const test = fetch("/user/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ firstName, lastName, email, nickName, password, phone })
      })
         .then(res => res.json())
         .then(res => {
            info = res;
            alert(info);
            if (info.status !== 400) {
               this.setState({
                  step: step + 1
               });
            }
         });
      // if (this.info.status !== 400) {
      //    this.setState({
      //       step: step + 1
      //    });
      // .then(res => {
      //    this.info = res;
      //    alert(this.info);
      // })
      // .catch(err => {
      //    this.info = err;
      //    alert(`Ups, we have some error ${this.info}`);
      // });
      console.log(test);
   };

   handleStepUp = () => {
      const { lastName, firstName, email, step } = this.state;
      if (step === 2) {
         const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
         if (lastName.trim().length > 2 && firstName.trim().length > 2 && validate.test(email)) {
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
   resetBasket = () => {
      this.setState({
         cartStore: []
      });
      this.setBook();
   };

   render() {
      const {
         addToBasket,
         deleteItem,
         subtractItem,
         addItem,
         handleForms,
         handleSubmitForm,
         handleStepUp,
         handleStepDown,
         showModal,
         resetBasket,
         handleLogIn
      } = this;
      const { step, password, email, lastName, firstName, nickName, dateBirth, modalActive, phone } = this.state;

      return (
         <BookContext.Provider
            value={{
               ...this.state,
               addToBasket,
               deleteItem,
               subtractItem,
               addItem,
               modalActive,
               step,
               password,
               firstName,
               lastName,
               email,
               nickName,
               showModal,
               handleForms,
               handleSubmitForm,
               handleStepUp,
               handleStepDown,
               handleLogIn,
               dateBirth,
               phone,
               resetBasket
            }}
         >
            {this.props.children}
         </BookContext.Provider>
      );
   }
}
const Context = BookContext.Consumer;
const StoreConsumer = BookContext; //Consumer
export { StoreProvider, StoreConsumer, Context };

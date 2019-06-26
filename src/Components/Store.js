import React, { Component } from "react";
import { books } from "../data";

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
      confirmed: false
   };
   componentDidMount() {
      this.setBook();
   }

   setBook = () => {
      let booksData = [];
      books.forEach(item => {
         const book = { ...item };
         booksData = [...booksData, book];
      });
      this.setState({
         booksData
      });
   };

   addToBasket = id => {
      const { booksData, cartStore } = this.state;
      let data = [...booksData];
      const book = booksData.find(item => item.id === id);
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
      cart = cart.filter(item => item.id !== id);
      const findItem = booksData.find(item => item.id === id);
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
   additionItem = id => {
      let cart = [...this.state.cartStore];
      const findItem = cart.find(item => item.id === id);
      const index = cart.indexOf(findItem);
      const item = cart[index];
      item.count = item.count + 1;
      item.total = item.count * item.price;
      this.summary();
      this.setState({
         cartStore: [...cart]
      });
   };
   substractionItem = id => {
      let cart = [...this.state.cartStore];
      const findItem = cart.find(item => item.id === id);
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
      cartStore.map(item => (itemTotal += item.total));
      const sum = parseFloat(itemTotal.toFixed(2));
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
   handleSubmitForm = e => {
      e.preventDefault();
      const { password, nickName, lastName, firstName, email, step } = this.state;
      if (step === 1) {
         if (nickName && password) {
            this.setState({
               confirmed: true,
               modalActive: false
            });
         } else {
            alert("Fields 'NickName and Password' are required");
            return;
         }
      } else if (step === 2) {
         const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
         if (lastName && firstName && validate.test(email)) {
            this.setState({
               confirmed: false,
               step: step + 1
            });
         } else {
            alert("Please, fill out all the required fields");
            return;
         }
      } else if (step === 3) {
         if (nickName) {
            this.setState({
               confirmed: true,
               step: 4
            });
         } else {
            alert("Field 'NickName'is required");
            return;
         }
      }
      console.log("Submitted");
   };
   handleStepUp = () => {
      const { step } = this.state;
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
      const { modalActive, step } = this.state;
      this.setState({
         modalActive: !modalActive,
         step: 1
      });
   };

   render() {
      const {
         addToBasket,
         deleteItem,
         substractionItem,
         additionItem,
         handleForms,
         handleSubmitForm,
         handleStepUp,
         handleStepDown,
         showModal
      } = this;
      const { step, password, email, lastName, firstName, nickName, dateBirth, modalActive, phone } = this.state;

      return (
         <BookContext.Provider
            value={{
               ...this.state,
               addToBasket,
               deleteItem,
               substractionItem,
               additionItem,
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
               dateBirth,
               phone
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

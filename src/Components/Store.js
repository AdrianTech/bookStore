import React, { Component } from "react";
import { books } from "../data";

const BookContext = React.createContext();

class StoreProvider extends Component {
   state = {
      booksData: [],
      cartStore: [],
      sum: 0,
      itemSum: 0
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
      let fixedTotal = item.total;
      item.count = item.count + 1;
      fixedTotal = item.count * item.price;
      let total = parseFloat(fixedTotal.toFixed(2));
      item.total = total;
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
      let fixedTotal = item.total;
      item.count = item.count - 1;
      fixedTotal = item.count * item.price;
      let total = parseFloat(fixedTotal.toFixed(2));
      item.total = total;
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
      console.log(this.state.sum);
   };

   render() {
      const { addToBasket, deleteItem } = this;
      console.log(this.state);

      return (
         <BookContext.Provider
            value={{
               ...this.state,
               addToBasket: addToBasket,
               deleteItem: deleteItem,
               substractionItem: this.substractionItem,
               additionItem: this.additionItem
            }}
         >
            {this.props.children}
         </BookContext.Provider>
      );
   }
}
const StoreConsumer = BookContext.Consumer;
export { StoreProvider, StoreConsumer };

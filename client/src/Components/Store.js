import React, { Component } from "react";

const BookContext = React.createContext();

class StoreProvider extends Component {
   state = {
      booksData: [],
      cartStore: [],
      sum: 0,
      itemSum: 0
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

   resetBasket = () => {
      this.setState({
         cartStore: []
      });
      this.getData();
   };

   render() {
      const { addToBasket, deleteItem, subtractItem, addItem, resetBasket } = this;

      return (
         <BookContext.Provider
            value={{
               ...this.state,
               addToBasket,
               deleteItem,
               subtractItem,
               addItem,
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

import React, { Component } from "react";
import Book from "./Book";
import { StoreConsumer, Context } from "./Store";
import Footer from "./Footer";

class BookList extends Component {
   render() {
      return (
         <>
            <span className="welcome">Welcome to our Old Town book store</span>
            <div className="showBooks">
               <Context>{data => data.booksData.map(elem => <Book key={elem.id} elem={elem} />)}</Context>
            </div>
            <Footer />
         </>
      );
   }
}
export default BookList;

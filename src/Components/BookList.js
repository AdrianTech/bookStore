import React, { Component } from "react";
import Book from "./Book";
import { StoreConsumer } from "./Store";

class BookList extends Component {
   render() {
      return (
         <>
            <span className="welcome">Welcome to our Old Town book store</span>
            <div className="showBooks">
               <StoreConsumer>{data => data.booksData.map(elem => <Book key={elem.id} elem={elem} />)}</StoreConsumer>
            </div>
         </>
      );
   }
}
export default BookList;

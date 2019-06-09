import React, { Component } from "react";
import Book from "./Book";
import { StoreConsumer } from "./Store";

class BookList extends Component {
   state = {};

   render() {
      const {} = this.state;

      return (
         <div className="showBooks">
            <StoreConsumer>{data => data.booksData.map(elem => <Book key={elem.id} elem={elem} />)}</StoreConsumer>
         </div>
      );
   }
}
export default BookList;

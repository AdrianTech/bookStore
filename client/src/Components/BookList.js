import React, { Component } from "react";
import Book from "./Book";
import { Context } from "./Store";
import Footer from "./Footer";

class BookList extends Component {
  render() {
    return (
      <>
        <section className="showBooks">
          <Context>
            {data =>
              data.booksData.map(elem => <Book key={elem._id} elem={elem} />)
            }
          </Context>
        </section>
        <Footer />
      </>
    );
  }
}
export default BookList;

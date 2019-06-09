import React, { Component } from "react";
//import { books } from "../data";
import { StoreConsumer } from "./Store";
import { Link } from "react-router-dom";
import "../styles/_chosenBook.scss";

class ViewBook extends Component {
   state = {};

   render() {
      return (
         <>
            <StoreConsumer>
               {data =>
                  data.booksData
                     .filter(item => item.id === parseInt(this.props.match.params.id))
                     .map(item => (
                        <div key={item.id} className="bookDetails">
                           <div className="header">
                              <h4>{item.author}</h4>
                              <h5>{item.title}</h5>
                              <h5>Only: {item.price} &euro;</h5>
                           </div>
                           <div className="bookCover">
                              <img src={item.cover} alt="Cover" />
                           </div>
                           <p>{item.desc}</p>
                           <div className="spanItems">
                              <span>Pages: {item.pages}</span>
                              <span>Publishing house: {item.print}</span>
                              <span>Publishing date: {item.date}</span>
                           </div>
                           <div className="buttons">
                              {!item.isActive ? (
                                 <button onClick={() => data.addToBasket(item.id)} className="secondary-btn btn-basket">
                                    <i className="fas fa-book-medical"> Add to Basket</i>
                                 </button>
                              ) : (
                                 <Link to="/yourCart">
                                    <button className="secondary-btn btn-basket">
                                       <i className="fas fa-check-circle"> Added. Go to Basket</i>
                                    </button>
                                 </Link>
                              )}
                              <Link to="/">
                                 <button className="secondary-btn">
                                    <i className="fas fa-undo-alt"> Back to Books</i>
                                 </button>
                              </Link>
                           </div>
                        </div>
                     ))
               }
            </StoreConsumer>
         </>
      );
   }
}
export default ViewBook;

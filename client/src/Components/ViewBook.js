import React, { Component } from "react";
import { Context } from "./Store";
import { Link } from "react-router-dom";
import "../styles/_chosenBook.scss";

class ViewBook extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Context>
          {data =>
            data.booksData
              .filter(item => item._id === this.props.match.params.id)
              .map(item => (
                <div key={item._id} className="bookDetails">
                  <div className="header">
                    <h4>{item.author}</h4>
                    <h5>{item.title}</h5>
                  </div>
                  <div className="bookCover">
                    <img src={`/${item.cover}`} alt="cover" />
                  </div>
                  <p>{item.desc}</p>
                  <div className="spanItems">
                    <span className="price">Only: {item.price} &euro;</span>
                    <span>Pages: {item.pages}</span>
                    <span>Publishing house: {item.print}</span>
                    <span>Publishing date: {item.date}</span>
                  </div>
                  <div className="buttons">
                    {!item.isActive ? (
                      <button
                        onClick={() => data.addToBasket(item._id)}
                        className="secondary-btn btn-basket"
                      >
                        <i className="fas fa-book-medical"> Add to Basket</i>
                      </button>
                    ) : (
                      <Link to="/yourCart">
                        <button className="secondary-btn btn-basket">
                          <i className="fas fa-check-circle">
                            {" "}
                            Added. Go to Basket
                          </i>
                        </button>
                      </Link>
                    )}
                    <Link to="/list">
                      <button className="secondary-btn">
                        <i className="fas fa-undo-alt"> Back to Books</i>
                      </button>
                    </Link>
                  </div>
                </div>
              ))
          }
        </Context>
      </>
    );
  }
}
export default ViewBook;

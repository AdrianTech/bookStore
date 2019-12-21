import React from "react";
import { Link } from "react-router-dom";

const AddedBooks = ({ data, item }) => {
  const { subtractItem, addItem, deleteItem } = data;
  const { _id, price, cover, title, count, total } = item;
  return (
    <div className="addedToBasketBook">
      <div className="title">
        <img src={cover} alt="cover" />
        <h6>{title}</h6>
      </div>
      <h5>Cost: {price} &euro;</h5>
      <div className="countItems">
        <div>
          <button onClick={() => addItem(_id)}>+</button>
          <span>{count}</span>
          <button onClick={() => subtractItem(_id)}>-</button>
        </div>
      </div>
      <span className="total">
        Total:{" "}
        {total.toLocaleString("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
        &euro;
      </span>
      <div className="deleteBook">
        <i
          style={{ marginBottom: "10px" }}
          className="fas fa-times-circle"
          onClick={() => deleteItem(_id)}
        >
          {" "}
          <p>Delete Book</p>
        </i>
        <Link style={{ marginLeft: "20px" }} to="/list">
          Return to books
        </Link>
      </div>
    </div>
  );
};

export default AddedBooks;

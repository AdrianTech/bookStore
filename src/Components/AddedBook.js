import React from "react";

const AddedBooks = ({ data, item }) => {
   const { substractionItem, additionItem, deleteItem } = data;
   const { id, price, cover, title, count, total } = item;
   console.log(data);
   return (
      <div className="addedToBasketBook">
         <div className="title">
            <img src={cover} alt="cover" />
            <h6>{title}</h6>
         </div>
         <h5>Cost: {price} &euro;</h5>
         <div className="countItems">
            <button onClick={() => additionItem(id)}>+</button>
            <span>{count}</span>
            <button onClick={() => substractionItem(id)}>-</button>
         </div>
         <span className="total">Sum: {total} &euro;</span>
         <i className="fas fa-times-circle" onClick={() => deleteItem(id)} />
      </div>
   );
};

export default AddedBooks;

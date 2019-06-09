import React, { Component } from "react";
import { StoreConsumer } from "./Store";
import AddedBook from "./AddedBook";
import Summary from "./Summary";
import "../styles/_globalVar.scss";

class BookCart extends Component {
   state = {};

   render() {
      return (
         <section className="cartContent">
            <StoreConsumer>
               {data => (
                  <>
                     <h2>All Your Added Books</h2>
                     {data.cartStore.map(item => (
                        <AddedBook key={item.id} data={data} item={item} />
                     ))}
                     <Summary data={data} />
                  </>
               )
               // data.cartStore.map(item => (
               //    <div className="bookCart" key={item.id}>
               //       <h4>{item.title}</h4> <h4>{item.author}</h4>
               //       <button onClick={() => data.deleteItem(item.id)}>
               //          <i className="fas fa-times-circle" />
               //       </button>
               //    </div>
               //))
               }
            </StoreConsumer>
         </section>
      );
   }
}
export default BookCart;

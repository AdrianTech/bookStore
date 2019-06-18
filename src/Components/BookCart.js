import React, { Component } from "react";
import { StoreConsumer } from "./Store";
import AddedBook from "./AddedBook";
import Summary from "./Summary";
import "../styles/_globalVar.scss";
import BankList from "./BankList";

class BookCart extends Component {
   state = {
      bankList: false
   };

   handleState = () => {
      this.setState({
         bankList: !this.state.bankList
      });
   };

   render() {
      return (
         <section className="cartContent">
            <StoreConsumer>
               {data => (
                  <>
                     {data.cartStore.length > 0 ? (
                        <>
                           <h2>All Your Added Books</h2>
                           {data.cartStore.map(item => (
                              <AddedBook key={item.id} data={data} item={item} />
                           ))}
                           <Summary data={data} />

                           <button className="secondary-btn bank-btn" onClick={this.handleState}>
                              I Buy It!
                           </button>
                           {this.state.bankList ? <BankList sum={data.sum} click={this.handleState} /> : null}
                        </>
                     ) : (
                        <h2>Your Basket Is Empty </h2>
                     )}
                  </>
               )}
            </StoreConsumer>
         </section>
      );
   }
}
export default BookCart;

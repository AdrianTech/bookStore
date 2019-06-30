import React, { Component } from "react";
import { StoreConsumer, Context } from "./Store";
import AddedBook from "./AddedBook";
import Summary from "./Summary";
import "../styles/_globalVar.scss";
import BankList from "./BankList";
import OpenModalLogin from "./forms/OpenModalLogin";

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
            <Context>
               {data => (
                  <>
                     <OpenModalLogin />
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
                           {this.state.bankList && <BankList click={this.handleState} {...data} />}
                        </>
                     ) : (
                        <h2>Your Basket Is Empty </h2>
                     )}
                  </>
               )}
            </Context>
         </section>
      );
   }
}
export default BookCart;

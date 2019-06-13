import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StoreConsumer } from "./Store";

class Navigation extends Component {
   render() {
      return (
         <nav>
            <div className="baner">
               <h1>
                  <Link to="/">OldTown</Link>
               </h1>
            </div>
            <StoreConsumer>
               {data => (
                  <div className="cart">
                     <Link to="/yourCart">
                        <i className="fas fa-shopping-cart" />
                        {data.cartStore.length > 0 ? (
                           <div className="items">
                              <span>{data.cartStore.length}</span>
                           </div>
                        ) : null}
                     </Link>
                     <p>Book Basket</p>
                  </div>
               )}
            </StoreConsumer>
         </nav>
      );
   }
}
export default Navigation;

import React, { Component } from "react";
import { Context } from "./Store";
import { Link } from "react-router-dom";
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
        <Context>
          {data => (
            <>
              {data.cartStore.length > 0 ? (
                <>
                  <h2>All Your Added Books</h2>
                  {data.cartStore.map(item => (
                    <AddedBook key={item._id} data={data} item={item} />
                  ))}
                  <Summary data={data} />

                  <button className="secondary-btn bank-btn" onClick={this.handleState}>
                    I'll Buy It!
                  </button>
                  {this.state.bankList && <BankList click={this.handleState} {...data} />}
                </>
              ) : (
                <>
                  <h2>Your cart is empty </h2>
                  <Link
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontSize: "20px"
                    }}
                    to="/list"
                  >
                    Return to books
                  </Link>
                </>
              )}
            </>
          )}
        </Context>
      </section>
    );
  }
}
export default BookCart;

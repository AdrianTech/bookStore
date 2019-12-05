import React, { Component } from "react";

const BookContext = React.createContext();

class StoreProvider extends Component {
  state = {
    booksData: [],
    cartStore: [],
    sum: 0,
    itemSum: 0,
    author: "",
    title: "",
    desc: "",
    pages: "",
    print: "",
    date: "",
    cover: null,
    price: "",
    editBook: null,
    bookID: "",
    displayInfo: false,
    info: ""
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("/products")
      .then(response => response.json())
      .then(data => {
        this.setState({ booksData: data });
      })
      .catch(err => err);
  };

  addToBasket = id => {
    const { booksData, cartStore } = this.state;
    let data = [...booksData];
    const book = booksData.find(item => item._id === id);
    const index = data.indexOf(book);
    const item = data[index];
    item.isActive = true;
    item.count = 1;
    const price = item.price;
    item.total = price;
    this.setState(
      {
        booksData: data,
        cartStore: [...cartStore, item]
      },
      () => this.summary()
    );
  };
  deleteItem = id => {
    const { cartStore, booksData } = this.state;
    let cart = [...cartStore];
    let books = [...booksData];
    cart = cart.filter(item => item._id !== id);
    const findItem = booksData.find(item => item._id === id);
    const index = books.indexOf(findItem);
    let deletedItem = books[index];
    deletedItem.isActive = false;
    deletedItem.count = 0;
    deletedItem.total = 0;
    this.summary();
    this.setState({
      cartStore: cart,
      booksData: books
    });
  };
  addItem = id => {
    let cart = [...this.state.cartStore];
    const findItem = cart.find(item => item._id === id);
    const index = cart.indexOf(findItem);
    const item = cart[index];
    item.count = item.count + 1;
    item.total = item.count * item.price;
    this.summary();
    this.setState({
      cartStore: [...cart]
    });
  };
  subtractItem = id => {
    let cart = [...this.state.cartStore];
    const findItem = cart.find(item => item._id === id);
    const index = cart.indexOf(findItem);
    const item = cart[index];
    if (item.count <= 0) return;
    item.count = item.count - 1;
    item.total = item.count * item.price;
    this.summary();
    this.setState({
      cartStore: [...cart]
    });
  };
  summary = () => {
    const { cartStore } = this.state;
    let itemTotal = 0;
    cartStore.map(item => {
      const float = parseFloat(item.total);
      itemTotal += float;
      return itemTotal;
    });
    const sum = itemTotal.toFixed(2);
    this.setState({
      sum
    });
  };

  resetBasket = () => {
    this.setState({
      cartStore: []
    });
    this.getData();
  };
  handleCmsValue = e => {
    const name = e.target.name;
    const value = e.target.value;
    const file = e.target.files;
    if (file) {
      this.setState({
        [name]: file[0]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };
  handleCmsSubmit = e => {
    e.preventDefault();
    const {
      price,
      desc,
      author,
      print,
      date,
      title,
      cover,
      pages
    } = this.state;
    const data = {
      author,
      title,
      price,
      desc,
      date,
      pages,
      print,
      total: "0",
      count: "0",
      isActive: false,
      cover
    };
    let formData = new FormData();
    for (let name in data) {
      formData.append(name, data[name]);
    }
    const userAuth = JSON.parse(localStorage.getItem("auth-token"));
    fetch("/addNewProduct", {
      method: "POST",
      headers: {
        "auth-token": userAuth.token
      },
      body: formData
    })
      .then(res => {
        if (res.ok) {
          this.setState({
            author: "",
            title: "",
            desc: "",
            pages: "",
            print: "",
            date: "",
            cover: null,
            price: "",
            dataState: "ok"
          });
          this.getData();
        }
        return res.json();
      })
      .then(res => {
        this.showInfo(res);
      });
  };
  deleteBookFromDB = (id, cover) => {
    const confirmation = window.confirm("Delete this book?");
    if (!confirmation) return;
    const userAuth = JSON.parse(localStorage.getItem("auth-token"));
    fetch("/deleteProduct", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": userAuth.token
      },
      body: JSON.stringify({ id, cover })
    })
      .then(res => {
        if (res.ok) {
          this.getData();
        }
        return res.json();
      })
      .then(res => {
        this.showInfo(res);
      });
  };
  getThisBookFromDB = id => {
    this.setState({
      bookID: id
    });
  };
  editBookInDB = e => {
    e.preventDefault();
    const {
      price,
      desc,
      author,
      print,
      date,
      title,
      cover,
      pages,
      bookID
    } = this.state;
    const data = {
      id: bookID,
      author,
      title,
      price,
      desc,
      date,
      pages,
      print,
      cover
    };
    const userAuth = JSON.parse(localStorage.getItem("auth-token"));
    let formData = new FormData();
    for (let name in data) {
      formData.append(name, data[name]);
    }
    fetch("/editProduct", {
      method: "PUT",
      headers: {
        "auth-token": userAuth.token
      },
      body: formData
    })
      .then(res => {
        if (res.ok) {
          this.setState({
            author: "",
            title: "",
            desc: "",
            pages: "",
            print: "",
            date: "",
            cover: null,
            price: "",
            dataState: "ok"
          });
          this.getData();
        }
        return res.json();
      })
      .then(res => {
        this.showInfo(res);
      });
  };
  showInfo = res => {
    this.setState({
      displayInfo: true,
      info: res
    });
    setTimeout(() => {
      this.setState({
        displayInfo: false
      });
    }, 4000);
  };

  render() {
    const {
      addToBasket,
      deleteItem,
      subtractItem,
      addItem,
      resetBasket,
      handleCmsSubmit,
      handleCmsValue,
      deleteBookFromDB,
      getThisBookFromDB,
      editBookInDB,
      openModalFunc,
      showInfo
    } = this;

    return (
      <BookContext.Provider
        value={{
          ...this.state,
          addToBasket,
          deleteItem,
          subtractItem,
          addItem,
          resetBasket,
          handleCmsSubmit,
          handleCmsValue,
          deleteBookFromDB,
          getThisBookFromDB,
          editBookInDB,
          openModalFunc,
          showInfo
        }}
      >
        {this.props.children}
      </BookContext.Provider>
    );
  }
}
const Context = BookContext.Consumer;
const StoreConsumer = BookContext;
export { StoreProvider, StoreConsumer, Context };

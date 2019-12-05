import React from "react";
import { StoreConsumer } from "./Store";
import { Link } from "react-router-dom";
const AddNewProductToADB = ({ value, showAddProduct }) => {
  const {
    title,
    author,
    desc,
    pages,
    print,
    price,
    date,
    handleCmsSubmit,
    handleCmsValue
  } = React.useContext(StoreConsumer);
  return (
    <>
      <button
        onClick={() => showAddProduct(true)}
        className="secondary-btn btn-add-product"
      >
        Add new product to a database
      </button>
      {value && (
        <div className="show-modal">
          <div>
            <form onSubmit={handleCmsSubmit} className="cms-form">
              <Link to="/list">Watch all books</Link>
              <div className="close" onClick={() => showAddProduct(false)}>
                <i className="far fa-times-circle"></i>
              </div>
              <label>Author</label>
              <input
                type="text"
                value={author}
                name="author"
                onChange={handleCmsValue}
              />
              <label>Title</label>
              <input
                type="text"
                value={title}
                name="title"
                onChange={handleCmsValue}
              />
              <label>Cover</label>
              <input type="file" name="cover" onChange={handleCmsValue} />
              <label>Pages</label>
              <input
                type="text"
                value={pages}
                name="pages"
                onChange={handleCmsValue}
              />
              <label>Description</label>
              <textarea
                name="desc"
                value={desc}
                onChange={handleCmsValue}
              ></textarea>
              <label>Print</label>
              <input
                type="text"
                value={print}
                name="print"
                onChange={handleCmsValue}
              />
              <label>Price</label>
              <input
                type="text"
                value={price}
                name="price"
                onChange={handleCmsValue}
              />
              <label>Publishing date</label>
              <input
                type="text"
                value={date}
                name="date"
                onChange={handleCmsValue}
              />
              <button className="cms-button">Send Data</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AddNewProductToADB;

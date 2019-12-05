import React from "react";
import { StoreConsumer } from "./Store";
import EditModal from "./editModal";
import AddNewProductToADB from "./AddNewProductToADB";

const ProductManagement = ({
  showUpdateProduct,
  showAddProduct,
  addProduct,
  updateProduct
}) => {
  const { booksData, deleteBookFromDB, getThisBookFromDB } = React.useContext(
    StoreConsumer
  );
  const displayBooks = booksData.map(item => (
    <div key={item._id} className="bookFromDB">
      <h4>Author: {item.author}</h4> <h4> Title: {item.title}</h4>
      <div className="buttons-cms-event">
        <button
          onClick={() => {
            showUpdateProduct(true);
            getThisBookFromDB(item._id);
          }}
        >
          Update
        </button>
        <button onClick={() => deleteBookFromDB(item._id, item.cover)}>
          Delete
        </button>
      </div>
    </div>
  ));
  return (
    <>
      <EditModal showUpdateProduct={showUpdateProduct} value={updateProduct} />
      {!updateProduct && (
        <div className="productManagement">
          <h3>There are {booksData.length} book(s) in the database</h3>
          {displayBooks}
        </div>
      )}
      <AddNewProductToADB value={addProduct} showAddProduct={showAddProduct} />
    </>
  );
};
export default ProductManagement;

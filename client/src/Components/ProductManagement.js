import React from "react";
import { StoreConsumer } from "./Store";
import EditModal from "./editModal";
import AddNewProductToADB from "./AddNewProductToADB";

const ProductManagement = () => {
   const { booksData, deleteBookFromDB, getThisBookFromDB } = React.useContext(StoreConsumer);
   const [editModal, showEditModal] = React.useState(false);
   const displayBooks = booksData.map(item => (
      <div className="productManagement" key={item._id}>
         <div className="bookFromDB">
            Author: {item.author}, Title: {item.title}
            <div className="buttons-cms-event">
               <button
                  onClick={() => {
                     showEditModal(!editModal);
                     getThisBookFromDB(item._id);
                  }}
               >
                  Edit
               </button>
               <button onClick={() => deleteBookFromDB(item._id)}>Delete</button>
            </div>
         </div>
      </div>
   ));
   return (
      <>
         <h4>You added {booksData.length} book(s) to a database</h4>
         {editModal && <EditModal click={showEditModal} value={editModal} />}
         {!editModal && displayBooks}
         <AddNewProductToADB />
      </>
   );
};
export default ProductManagement;

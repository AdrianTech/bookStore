import React from "react";
import { StoreConsumer } from "./Store";
import { Link } from "react-router-dom";
const EditModal = ({ showUpdateProduct, value }) => {
   const { title, author, desc, pages, print, price, date, handleCmsValue, booksData, bookID, editBookInDB } = React.useContext(
      StoreConsumer
   );
   const data = booksData
      .filter(item => item._id === bookID)
      .map(item => (
         <div className="show-modal" key={item._id}>
            <div className="editBook">
               <form onSubmit={editBookInDB} className="cms-form">
                  <Link to="/list">Watch all books</Link>
                  <div className="close" onClick={() => showUpdateProduct(false)}>
                     <i className="far fa-times-circle"></i>
                  </div>
                  <label>Author</label>
                  <input type="text" placeholder={item.author} value={author} name="author" onChange={handleCmsValue} />
                  <label>Title</label>
                  <input type="text" placeholder={item.title} value={title} name="title" onChange={handleCmsValue} />
                  <label>Cover</label>
                  <input type="file" name="cover" onChange={handleCmsValue} />
                  <p>{item.cover}</p>
                  <label>Pages</label>
                  <input type="text" placeholder={item.pages} value={pages} name="pages" onChange={handleCmsValue} />
                  <label>Description</label>
                  <textarea name="desc" placeholder={item.desc} value={desc} onChange={handleCmsValue}></textarea>
                  <label>Print</label>
                  <input type="text" placeholder={item.print} value={print} name="print" onChange={handleCmsValue} />
                  <label>Price</label>
                  <input type="text" placeholder={item.price} value={price} name="price" onChange={handleCmsValue} />
                  <label>Publishing date</label>
                  <input type="text" placeholder={item.date} value={date} name="date" onChange={handleCmsValue} />
                  <button className="cms-button">Edit Data</button>
               </form>
            </div>
         </div>
      ));
   return <>{value && data}</>;
};
export default EditModal;

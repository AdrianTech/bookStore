import React from "react";
import { StoreConsumer } from "./Store";
const EditModal = ({ click }) => {
   const { title, author, desc, pages, print, price, date, handleCmsValue, booksData, bookID, editBookInDB } = React.useContext(
      StoreConsumer
   );
   const data = booksData
      .filter(item => item._id === bookID)
      .map(item => (
         <div className="editBook" key={item._id}>
            <button onClick={() => click(false)} className="secondary-btn btn-add-product">
               Hide update module
            </button>
            <form onSubmit={editBookInDB} className="cms-form">
               <label>Author</label>
               <input type="text" value={author} name="author" onChange={handleCmsValue} />
               <p>{item.author}</p>
               <label>Title</label>
               <input type="text" value={title} name="title" onChange={handleCmsValue} />
               <p>{item.title}</p>
               <label>Cover</label>
               <input type="file" name="cover" onChange={handleCmsValue} />
               <p>{item.cover}</p>
               <label>Pages</label>
               <input type="text" value={pages} name="pages" onChange={handleCmsValue} />
               <p>{item.pages}</p>
               <label>Description</label>
               <textarea name="desc" value={desc} onChange={handleCmsValue}></textarea>
               <p>{item.desc}</p>
               <label>Print</label>
               <input type="text" value={print} name="print" onChange={handleCmsValue} />
               <p>{item.print}</p>
               <label>Price</label>
               <input type="text" value={price} name="price" onChange={handleCmsValue} />
               <p>{item.price}</p>
               <label>Publishing date</label>
               <input type="text" value={date} name="date" onChange={handleCmsValue} />
               <p>{item.date}</p>
               <button className="cms-button">Edit Data</button>
            </form>
         </div>
      ));
   return (
      <>
         <h3>{data}</h3>
      </>
   );
};
export default EditModal;

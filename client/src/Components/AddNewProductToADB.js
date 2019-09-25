import React from "react";
import { StoreConsumer } from "./Store";
const AddNewProductToADB = () => {
   const { title, author, desc, pages, print, price, date, handleCmsSubmit, handleCmsValue } = React.useContext(StoreConsumer);
   const [addProduct, showAddProduct] = React.useState(false);
   return (
      <>
         <button onClick={() => showAddProduct(!addProduct)} className="secondary-btn btn-add-product">
            Add new product to a database
         </button>
         {addProduct && (
            <form onSubmit={handleCmsSubmit} className="cms-form">
               <label>Author</label>
               <input type="text" value={author} name="author" onChange={handleCmsValue} />
               <label>Title</label>
               <input type="text" value={title} name="title" onChange={handleCmsValue} />
               <label>Cover</label>
               <input type="file" name="cover" onChange={handleCmsValue} />
               <label>Pages</label>
               <input type="text" value={pages} name="pages" onChange={handleCmsValue} />
               <label>Description</label>
               <textarea name="desc" value={desc} onChange={handleCmsValue}></textarea>
               <label>Print</label>
               <input type="text" value={print} name="print" onChange={handleCmsValue} />
               <label>Price</label>
               <input type="text" value={price} name="price" onChange={handleCmsValue} />
               <label>Publishing date</label>
               <input type="text" value={date} name="date" onChange={handleCmsValue} />
               <button className="cms-button">Send Data</button>
            </form>
         )}
      </>
   );
};
export default AddNewProductToADB;

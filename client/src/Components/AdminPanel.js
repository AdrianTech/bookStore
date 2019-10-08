import React from "react";
import ProductManagement from "./ProductManagement";
const AdminPanel = ({ updateProduct, showUpdateProduct, showAddProduct, addProduct }) => {
   return (
      <div className="adminPanel">
         <ProductManagement
            addProduct={addProduct}
            updateProduct={updateProduct}
            showUpdateProduct={showUpdateProduct}
            showAddProduct={showAddProduct}
         />
      </div>
   );
};
export default AdminPanel;

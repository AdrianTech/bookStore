import React from "react";
import ProductManagement from "./ProductManagement";
const AdminPanel = ({
  updateProduct,
  showUpdateProduct,
  showAddProduct,
  addProduct
}) => {
  return (
    <section className="adminPanel">
      <ProductManagement
        addProduct={addProduct}
        updateProduct={updateProduct}
        showUpdateProduct={showUpdateProduct}
        showAddProduct={showAddProduct}
      />
    </section>
  );
};
export default AdminPanel;

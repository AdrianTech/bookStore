import React, { useContext, useState } from "react";
import AdminPanel from "./AdminPanel";
import { AuthContext } from "./context/Auth";
import CurrentUser from "./CurrentUser";
import UpdateUser from "./UpdateUser";
import { Redirect } from "react-router-dom";
const User = () => {
  const { user, isAuthorized } = useContext(AuthContext);
  const [showPanel, displayAdminPanel] = useState(false);
  const [update, updateUserData] = useState(false);
  const [updateProduct, showUpdateProduct] = React.useState(false);
  const [addProduct, showAddProduct] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  React.useEffect(() => {
    const handleClick = e => {
      const target = e.target;
      if (target.closest(".cms-form")) return;
      if (target.closest(".show-modal")) {
        updateUserData(false);
        showUpdateProduct(false);
        showAddProduct(false);
        return;
      }
    };
    let timeout;
    document.addEventListener("click", handleClick);
    if (!isAuthorized) {
      timeout = setTimeout(() => {
        setLogout(true);
      }, 1200);
    }

    return () => {
      document.addEventListener("click", handleClick);
      clearTimeout(timeout);
    };
  });
  if (logout) {
    return <Redirect to="/yourCart" />;
  }
  return (
    <>
      {user && (
        <section className="userProfil">
          <button className="user-btn" onClick={() => updateUserData(true)}>
            <i className="fas fa-user-edit"></i> Update
          </button>
          <div className="user-data">
            {!update ? <CurrentUser /> : <UpdateUser click={updateUserData} />}
          </div>
          {user.isAdmin && (
            <button onClick={() => displayAdminPanel(!showPanel)} className="main-btn btn-admin">
              Show Admin Panel
            </button>
          )}
          {showPanel && (
            <AdminPanel
              addProduct={addProduct}
              updateProduct={updateProduct}
              showUpdateProduct={showUpdateProduct}
              showAddProduct={showAddProduct}
            />
          )}
        </section>
      )}
    </>
  );
};
export default User;

import React, { useContext, useState } from "react";
import AdminPanel from "./AdminPanel";
import { AuthContext } from "./context/Auth";
import CurrentUser from "./CurrentUser";
import UpdateUser from "./UpdateUser";
import { Link } from "react-router-dom";
const User = () => {
  const { user } = useContext(AuthContext);
  const [showPanel, displayAdminPanel] = useState(false);
  const [update, updateUserData] = useState(false);
  const [updateProduct, showUpdateProduct] = React.useState(false);
  const [addProduct, showAddProduct] = React.useState(false);
  const [logoutMessage, setLogout] = React.useState(false);
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
    document.addEventListener("click", handleClick);
    let timeout;
    if (!user) {
      timeout = setTimeout(() => {
        setLogout(true);
      }, 1000);
    }

    return () => {
      document.addEventListener("click", handleClick);
      clearTimeout(timeout);
    };
  });
  return (
    <>
      {user ? (
        <section className="userProfil">
          <button className="user-btn" onClick={() => updateUserData(true)}>
            <i className="fas fa-user-edit"></i> Update
          </button>
          <div className="user-data">
            {!update ? <CurrentUser /> : <UpdateUser click={updateUserData} />}
          </div>
          {user.isAdmin && (
            <button
              onClick={() => displayAdminPanel(!showPanel)}
              className="main-btn btn-admin"
            >
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
      ) : (
        <>
          {logoutMessage && (
            <h2>
              Looks like you are not logged in!
              <br />
              <Link className="logoutInfo" to="/yourCart">
                Back To Basket
              </Link>
            </h2>
          )}
        </>
      )}
    </>
  );
};
export default User;

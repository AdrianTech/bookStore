import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/bookStore.jpg";
import "../styles/main.scss";
const EnterPage = () => {
   const bgc = {
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroudnPosition: "top",
      backgroundRepeat: "no-repeat"
   };
   return (
      <div style={bgc} className="enterPage">
         <div className="nav-page">
            <h1>Welcome to Old Town</h1>
            <Link to="/list">
               <button className="welcome-btn">Let's start</button>
            </Link>
         </div>
      </div>
   );
};
export default EnterPage;

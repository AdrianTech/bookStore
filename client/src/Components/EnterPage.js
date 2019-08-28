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
            <h1>Welcome to</h1>
            <h1>old town</h1>
            <Link to="/list">
               <button className="welcome-btn">Start read</button>
            </Link>
         </div>
      </div>
   );
};
export default EnterPage;

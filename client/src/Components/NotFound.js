import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
   <div className="notFound">
      <h2>Page Not Found</h2>
      <Link to="/">Return to home page</Link>
   </div>
);

export default NotFound;

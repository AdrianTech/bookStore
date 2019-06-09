import React from "react";

const Summary = ({ data }) => {
   const { sum, sumItem } = data;
   return (
      <div className="summary">
         <h3>
            Summary: <span>{sum}</span> &euro;
         </h3>
      </div>
   );
};

export default Summary;

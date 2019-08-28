import React from "react";

const Summary = ({ data }) => {
   const { sum } = data;
   return (
      <div className="summary">
         <h3>
            To pay:{" "}
            <span>
               {sum.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
               })}
            </span>{" "}
            &euro;
         </h3>
      </div>
   );
};

export default Summary;

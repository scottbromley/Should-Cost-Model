import React from "react";
import "./LoadingSpinner.css";
import { GiRaddish } from "react-icons/gi";

function LoadingSpinner() {
  return (
    <div className="loading__spinner__outer">
      <GiRaddish size={30} className="loading__spinner__icon" />
      <div className="loading__spinner__shape__inner"></div>
      <div className="loading__spinner__shape__middle"></div>
      <div className="loading__spinner__shape__outer"></div>
    </div>
  );
}

export default LoadingSpinner;

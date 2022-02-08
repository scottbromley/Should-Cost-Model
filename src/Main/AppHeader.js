import React from "react";
import "./AppHeader.css";
import { HiOutlineInformationCircle } from "react-icons/hi";

function AppHeader({handleToggleAppInfoPane}) {

   
  return (
    <div className="app__header__outer">
      <button onClick={handleToggleAppInfoPane} className="app__header__information__button">
        <HiOutlineInformationCircle style={{width: "20px", height: "20px", marginRight: "5px"}} />
        Information about this React App.
      </button>
    </div>
  );
}

export default AppHeader;

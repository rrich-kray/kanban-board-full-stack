import React, { useState, useEffect } from "react";
import "./Nav.css";

const Nav = ({ isModalVisible, changeModalVisibility }) => {
  return (
    <div className="nav">
      <button
        className="add-task-btn"
        onClick={() => changeModalVisibility(!isModalVisible)}
      >
        + Create Task
      </button>
    </div>
  );
};

export default Nav;

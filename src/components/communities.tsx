import React from "react";

function Units() {
  return (
    <div className="todo">
      <div className="head">
        <h3>Units</h3>
        <i className="bx bx-plus"></i>
        <i className="bx bx-filter"></i>
      </div>
      <ul className="todo-list">
        <li className="hover:cursor-pointer flex items-center justify-center">
          <p>ECE 121</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        <li className="hover:cursor-pointer">
          {/* <li className="completed"> */}
          <p>PHYC 122</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        {/* <li className="not-completed"> */}
        <li className="hover:cursor-pointer">
          <p>STA 121</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        {/* <li className="completed"> */}
        <li className="hover:cursor-pointer">
          <p>MATH 111</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        {/* <li className="not-completed"> */}
        <li className="hover:cursor-pointer">
          <p>BIO 255</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
      </ul>
    </div>
  );
}

export default Units;

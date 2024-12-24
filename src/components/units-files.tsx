import React from "react";

function UnitsFiles() {
  return (
    <div className="todo">
      <div className="head">
        <h3>ECE121</h3>
        <i className="bx bx-plus"></i>
        <i className="bx bx-filter"></i>
      </div>
      <ul className="todo-list">
        <li className="hover:cursor-pointer flex items-center justify-center">
          <p>File 1</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        <li className="hover:cursor-pointer">
          {/* <li className="completed"> */}
          <p>File 2</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        {/* <li className="not-completed"> */}
        <li className="hover:cursor-pointer">
          <p>File 3</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        {/* <li className="completed"> */}
        <li className="hover:cursor-pointer">
          <p>File 4</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
        {/* <li className="not-completed"> */}
        <li className="hover:cursor-pointer">
          <p>File 5</p>
          <i className="bx bx-dots-vertical-rounded"></i>
        </li>
      </ul>
    </div>
  );
}

export default UnitsFiles;

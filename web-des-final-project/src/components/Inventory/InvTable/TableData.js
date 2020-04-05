import React from "react";

const tableData = (props) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{props.serialNo}</td>
      <td>{props.modelNo}</td>
      <td>{props.text}</td>
    </tr>
  );
};

export default tableData;

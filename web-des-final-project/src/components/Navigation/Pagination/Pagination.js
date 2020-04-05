import React from "react";
import Pagination from "react-bootstrap/Pagination";

const pagination = (props) => {
  const pageNumbers = [];
  for (var i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i == props.activeItem}
        onClick={props.clicked}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination>{pageNumbers}</Pagination>;
};

export default pagination;

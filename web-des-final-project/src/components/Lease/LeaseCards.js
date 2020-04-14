import React from "react";
import Card from "react-bootstrap/Card";

const leaseCards = (props) => {
  return (
    <Card className="lease-card">
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
      {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
    </Card>
  );
};

export default leaseCards;

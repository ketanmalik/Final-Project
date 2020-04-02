import React from "react";
import Card from "react-bootstrap/Card";
import "./Cards.css";

export const cards = props => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <Card>
        <Card.Body>
          <Card.Title>{props.heading}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default cards;

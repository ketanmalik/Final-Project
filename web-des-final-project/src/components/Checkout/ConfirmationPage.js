import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import confirmation from "../../assets/images/confirmation.gif";

const confirmationPage = (props) => {
  return (
    <div className="confirmation-wrapper">
      <Jumbotron className="confirmation-jumbotron">
        <Row>
          <Col lg="2">
            <img src={confirmation} alt="" />
          </Col>
          <Col lg="8">
            <h1>Your order has been placed!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default confirmationPage;

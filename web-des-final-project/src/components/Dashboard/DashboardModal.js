import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { aux1 as Aux } from "../../hoc/Aux1/Aux1";
import "./Dashboard.css";

const dashboardModal = (props) => {
  console.log("props", props);
  let body = [];
  if (props.show) {
    props.info.items.map((item) => {
      return body.push(
        <Aux>
          <h4 className="dashboard-modal-header">{item.description}</h4>
          <p className="dashboard-modal-text">
            <b>Serial Number:</b>&nbsp;{item.serialNo}
          </p>
          <p>
            <b>Model Number:</b>&nbsp;{item.modelNo}
          </p>
          <p>
            <b>Price:</b>&nbsp;{item.price}
          </p>
          <p>
            <b>Category:</b>&nbsp;{item.category}
          </p>
          <div className="separator" />
        </Aux>
      );
    });
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.clicked(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ color: "#581845" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Order Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ padding: "4%", maxHeight: "550px", overflowX: "auto" }}
      >
        {body}
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button onClick={() => props.clicked(false)} className="ca-btn">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default dashboardModal;

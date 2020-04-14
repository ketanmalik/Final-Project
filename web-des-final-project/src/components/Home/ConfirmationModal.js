import React, { Component } from "react";
import CartInfo from "../../CartInfo/CartInfo";
import UserInfo from "../../UserInfo/UserInfo";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { numberFormat } from "../../assets/NumberFormat/NumberFormat";

import "./ConfirmationModal.css";

class ConfirmationModal extends Component {
  state = {
    orderPlaced: false,
    orderInfo: [],
  };

  async componentDidMount() {
    let res = CartInfo.getOrderPlaced();
    let info = [];
    info = await UserInfo.getUserInfoObj();
    if (info != null) {
      info = info.orderInfo[info.orderInfo.length - 1];
      this.setState({ orderPlaced: res, orderInfo: info });
    }
  }

  hideModal = () => {
    this.setState({ orderPlaced: false });
    CartInfo.setOrderPlaced(false);
  };

  render() {
    let modalText = null;
    if (this.state.orderInfo != null) {
      if (this.state.orderInfo.fName && this.state.orderPlaced) {
        let inf = { ...this.state.orderInfo };

        modalText = (
          <div className="confirmation-modal-text">
            <p>
              <b>First Name:</b>&nbsp;{inf.fName}
            </p>
            <p>
              <b>Last Name:</b>&nbsp;{inf.lName}
            </p>
            <p>
              <b>Order ID:</b>&nbsp;{inf.orderId}
            </p>
            <p>
              <b>Amount:</b>&nbsp;{numberFormat(inf.amount)}
            </p>
            <p>
              <b>Date:</b>&nbsp;{inf.date.toDateString()}
            </p>
            {/* <p>
              <b>Date:</b>&nbsp;{inf.date.split("-")[0]}-{inf.date.split("-")[1]}-
              {inf.date.split("-")[2].substring(0, 2)}
            </p> */}
          </div>
        );
      }
    }
    return (
      <Modal
        show={this.state.orderPlaced}
        onHide={this.hideModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="confirmation-modal"
      >
        <Modal.Header className="confirmation-modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            <i
              style={{
                display: "inline-block",
                color: "green",
                marginRight: "20px",
              }}
              className="fas fa-check-circle fa-lg"
            ></i>
            <span className="confirmation-modal-title">
              <h3 style={{ display: "inline-block", color: "#581845" }}>
                Order Confirmation
              </h3>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#404040" }}>
          <h4>
            <b>Order Details: </b>
          </h4>
          {modalText}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.hideModal}
            className="confirmation-modal-close-btn"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmationModal;

import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { aux1 as Aux } from "../../../hoc/Aux1/Aux1";
import tick from "../../../assets/images/tick.gif";
import "./Toolbar.css";

class SellPartsModal extends Component {
  state = {
    message: null,
    msgError: "",
    success: false,
    loading: false,
    parentResp: true,
  };
  componentDidMount() {
    console.log("ssss");
  }
  handleSubmit = async (event) => {
    if (this.validDetails()) {
      let res = this.state.parentResp;
      this.setState({ loading: true });
      setTimeout(async () => {
        res = await this.props.confirm(this.state.message);
        if (res) {
          this.setState({
            message: null,
            msgError: "",
            success: false,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      }, 2000);
      this.setState({ parentResp: res });
    }
  };

  validDetails = () => {
    var err = this.state.msgError;
    if (this.state.message === null || this.state.message === "") {
      err = "Please enter your inventory list.";
    } else {
      err = "";
    }
    this.setState({ msgError: err });
    let success = true;
    if (err.length > 0) {
      success = false;
    }
    this.setState({ success: success });
    return success;
  };

  formChangeHandler = (e) => {
    const { value } = e.target;
    let err = this.state.msgError;
    this.setState({ message: value });
    if (value.trim() === null || value.trim() === "") {
      err = "Please enter your inventory list.";
    } else {
      err = "";
    }
    this.setState({ msgError: err });
  };

  render() {
    console.log(this.props.info);
    let body = "";
    if (this.props.info) {
      if (!this.props.info.add1) {
        //user not logged in
        body = (
          <Aux>
            <p>
              You are currently not <i>signed in.</i>
            </p>
            <p>Please sign in or register to continue.</p>
          </Aux>
        );
      } else if (this.props.info.add1 === "-1") {
        //add not present
        body = (
          <Aux>
            <p>
              We do not have your <i>address.</i>
            </p>
            <p>Please update your address in dashboard.</p>
          </Aux>
        );
      } else {
        //user valid
        body = (
          <Aux>
            <p>We are actively buying aircraft parts.</p>
            <p>Send us your list of inventory for sale!</p>
            <Form noValidate>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  <span style={{ color: "#6b6b6b" }}>*</span>&nbsp; Inventory
                  List:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="6"
                  placeholder="List of parts"
                  onChange={this.formChangeHandler}
                  name="message"
                  required
                  isInvalid={this.state.msgError}
                  value={this.state.message}
                />
                <span className="errorMessage">
                  {this.state.msgError ? this.state.msgError : ""}
                </span>
              </Form.Group>
            </Form>
          </Aux>
        );
      }
    } else {
      //user not logged in
      body = (
        <Aux>
          <p>
            You are currently not <i>signed in.</i>
          </p>
          <p>Please sign in or register to continue.</p>
        </Aux>
      );
    }
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.clicked(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ padding: "4%", minHeight: "600px" }}>
          {this.props.success ? (
            <Aux>
              <h4
                style={{
                  marginTop: "12%",
                  fontWeight: "700",
                  color: "#581845",
                }}
              >
                Your request has been initiated! Our team will contact you
                shortly.
              </h4>
              <img
                src={tick}
                alt="Confirmation"
                style={{ width: "60%", marginLeft: "18%" }}
              />
            </Aux>
          ) : this.state.loading ? (
            <div
              style={{
                marginLeft: "47%",
                marginTop: "32%",
                color: "#581845",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="sr-only" />
              </Spinner>
            </div>
          ) : (
            <Aux>
              <h3
                style={{
                  color: "#581845",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                We Buy Aircraft Parts
              </h3>
              <div className="separator" />
              <div style={{ marginTop: "5%" }}>{body}</div>
            </Aux>
          )}
        </Modal.Body>
        {this.props.info &&
        this.props.info.add1 &&
        this.props.info.add1 !== "-1" &&
        !this.props.success &&
        !this.state.loading ? (
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button onClick={this.handleSubmit} className="ca-btn">
              Send Request
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    );
  }
}

export default SellPartsModal;

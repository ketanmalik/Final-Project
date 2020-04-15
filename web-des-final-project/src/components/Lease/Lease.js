import React, { Component } from "react";
import img from "../../assets/images/lease1.png";
import { aux1 as Aux } from "../../hoc/Aux1/Aux1";
import LeaseCards from "./LeaseCards";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import lp1 from "../../assets/images/lp1.jpg";
import lp2 from "../../assets/images/lp2.jpg";
import lp3 from "../../assets/images/lp3.jpg";
import lp4 from "../../assets/images/lp4.jpeg";
import lp5 from "../../assets/images/lp5.jpg";
import lp6 from "../../assets/images/lp6.jpg";
import tick from "../../assets/images/tick.gif";

import "./Lease.css";

class Lease extends Component {
  state = {
    showModal: false,
    fName: null,
    lName: null,
    email: null,
    company: null,
    message: null,
    errors: {
      fName: "",
      lName: "",
      email: "",
      company: "",
      message: "",
    },
    loading: false,
    caSuccess: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.invalidDetails()) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.caSuccess(true);
      }, 2000);
    }
  };

  caSuccess = (bool) => {
    this.setState({ caSuccess: bool, loading: !bool });
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      fName: null,
      lName: null,
      email: null,
      company: null,
      message: null,
      error: true,
    });
  };

  invalidDetails = () => {
    var errors = { ...this.state.errors };
    if (this.state.fName === null || this.state.fName === "") {
      errors.fName = "Please enter a valid first name.";
    }
    if (this.state.lName === null || this.state.lName === "") {
      errors.lName = "Please enter a valid last name.";
    }
    if (this.state.email === null || this.state.email === "") {
      errors.email = "Please enter a valid email.";
    }
    if (this.state.message === null || this.state.message === "") {
      errors.message = "Please enter requested parts.";
    }

    this.setState({ errors: errors });
    let error = false;
    Object.keys(errors).map((key) => {
      if (errors[key].length > 0) {
        error = true;
      }
      return null;
    });
    return error;
  };

  formChangeHandler = (e) => {
    const { name, value } = e.target;
    const errors = { ...this.state.errors };
    this.setState({ [name]: value });

    switch (name) {
      case "fName":
        errors.fName =
          value.trim() === null || value.trim() === ""
            ? "Please enter a valid first name."
            : "";
        break;
      case "lName":
        errors.lName =
          value.trim() === null || value.trim() === ""
            ? "Please enter a valid last name."
            : "";
        break;
      case "email":
        errors.email = this.invalidEmail(value)
          ? "Please enter valid email."
          : "";
        break;
      case "message":
        errors.message =
          value.trim() === null || value.trim() === ""
            ? "Please enter requested parts."
            : "";
        break;
      default:
        break;
    }
    this.setState({ errors: errors });
  };

  invalidEmail = (email) => {
    var reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !reg.test(email);
  };

  modalHandler = (bool) => {
    this.setState({ showModal: bool, caSuccess: false, loading: false });
  };

  render() {
    return (
      <Aux>
        <div className="lease-wrapper">
          <div className="lease-left-wrapper">
            <h2>Leasing Solutions for Jet Engines, Turboprops &amp; APUs</h2>
            <p id="description-paragraph">
              Our Parts &amp; Leasing manages a portfolio of commercial and
              business aviation jet and turboprop engines available for lease.
              We specialize in Honeywell, Pratt &amp; Whitney, and Rolls-Royce
              engine leases and APU rentals, with worldwide access to many other
              makes and models. Contact us today to discuss the jet engine or
              APU you are searching for. Our active portfolio is ready to
              support the following models:
            </p>
            <h3>Engine Leases</h3>
            <ul>
              <li>Honeywell TFE731 Series</li>
              <li>Pratt &amp; Whitney PW300 Series</li>
              <li>Rolls-Royce BR710 Series</li>
            </ul>
            <h3>APU Rentals</h3>
            <ul>
              <li>Honeywell GTCP36 Series</li>
              <li>Honeywell RE100XL</li>
              <li>Honeywell RE220</li>
            </ul>
            <p>
              Contact us with your leasing request from available pool and from
              initial material request to closing an invoice, we can create a
              sophisticated parts procurement and supply chain process for your
              operation.
            </p>
          </div>
          <div className="lease-right-wrapper">
            <img src={img} alt="lease" />
          </div>
        </div>
        <div className="lease-card-wrapper">
          <CardDeck>
            <LeaseCards
              img={lp2}
              title={"Pratt & Whitney PW300"}
              text={
                "Highly dependable, fuel-efficient thrust, clean and quiet with excellent operating economics. High performance and value are at the heart of the PW300 family."
              }
            />
            <LeaseCards
              img={lp1}
              title={"Honeywell TFE731"}
              text={
                "The RE220 provides a reliable, cost-effective source of pressurized bleed air for environmental control systems (ECS) and emergency electrical power."
              }
            />
            <LeaseCards
              img={lp3}
              title={"Rolls-Royce BR710"}
              text={
                "The BR710 provides excellent take-off and climb performance, which allows aircraft to reach cruising altitude more quickly than airliners and to fly above commercial traffic."
              }
            />
          </CardDeck>
          <CardDeck>
            <LeaseCards
              img={lp4}
              title={"Honeywell GTCP36"}
              text={
                "The 36 Series of APUs deliver compressed air for main engine starting, air conditioning, anti-ice and heating systems. The 36-150 is capable of delivering air and shaft power simultaneously or individually."
              }
            />
            <LeaseCards
              img={lp5}
              title={"Honeywell RE100XL"}
              text={
                "RE100 Auxiliary Power Unit (APU) is a perfect fit for small to mid-size aircraft. It eliminates dependence on ground power and provides substantial fuel savings."
              }
            />
            <LeaseCards
              img={lp6}
              title={"Rolls-Royce BR710"}
              text={
                "RE220 Auxiliary Power Unit (APU) was designed specifically for the CRJ-700/900 and CL-850 aircraft and makes an excellent auxiliary power choice for regional airlines and transcontinental business jets."
              }
            />
          </CardDeck>
        </div>
        <div style={{ textAlign: "center", paddingBottom: "5%" }}>
          <Button
            className="lease-ca-btn"
            onClick={() => this.modalHandler(true)}
          >
            Check Availability
          </Button>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.modalHandler(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: "#581845" }}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              Check Availability
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "4%", minHeight: "460px" }}>
            {this.state.loading || this.state.caSuccess ? (
              this.state.loading ? (
                <div
                  style={{
                    marginLeft: "50%",
                    marginTop: "20%",
                    color: "#581845",
                  }}
                >
                  <Spinner animation="border" role="status">
                    <span className="sr-only" />
                  </Spinner>
                </div>
              ) : (
                <Aux>
                  <h4>
                    Your request has been initiated! Our team will contact you
                    shortly.
                  </h4>
                  <img
                    src={tick}
                    alt="Confirmation"
                    style={{ width: "60%", marginLeft: "18%" }}
                  />
                </Aux>
              )
            ) : (
              <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    lg="6"
                    xs="12"
                    controlId="formGridFirstName"
                  >
                    <Form.Label>
                      <span style={{ color: "#6b6b6b" }}>*</span>&nbsp;First
                      Name
                    </Form.Label>
                    <Form.Control
                      placeholder="First Name"
                      onChange={this.formChangeHandler}
                      name="fName"
                      required
                      isInvalid={this.state.errors.fName}
                      value={this.state.fName}
                    />
                    <span className="errorMessage">
                      {this.state.errors.fName ? this.state.errors.fName : ""}
                    </span>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg="6"
                    xs="12"
                    controlId="formGridLastName"
                  >
                    <Form.Label>
                      <span style={{ color: "#6b6b6b" }}>*</span>&nbsp;Last Name
                    </Form.Label>
                    <Form.Control
                      placeholder="Last Name"
                      onChange={this.formChangeHandler}
                      name="lName"
                      required
                      isInvalid={this.state.errors.lName}
                      value={this.state.lName}
                    />
                    <span className="errorMessage">
                      {this.state.errors.lName ? this.state.errors.lName : ""}
                    </span>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} lg="6" xs="12" controlId="formGridEmail">
                    <Form.Label>
                      <span style={{ color: "#6b6b6b" }}>*</span>&nbsp;Email
                    </Form.Label>
                    <Form.Control
                      placeholder="Email"
                      onChange={this.formChangeHandler}
                      name="email"
                      required
                      isInvalid={this.state.errors.email}
                      value={this.state.email}
                    />
                    <span className="errorMessage">
                      {this.state.errors.email ? this.state.errors.email : ""}
                    </span>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg="6"
                    xs="12"
                    controlId="formGridCompany"
                  >
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      placeholder="Company"
                      onChange={this.formChangeHandler}
                      name="company"
                      value={this.state.company}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    <span style={{ color: "#6b6b6b" }}>*</span>&nbsp;Requested
                    Parts
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Requested Parts"
                    onChange={this.formChangeHandler}
                    name="message"
                    required
                    isInvalid={this.state.errors.message}
                    value={this.state.message}
                  />
                  <span className="errorMessage">
                    {this.state.errors.message ? this.state.errors.message : ""}
                  </span>
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          {this.state.loading || this.state.caSuccess ? (
            ""
          ) : (
            <Modal.Footer style={{ justifyContent: "center" }}>
              <Button onClick={this.handleSubmit} className="ca-btn">
                Check Availability
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </Aux>
    );
  }
}

export default Lease;

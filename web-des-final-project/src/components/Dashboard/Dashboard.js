import React, { Component } from "react";
import { aux1 as Aux } from "../../hoc/Aux1/Aux1";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import img from "../../assets/images/dashboard.png";
import UserInfo from "../../UserInfo/UserInfo";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import CountryList from "../../components/UserSignIn/CountryList";

import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    userObj: null,
    userOrderInfo: [],
    editAccountInfo: false,
    safeToProceed: false,
    key: "account-info",
    errors: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      add1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    error: true,
    loading: false,
    apiError: false,
    showToast: false,
  };

  componentDidMount() {
    let obj = UserInfo.getUserInfoObj();
    if (!obj) {
      window.location.replace("https://localhost:3000/");
    } else {
      obj.add1 = obj.add1 === "-1" ? null : obj.add1;
      obj.city = obj.city === "-1" ? null : obj.city;
      obj.state = obj.state === "-1" ? null : obj.state;
      obj.zip = obj.zip === -1 ? null : obj.zip;
      obj.country = obj.country === "-1" ? "United States" : obj.country;

      this.setState({
        userObj: obj,
        safeToProceed: true,
        userOrderInfo: obj.orderInfo,
      });
    }
  }

  tabKeyHandler = (key) => {
    this.setState({ key: key });
  };

  editInfoHandler = async () => {
    if (!this.state.editAccountInfo) {
      this.setState({ editAccountInfo: true });
    } else {
      if (!this.invalidDetails()) {
        let res = await this.updateUserInformation();
        if (res) {
          this.setState({ editAccountInfo: false });
        } else {
          console.log("sssss");
        }
      }
    }
  };

  renderTooltip = (props) => {
    const text = this.state.editAccountInfo
      ? "Save Information"
      : "Edit Information";
    return (
      <Tooltip id="info-tooltip" {...props}>
        {text}
      </Tooltip>
    );
  };

  updateUserInformation = async () => {
    let userObj = { ...this.state.userObj };
    let feedback = false;
    await axios({
      url: "/dashboard/update",
      method: "PUT",
      data: userObj,
    })
      .then(async (resp) => {
        await axios({
          url: "/updatesaveuser",
          method: "PUT",
          data: { userObj: userObj },
        })
          .then((r) => {
            UserInfo.setUserInfoObj(userObj);
            feedback = true;
          })
          .catch((e) => {
            feedback = false;
          });
      })
      .catch((err) => {
        feedback = false;
      });
    this.setState({ apiError: !feedback, showToast: true });
    console.log(feedback);
    return feedback;
  };

  invalidDetails = () => {
    var errors = { ...this.state.errors };
    var payload = { ...this.state.userObj };
    if (payload.fName === null || payload.fName === "") {
      errors.fName = "Please enter a valid first name.";
    }
    if (payload.lName === null || payload.lName === "") {
      errors.lName = "Please enter a valid last name.";
    }
    if (payload.add1 === null || payload.add1 === "") {
      errors.add1 = "Please enter a valid address.";
    }
    if (payload.city === null || payload.city === "") {
      errors.city = "Please enter a valid city.";
    }
    if (payload.state === null || payload.state === "") {
      errors.state = "Please select a valid state.";
    }
    if (payload.zip === null || payload.zip === "") {
      errors.zip = "Please enter a valid zip.";
    }
    if (payload.country === null || payload.country === "") {
      errors.country = "Please choose a valid country.";
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
    let payload = { ...this.state.userObj };
    payload[name] = value;
    this.setState({ userObj: payload });

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
      case "add1":
        errors.add1 =
          value.trim() === null || value.trim() === ""
            ? "Please enter a valid address."
            : "";
        break;
      case "city":
        errors.city =
          value.trim() === null || value.trim() === ""
            ? "Please enter a valid city."
            : "";
        break;
      case "state":
        errors.state =
          value.trim() === null || value.trim() === ""
            ? "Please select a valid state."
            : "";
        break;
      case "zip":
        errors.zip = this.invalidZip(value) ? "Please enter a valid zip." : "";
        break;
      case "country":
        errors.country =
          value.trim() === null || value.trim() === ""
            ? "Please choose a valid country."
            : "";
        break;
      default:
        break;
    }
    this.setState({ errors: errors });
  };

  // invalidEmail = (email) => {
  //   var reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  //   return !reg.test(email);
  // };

  // invalidPassword = (password) => {
  //   var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;
  //   return !reg.test(password);
  // };

  invalidZip = (zip) => {
    var reg = /^\d{5,6}$/;
    return !reg.test(zip);
  };

  toastMessageHandler = (bool) => {
    this.setState({ showToast: bool });
  };

  getDate = (date) => {
    let res = null;
    try {
      res = date.toDateString();
    } catch (err) {
      let year = date.split("-")[0];
      let month = date.split("-")[1] - 1;
      let dt = date.split("-")[2].substring(0, 2);
      res = new Date(year, month, dt).toDateString();
    }
    return res;
  };

  viewOrder = (index) => {
    console.log(index);
  };

  render() {
    const toastHeader = this.state.apiError ? "Failure" : "Success";

    let temp = [];
    let userOrderInfo = [];
    console.log("user", this.state.userObj, this.state.userOrderInfo);
    if (this.state.safeToProceed) {
      let info = [...this.state.userOrderInfo];
      if (info.length > 0) {
        var j = 0;
        info.map((key) => {
          temp.push(
            <div className="dashboard-order-card" key={key}>
              <h4>
                {this.getDate(key.date)}
                <Button
                  onClick={this.viewOrder.bind(this)}
                  data-id={j++}
                  style={{ float: "right" }}
                  className="dashboard-view-order-btn"
                >
                  <i
                    class="fas fa-info fa-lg"
                    style={{
                      float: "right",
                      color: "#581845",
                    }}
                  ></i>
                </Button>
              </h4>
              <div className="dashboard-separator" />
              <p>
                <b>First Name:&nbsp;</b>
                {key.fName}
              </p>
              <p>
                <b>Last Name:&nbsp;</b>
                {key.lName}
              </p>
              <p>
                <b>Order ID:&nbsp;</b>
                {key.orderId}
              </p>
              <p>
                <b>Amount:&nbsp;</b>${key.amount}
              </p>
            </div>
          );
        });
        for (var i = 0; i < temp.length; i += 2) {
          userOrderInfo.push(
            <Row key={i} id="dashboard-order-info-row">
              <Col lg="6" sm="12" key={i} id="dashboard-order-info-col1">
                {temp[i]}
              </Col>
              <Col lg="6" sm="12" key={i + 1} id="dashboard-order-info-col2">
                {temp[i + 1]}
              </Col>
            </Row>
          );
        }
        console.log("userOrderInfo", userOrderInfo);
      }
    }
    return this.state.safeToProceed ? (
      <Aux>
        <Jumbotron fluid>
          <Container>
            <div className="jumbotron-container">
              <Row>
                <Col lg="4" xs="12">
                  <Image src={img} rounded />
                </Col>
                <Col lg="8" xs="12">
                  <div className="jumbotron-text">
                    <h1>{this.state.userObj.fName}'s Dashboard</h1>
                    <p>
                      This is a modified jumbotron that occupies the entire
                      horizontal space of its parent.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Jumbotron>
        <div className="dashboard-info">
          <Tabs
            id="dashboard-tab"
            activeKey={this.state.key}
            onSelect={(k) => this.tabKeyHandler(k)}
          >
            <Tab eventKey="account-info" title="Account Information">
              <Card className="account-info-card">
                <Card.Header className="dashboard-pi-header">
                  Personal Information
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 200 }}
                    overlay={this.renderTooltip}
                  >
                    <Button
                      className="dashboard-edit-btn"
                      style={{ float: "right" }}
                      onClick={this.editInfoHandler}
                    >
                      <i
                        style={{ float: "right" }}
                        className={
                          this.state.editAccountInfo
                            ? "fas fa-check"
                            : "far fa-edit"
                        }
                      ></i>
                    </Button>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body className="dashboard-card">
                  <Card.Title>Contact</Card.Title>
                  <Card.Text className="dashboard-card-text">
                    <Form>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextFirstName"
                        >
                          <Form.Label className="dashboard-form-label">
                            First Name:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="fName"
                            isInvalid={this.state.errors.fName}
                            value={this.state.userObj.fName}
                          />
                          <span className="errorMessage">
                            {this.state.errors.fName
                              ? this.state.errors.fName
                              : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextLastName"
                        >
                          <Form.Label className="dashboard-form-label">
                            Last Name:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="lName"
                            isInvalid={this.state.errors.lName}
                            value={this.state.userObj.lName}
                          />
                          <span className="errorMessage">
                            {this.state.errors.lName
                              ? this.state.errors.lName
                              : ""}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label className="dashboard-form-label">
                            Email:
                          </Form.Label>
                          <Form.Control
                            plaintext
                            defaultValue={this.state.userObj.email}
                            readOnly
                          />
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Card.Text>
                  <Card.Title>Address</Card.Title>
                  <Card.Text className="dashboard-card-text">
                    <Form>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextAdd1"
                        >
                          <Form.Label className="dashboard-form-label">
                            Street, Area:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="add1"
                            isInvalid={this.state.errors.add1}
                            value={this.state.userObj.add1}
                            placeholder="1234 Main St"
                          />
                          <span className="errorMessage">
                            {this.state.errors.add1
                              ? this.state.errors.add1
                              : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextadd2"
                        >
                          <Form.Label className="dashboard-form-label">
                            Apartment, Studio, Floor:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="add2"
                            isInvalid={this.state.errors.add2}
                            value={this.state.userObj.add2}
                            placeholder="Apartment, studio, or floor"
                          />
                          <span className="errorMessage">
                            {this.state.errors.add2
                              ? this.state.errors.add2
                              : ""}
                          </span>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextCity"
                        >
                          <Form.Label className="dashboard-form-label">
                            City:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="city"
                            isInvalid={this.state.errors.city}
                            value={this.state.userObj.city}
                            placeholder="12345"
                          />
                          <span className="errorMessage">
                            {this.state.errors.city
                              ? this.state.errors.city
                              : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextState"
                        >
                          <Form.Label className="dashboard-form-label">
                            State:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="state"
                            isInvalid={this.state.errors.state}
                            value={this.state.userObj.state}
                            placeholder="State"
                          />
                          <span className="errorMessage">
                            {this.state.errors.state
                              ? this.state.errors.state
                              : ""}
                          </span>
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextZip"
                        >
                          <Form.Label className="dashboard-form-label">
                            Zip:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="zip"
                            isInvalid={this.state.errors.zip}
                            value={this.state.userObj.zip}
                            placeholder="12345"
                          />
                          <span className="errorMessage">
                            {this.state.errors.zip ? this.state.errors.zip : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="formPlaintextCountry"
                        >
                          <Form.Label className="dashboard-form-label">
                            Country:
                          </Form.Label>
                          <Form.Control
                            as="select"
                            plaintext={!this.state.editAccountInfo}
                            readOnly={!this.state.editAccountInfo}
                            onChange={this.formChangeHandler}
                            required
                            name="country"
                            isInvalid={this.state.errors.country}
                            value={this.state.userObj.country}
                          >
                            <CountryList />
                          </Form.Control>
                          <span className="errorMessage">
                            {this.state.errors.country
                              ? this.state.errors.country
                              : ""}
                          </span>
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Card.Text>
                </Card.Body>
                {this.state.showToast ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "10%",
                      right: "1%",
                      color: `${!this.state.apiError ? "#155724" : "#721c24"}`,
                    }}
                  >
                    <Toast
                      autohide
                      animation={true}
                      onClose={() => this.toastMessageHandler(false)}
                      delay={2000}
                    >
                      <Toast.Header
                        closeButton={false}
                        style={{
                          background: `${
                            this.state.apiError ? "#f8d7da" : "#d4edda"
                          }`,
                          borderColor: `${
                            this.state.apiError ? "#721c24" : "#c3e6cb"
                          }`,
                          color: `${
                            this.state.apiError ? "#e34234" : "#37BD2C"
                          }`,
                        }}
                      >
                        {this.state.apiError ? (
                          <span
                            style={{
                              color: "#e34234",
                              marginRight: "3%",
                              marginLeft: "1%",
                            }}
                          >
                            <i class="fas fa-times"></i>
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "37BD2C",
                              marginRight: "3%",
                              marginLeft: "1%",
                            }}
                          >
                            <i class="fas fa-check"></i>
                          </span>
                        )}

                        <strong className="mr-auto">{toastHeader}</strong>
                      </Toast.Header>
                      <Toast.Body
                        style={{
                          background: `${
                            this.state.apiError ? "#f8d7da" : "#d4edda"
                          }`,
                          borderColor: `${
                            this.state.apiError ? "#721c24" : "#c3e6cb"
                          }`,
                        }}
                      >
                        {this.state.apiError
                          ? "Your information cannot be saved"
                          : "Your information has been saved"}
                      </Toast.Body>
                    </Toast>
                  </div>
                ) : (
                  ""
                )}
              </Card>
            </Tab>
            <Tab eventKey="orders" title="Orders">
              <Row>
                <Col lg="2" xs="12" />
                <Col lg="8" xs="12">
                  <Aux>{userOrderInfo}</Aux>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="security" title="Security" disabled>
              <div>Change Pass</div>
            </Tab>
          </Tabs>
        </div>
        ;
      </Aux>
    ) : (
      <div
        style={{
          marginLeft: "50%",
          marginTop: "30%",
          marginBotton: "50%",
          color: "#581845",
        }}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }
}
export default Dashboard;

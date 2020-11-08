import React, { Component } from "react";
import { aux1 as Aux } from "../../hoc/Aux1/Aux1";
import axios from "axios";
import DashboardModal from "./DashboardModal";
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
import _ from "lodash";
import CountryList from "../../components/UserSignIn/CountryList";
import AdminViewUpdate from "./AdminViewUpdate";

import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    userObj: null,
    userOrderInfo: [],
    userSellParts: [],
    editAccountInfo: false,
    safeToProceed: false,
    key: "1",
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
    adminErrors: {
      serialNo: "",
      modelNo: "",
      description: "",
      price: "",
      category: "",
      specification: "",
      property: "",
      value: "",
    },
    adminCreate: {
      serialNo: null,
      modelNo: null,
      description: null,
      price: null,
      category: null,
      specification: {},
    },
    error: true,
    loading: false,
    apiError: false,
    showToast: false,
    showModal: false,
    modalInfo: null,
    specsLength: 0,
    specsValue: [],
    viewLoading: true,
    viewTblData: [],
    viewError: null,
  };

  componentDidMount() {
    let obj = UserInfo.getUserInfoObj();
    this.getInventory();
    if (!obj) {
      window.location.replace("https://localhost:3000/");
    } else {
      this.setState({
        userObj: obj,
        safeToProceed: true,
        userOrderInfo: obj.orderInfo,
        userSellParts: obj.sellParts,
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
        }
      }
    }
  };

  adminCreateSubmitHandler = async (e) => {
    e.preventDefault();
    if (!this.invalidAdminCreateDetails()) {
      let payload = { ...this.state.adminCreate };
      let specs = [...this.state.specsValue];
      let payloadSpecs = payload.specification;
      for (var i = 0; i < specs.length; i++) {
        let obj = specs[i];
        _.merge(payloadSpecs, obj);
      }
      payload.specification = payloadSpecs;
      await this.adminCreatePart(payload);
    } else {
    }
  };

  adminCreatePart = async (payload) => {
    let success = true;
    await axios({
      url: "/createpart",
      method: "POST",
      data: payload,
    })
      .then((resp) => {
        this.clearAdminForm();
        this.getInventory();
      })
      .catch((err) => {
        success = false;
        console.log(err.response);
      });
    this.setState({ apiError: !success, showToast: true });
    return success;
  };

  clearAdminForm = () => {
    let obj = { ...this.state.adminCreate };
    Object.keys(obj).map((key) => {
      obj[key] = "";
    });
    obj.specification = {};
    this.setState({ specsLength: 0, specsValue: [], adminCreate: obj });
  };

  invalidAdminCreateDetails = () => {
    var adminErrors = { ...this.state.adminErrors };
    var payload = { ...this.state.adminCreate };
    let specs = [...this.state.specsValue];
    let error = false;
    if (payload.serialNo === null || payload.serialNo === "") {
      adminErrors.serialNo = "Please enter a valid serial number.";
    }
    if (payload.modelNo === null || payload.modelNo === "") {
      adminErrors.modelNo = "Please enter a valid model number.";
    }
    if (payload.description === null || payload.description === "") {
      adminErrors.description = "Please enter a valid description.";
    }
    if (payload.price === null || payload.price === "") {
      adminErrors.price = "Please enter a valid price.";
    }
    if (payload.category === null || payload.category === "") {
      adminErrors.category = "Please enter a valid category.";
    }
    if (specs.length === 0) {
      adminErrors.specification = "Please add specifications";
    } else {
      for (var i = 0; i < specs.length; i++) {
        for (var key in specs[i]) {
          if (
            !specs[i].hasOwnProperty(key) ||
            key === "" ||
            specs[key] === ""
          ) {
            adminErrors.specification = "Please add specifications";
          } else {
            if (specs[i][key] === "" || specs[key] === null) {
              adminErrors.specification = "Please add specifications";
            }
          }
        }
      }
    }
    this.setState({ adminErrors: adminErrors });
    Object.keys(adminErrors).map((k) => {
      if (adminErrors[k].length > 0) {
        error = true;
      }
    });
    return error;
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
      .then(() => {
        sessionStorage.setItem('user', JSON.stringify(userObj));
        UserInfo.setUserInfoObj(userObj);
        feedback = true;

      })
      .catch(() => {
        feedback = false;
      });
    this.setState({ apiError: !feedback, showToast: true });
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
    if (payload.add1 === null || payload.add1 === "" || payload.add1 === "-1") {
      errors.add1 = "Please enter a valid address.";
    }
    if (payload.city === null || payload.city === "" || payload.city === "-1") {
      errors.city = "Please enter a valid city.";
    }
    if (
      payload.state === null ||
      payload.state === "" ||
      payload.state === "-1"
    ) {
      errors.state = "Please select a valid state.";
    }
    if (payload.zip === null || payload.zip === "" || payload.zip === -1) {
      errors.zip = "Please enter a valid zip.";
    }
    if (
      payload.country === null ||
      payload.country === "" ||
      payload.country === "-1"
    ) {
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

  adminFormChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name !== "property" || name !== "value") {
      let adminErrors = { ...this.state.adminErrors };
      let payload = { ...this.state.adminCreate };
      payload[name] = value;
      this.setState({ adminCreate: payload });

      switch (name) {
        case "serialNo":
          adminErrors.serialNo =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid serial number."
              : "";
          break;
        case "modelNo":
          adminErrors.modelNo =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid model number."
              : "";
          break;
        case "price":
          adminErrors.price = this.invalidPrice(value)
            ? "Please enter a valid price."
            : "";
          break;
        case "description":
          adminErrors.description =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid description."
              : "";
          break;
        case "category":
          adminErrors.category =
            value.trim() === null || value.trim() === ""
              ? "Please enter a valid category."
              : "";
          break;
      }
      this.setState({ adminErrors: adminErrors });
    }
  };

  // invalidPassword = (password) => {
  //   var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;
  //   return !reg.test(password);
  // };

  invalidPrice = (price) => {
    var reg = /^\d{0,8}(\.\d{1,4})?$/;
    return !reg.test(price);
  };

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

  viewOrder = (e) => {
    let index = e.currentTarget.dataset.id;
    this.setState(
      { modalInfo: this.state.userOrderInfo[index] },
      this.modalHandler(true)
    );
  };

  modalHandler = (bool) => {
    this.setState({ showModal: bool });
  };

  specsLengthHandler = () => {
    this.setState((prevState) => {
      return { specsLength: prevState.specsLength + 1 };
    });
  };

  specsAddHandler = (e) => {
    let { name, value } = e.currentTarget;
    let index = e.currentTarget.dataset.id;
    let specs = [...this.state.specsValue];
    let errors = { ...this.state.adminErrors };
    errors.specification = "";
    let obj = specs[index];
    if (name === "property") {
      if (obj) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            Object.defineProperty(
              obj,
              value,
              Object.getOwnPropertyDescriptor(obj, key)
            );
            delete obj[key];
            specs[index] = obj;
          }
        }
      } else {
        obj = { [value]: null };
        specs[index] = obj;
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = value;
          specs[index] = obj;
        }
      }
    }
    this.setState({ specsValue: specs, adminErrors: errors });
  };

  getInventory = async () => {
    console.log("sss");
    this.setState({ viewLoading: true });
    await axios
      .get("/getinventory")
      .then((resp) =>
        this.setState({
          viewTblData: resp.data,
          viewLoading: false,
          viewError: null,
        })
      )
      .catch((error) =>
        this.setState({ viewLoading: false, viewError: error })
      );
  };

  // specsDeleteHandler = (e) => {
  //   console.log(e.currentTarget.dataset.id);
  //   console.log(this.state.specsLength);
  // };

  render() {
    const toastHeader = this.state.apiError ? "Failure" : "Success";

    let temp = [];
    let temp1 = [];
    let userOrderInfo = [];
    let userSellParts = [];
    let user = { ...this.state.userObj };
    if (this.state.safeToProceed) {
      let info = [...this.state.userOrderInfo];
      let sellInfo = [...this.state.userSellParts];
      if (sellInfo.length > 0) {
        var j = 0;
        sellInfo.map((key) => {
          temp1.push(
            <div className="dashboard-order-card" key={key}>
              <h4>{this.getDate(key.date)}</h4>
              <div className="dashboard-separator" />
              <p>
                <b>First Name:&nbsp;</b>
                {user.fName}
              </p>
              <p>
                <b>Last Name:&nbsp;</b>
                {user.lName}
              </p>
              <p>
                <b>Inventory List:&nbsp;</b>
                {key.message}
              </p>
            </div>
          );
        });
        for (var i = 0; i < temp1.length; i += 2) {
          userSellParts.push(
            <Row key={i} id="dashboard-order-info-row">
              <Col lg="6" sm="12" key={i} id="dashboard-order-info-col1">
                {temp1[i]}
              </Col>
              <Col lg="6" sm="12" key={i + 1} id="dashboard-order-info-col2">
                {temp1[i + 1]}
              </Col>
            </Row>
          );
        }
      }
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
                    className="fas fa-info fa-lg"
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
      }
    }
    let specs = [];
    let specsValue = [...this.state.specsValue];
    if (this.state.specsLength > 0) {
      for (var i = 0; i < this.state.specsLength; i++) {
        let key = "";
        for (var k in specsValue[i]) {
          if (specsValue[i].hasOwnProperty(k)) {
            key = k;
          }
        }
        specs.push(
          <div style={{ margin: "2%", overflowX: "hidden", overflowY: "auto" }}>
            <Row key={i}>
              <Col lg="6" xs="6">
                <Form.Control
                  data-id={i}
                  onChange={this.specsAddHandler.bind(this)}
                  name="property"
                  placeholder="Property"
                />
              </Col>
              <Col lg="6" xs="6">
                <Form.Control
                  data-id={i}
                  onChange={this.specsAddHandler.bind(this)}
                  name="value"
                  placeholder="Value"
                  disabled={key === "" || key === undefined || key === null}
                />
              </Col>
            </Row>
          </div>
        );
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
                      {this.state.userObj.socialId === "admin"
                        ? "Create, view, update and delete parts from inventory"
                        : "View and edit your account information, past orders and sell requests sent to us."}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Jumbotron>
        <div className="dashboard-info">
          {this.state.userObj.socialId === "admin" ? (
            <Tabs
              id="admin-tab"
              activeKey={this.state.key}
              onSelect={(k) => this.tabKeyHandler(k)}
            >
              <Tab eventKey="1" title="Create">
                <Card className="account-info-card">
                  <Card.Header className="dashboard-pi-header">
                    Create new part
                  </Card.Header>
                  <Card.Body
                    className="dashboard-card-text"
                    style={{ minHeight: "650px" }}
                  >
                    <Form noValidate onSubmit={this.adminCreateSubmitHandler}>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="createSerialNo"
                        >
                          <Form.Label className="dashboard-form-label">
                            Serial Number:
                          </Form.Label>
                          <Form.Control
                            onChange={this.adminFormChangeHandler}
                            required
                            name="serialNo"
                            isInvalid={this.state.adminErrors.serialNo}
                            value={this.state.adminCreate.serialNo}
                            placeholder="Serial Number"
                          />
                          <span className="errorMessage">
                            {this.state.adminErrors.serialNo
                              ? this.state.adminErrors.serialNo
                              : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="6"
                          xs="12"
                          controlId="createModelNo"
                        >
                          <Form.Label className="dashboard-form-label">
                            Model Number:
                          </Form.Label>
                          <Form.Control
                            onChange={this.adminFormChangeHandler}
                            required
                            name="modelNo"
                            isInvalid={this.state.adminErrors.modelNo}
                            value={this.state.adminCreate.modelNo}
                            placeholder="Model Number"
                          />
                          <span className="errorMessage">
                            {this.state.adminErrors.modelNo
                              ? this.state.adminErrors.modelNo
                              : ""}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          lg="4"
                          xs="12"
                          controlId="createDescription"
                        >
                          <Form.Label className="dashboard-form-label">
                            Description:
                          </Form.Label>
                          <Form.Control
                            onChange={this.adminFormChangeHandler}
                            required
                            name="description"
                            isInvalid={this.state.adminErrors.description}
                            value={this.state.adminCreate.description}
                            placeholder="Description"
                          />
                          <span className="errorMessage">
                            {this.state.adminErrors.description
                              ? this.state.adminErrors.description
                              : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="4"
                          xs="12"
                          controlId="createPrice"
                        >
                          <Form.Label className="dashboard-form-label">
                            Price:
                          </Form.Label>
                          <Form.Control
                            onChange={this.adminFormChangeHandler}
                            required
                            name="price"
                            isInvalid={this.state.adminErrors.price}
                            value={this.state.adminCreate.price}
                            placeholder="Price"
                          />
                          <span className="errorMessage">
                            {this.state.adminErrors.price
                              ? this.state.adminErrors.price
                              : ""}
                          </span>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          lg="4"
                          xs="12"
                          controlId="createCategory"
                        >
                          <Form.Label className="dashboard-form-label">
                            Category:
                          </Form.Label>
                          <Form.Control
                            onChange={this.adminFormChangeHandler}
                            required
                            name="category"
                            isInvalid={this.state.adminErrors.category}
                            value={this.state.adminCreate.category}
                            placeholder="Category"
                          />
                          <span className="errorMessage">
                            {this.state.adminErrors.category
                              ? this.state.adminErrors.category
                              : ""}
                          </span>
                        </Form.Group>
                      </Form.Row>
                      <Form.Group as={Col} controlId="createSpecification">
                        <Form.Label className="dashboard-form-label">
                          Specifications:
                        </Form.Label>
                        <Button
                          className="dashboard-edit-btn"
                          onClick={this.specsLengthHandler}
                          // style={{ float: "right" }}
                        >
                          <i
                            class="fas fa-plus-circle"
                            style={{ color: "green" }}
                          ></i>
                        </Button>
                        <span className="errorMessage">
                          {this.state.adminErrors.specification
                            ? this.state.adminErrors.specification
                            : ""}
                        </span>
                        <div style={{ maxHeight: "200px", overflow: "auto" }}>
                          {specs}
                        </div>
                      </Form.Group>
                      <div style={{ textAlign: "center" }}>
                        <Button className="sign-in-btn" type="submit">
                          Create
                        </Button>
                      </div>
                    </Form>
                    {this.state.showToast ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "10%",
                          right: "1%",
                          color: `${
                            !this.state.apiError ? "#155724" : "#721c24"
                          }`,
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
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="2" title="Update">
                <AdminViewUpdate
                  tblData={this.state.viewTblData}
                  loading={this.state.viewLoading}
                  error={this.state.viewError}
                  tblUpdate={() => this.getInventory()}
                />
              </Tab>
            </Tabs>
          ) : (
            <Tabs
              id="dashboard-tab"
              activeKey={this.state.key}
              onSelect={(k) => this.tabKeyHandler(k)}
            >
              <Tab eventKey="1" title="Account Information">
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
                              value={
                                this.state.userObj.add1 === "-1"
                                  ? null
                                  : this.state.userObj.add1
                              }
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
                              value={
                                this.state.userObj.city === "-1"
                                  ? null
                                  : this.state.userObj.city
                              }
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
                              value={
                                this.state.userObj.state === "-1"
                                  ? null
                                  : this.state.userObj.state
                              }
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
                              value={
                                this.state.userObj.zip === -1
                                  ? null
                                  : this.state.userObj.zip
                              }
                              placeholder="12345"
                            />
                            <span className="errorMessage">
                              {this.state.errors.zip
                                ? this.state.errors.zip
                                : ""}
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
                              disabled={!this.state.editAccountInfo}
                              onChange={this.formChangeHandler}
                              required
                              name="country"
                              isInvalid={this.state.errors.country}
                              default="United States"
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
                        color: `${
                          !this.state.apiError ? "#155724" : "#721c24"
                        }`,
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
              <Tab eventKey="2" title="Orders">
                <Row>
                  <Col lg="2" xs="12" />
                  <Col lg="8" xs="12">
                    <Aux>
                      {userOrderInfo.length > 0 ? (
                        userOrderInfo
                      ) : (
                        <div
                          style={{
                            marginTop: "15%",
                            marginBottom: "40%",
                            marginLeft: "15%",
                          }}
                        >
                          <h3>You have not placed any orders yet.</h3>
                          <h5>Please see our Inventory to place orders.</h5>
                        </div>
                      )}
                    </Aux>
                  </Col>
                </Row>
                <DashboardModal
                  info={this.state.modalInfo ? this.state.modalInfo : ""}
                  show={this.state.showModal}
                  clicked={this.modalHandler}
                />
              </Tab>
              <Tab eventKey="3" title="Sell Requests">
                <Row>
                  <Col lg="2" xs="12" />
                  <Col lg="8" xs="12">
                    <Aux>
                      {userSellParts.length > 0 ? (
                        <div style={{ marginBottom: "50%" }}>
                          {userSellParts}
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "15%",
                            marginBottom: "40%",
                            marginLeft: "15%",
                          }}
                        >
                          <h3>You have not placed any sell requests yet.</h3>
                          <h5>
                            Please send us a request with your inventory list.
                          </h5>
                        </div>
                      )}
                    </Aux>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          )}
        </div>
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

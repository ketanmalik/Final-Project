import React, { Component } from "react";
import { Link } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import CountryList from "./CountryList";
import "./UserSignIn.css";

class User extends Component {
  state = {
    payload: {
      fName: null,
      lName: null,
      email: null,
      password: null,
      add1: null,
      add2: null,
      city: null,
      state: null,
      zip: null,
      country: "United States",
    },
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
    showPassword: false,
    userCreated: false,
    response: "",
    userFailure: false,
    loading: false,
  };

  registerNewUser = () => {
    let payload = { ...this.state.payload };
    this.setState({ loading: true });
    axios({
      url: "/register",
      method: "POST",
      data: payload,
    })
      .then((resp) => {
        console.log(resp);
        this.setState({
          loading: false,
          userCreated: true,
          response: resp.data,
        });
        this.clearForm();
      })
      .catch((err) => {
        console.log(err.response);
        const resp =
          err.response.status === 404
            ? "Cannot process your request at this moment."
            : err.response.data;
        this.setState({
          loading: false,
          userFailure: true,
          response: resp,
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.invalidDetails()) {
      this.registerNewUser();
    }
  };

  clearForm = () => {
    let payload = { ...this.state.payload };
    Object.keys(payload).map((key) => {
      payload[key] = "";
    });
    payload["country"] = "United States";
    this.setState({ payload: payload });
  };

  invalidDetails = () => {
    var errors = { ...this.state.errors };
    var payload = { ...this.state.payload };
    if (payload.fName === null || payload.fName === "") {
      errors.fName = "Please enter a valid first name.";
    }
    if (payload.lName === null || payload.lName === "") {
      errors.lName = "Please enter a valid last name.";
    }
    if (payload.email === null || payload.email === "") {
      errors.email = "Please enter a valid email.";
    }
    if (payload.password === null || payload.password === "") {
      errors.password = "Please enter a valid password.";
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
      errors.zip = "Please enter a valid zip code.";
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
    let payload = { ...this.state.payload };
    payload[name] = value;
    this.setState({ payload: payload });

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
      case "password":
        errors.password = this.invalidPassword(value)
          ? "Please enter a valid password."
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
        errors.zip = this.invalidZip(value)
          ? "Please enter a valid zip code."
          : "";
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

  invalidEmail = (email) => {
    var reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !reg.test(email);
  };

  invalidPassword = (password) => {
    var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;
    return !reg.test(password);
  };

  invalidZip = (zip) => {
    var reg = /^\d{5,6}$/;
    return !reg.test(zip);
  };

  showPasswordHandler = () => {
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  toastMessageHandler = (bool) => {
    this.setState({ userCreated: bool, userFailure: bool });
  };
  render() {
    const showPasswordText = this.state.showPassword
      ? "(hide password)"
      : "(show password)";

    const toastHeader = this.state.userFailure
      ? "Failure"
      : this.state.userCreated
      ? "Success"
      : "";

    // const toastBody =
    //   this.state.userFailure
    //   ? "Cannot process your request at this moment."
    //   : this.state.userCreated
    //   ? "New user has been registered."
    //   : "";

    return (
      <Aux>
        <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First Name"
                onChange={this.formChangeHandler}
                name="fName"
                required
                isInvalid={this.state.errors.fName}
                value={this.state.payload.fName}
              />
              <span className="errorMessage">
                {this.state.errors.fName ? this.state.errors.fName : ""}
              </span>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                onChange={this.formChangeHandler}
                name="lName"
                required
                isInvalid={this.state.errors.lName}
                value={this.state.payload.lName}
              />
              <span className="errorMessage">
                {this.state.errors.lName ? this.state.errors.lName : ""}
              </span>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} lg="6" xs="12" controlId="formGridEmail">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-at"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  onChange={this.formChangeHandler}
                  name="email"
                  required
                  isInvalid={this.state.errors.email}
                  value={this.state.payload.email}
                />
              </InputGroup>
              <span className="errorMessage">
                {this.state.errors.email ? this.state.errors.email : ""}
              </span>
            </Form.Group>
            <Form.Group as={Col} lg="6" xs="12" controlId="formGridPassword">
              <Form.Label>
                Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={this.props.location.pathname}>
                  <span
                    className="show-password"
                    onClick={this.showPasswordHandler}
                  >
                    <i>{showPasswordText}</i>
                  </span>
                </Link>
              </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <i className="fas fa-key" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type={this.state.showPassword ? "text" : "password"}
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={this.formChangeHandler}
                  name="password"
                  required
                  isInvalid={this.state.errors.password}
                  value={this.state.payload.password}
                />
              </InputGroup>

              <span className="errorMessage">
                {this.state.errors.password ? this.state.errors.password : ""}
              </span>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              onChange={this.formChangeHandler}
              name="add1"
              required
              isInvalid={this.state.errors.add1}
              value={this.state.payload.add1}
            />
            <span className="errorMessage">
              {this.state.errors.add1 ? this.state.errors.add1 : ""}
            </span>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                onChange={this.formChangeHandler}
                name="add2"
                value={this.state.payload.add2}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="City"
                onChange={this.formChangeHandler}
                name="city"
                required
                isInvalid={this.state.errors.city}
                value={this.state.payload.city}
              />
              <span className="errorMessage">
                {this.state.errors.city ? this.state.errors.city : ""}
              </span>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                placeholder="State"
                onChange={this.formChangeHandler}
                name="state"
                required
                isInvalid={this.state.errors.state}
                value={this.state.payload.state}
              />
              <span className="errorMessage">
                {this.state.errors.state ? this.state.errors.state : ""}
              </span>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                placeholder="12345"
                onChange={this.formChangeHandler}
                name="zip"
                required
                isInvalid={this.state.errors.zip}
                value={this.state.payload.zip}
              />
              <span className="errorMessage">
                {this.state.errors.zip ? this.state.errors.zip : ""}
              </span>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                placeholder="Choose..."
                onChange={this.formChangeHandler}
                name="country"
                required
                isInvalid={this.state.errors.country}
                value={this.state.payload.country}
              >
                <CountryList />
              </Form.Control>
              <span className="errorMessage">
                {this.state.errors.country ? this.state.errors.country : ""}
              </span>
            </Form.Group>
          </Form.Row>
          <div style={{ textAlign: "center" }}>
            <Button className="sign-in-btn" type="submit">
              {this.state.loading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                "Register"
              )}
              {/* <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner> */}
            </Button>
          </div>
        </Form>

        {this.state.userFailure || this.state.userCreated ? (
          <div
            style={{
              position: "absolute",
              top: "1%",
              right: "1%",
              color: `${
                this.state.userCreated
                  ? "#155724"
                  : this.state.userFailure
                  ? "#721c24"
                  : ""
              }`,
            }}
          >
            <Toast
              animation
              autohide
              onClose={() => this.toastMessageHandler(false)}
              delay={3000}
            >
              <Toast.Header
                closeButton={false}
                style={{
                  background: `${
                    this.state.userCreated
                      ? "#d4edda"
                      : this.state.userFailure
                      ? "#f8d7da"
                      : ""
                  }`,
                  borderColor: `${
                    this.state.userCreated
                      ? "#c3e6cb"
                      : this.state.userFailure
                      ? "#721c24"
                      : ""
                  }`,
                  color: `${
                    this.state.userCreated
                      ? "#37BD2C"
                      : this.state.userFailure
                      ? "#e34234"
                      : ""
                  }`,
                }}
              >
                {this.state.userCreated ? (
                  <span
                    style={{
                      color: "37BD2C",
                      marginRight: "3%",
                      marginLeft: "1%",
                    }}
                  >
                    <i class="fas fa-check"></i>
                  </span>
                ) : this.state.userFailure ? (
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
                  ""
                )}

                <strong className="mr-auto">{toastHeader}</strong>
              </Toast.Header>
              <Toast.Body
                style={{
                  background: `${
                    this.state.userCreated
                      ? "#d4edda"
                      : this.state.userFailure
                      ? "#f8d7da"
                      : ""
                  }`,
                  borderColor: `${
                    this.state.userCreated
                      ? "#c3e6cb"
                      : this.state.userFailure
                      ? "#721c24"
                      : ""
                  }`,
                }}
              >
                {this.state.response}
              </Toast.Body>
            </Toast>
          </div>
        ) : (
          ""
        )}
      </Aux>
    );
  }
}

export default User;

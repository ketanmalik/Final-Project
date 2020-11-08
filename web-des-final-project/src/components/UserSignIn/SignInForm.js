import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../../UserInfo/UserInfo";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { aux1 as Aux } from "../../hoc/Aux1/Aux1";
import Toast from "react-bootstrap/Toast";
import "./UserSignIn.css";
import User from "./NewUser";

class SignInForm extends Component {
  state = {
    validated: false,
    email: "",
    password: "",
    errors: {
      email: false,
      password: false,
    },
    error: null,
    showPassword: false,
    loading: false,
    userObj: null,
    response: "",
  };

  handleSubmit = async (event) => {
    let errors = { ...this.state.errors };
    this.setState({ loading: true });
    event.preventDefault();
    let userObj = { ...this.state.userObj };

    await axios
      .get("/login", {
        params: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then((resp) => {
        errors.email = false;
        errors.password = false;
        userObj = resp.data.userObj;
        this.setState({
          loading: false,
          errors: errors,
          userObj: userObj,
          error: null,
          email: "",
          password: "",
          response: "You have been logged in",
        });
        sessionStorage.setItem('user', JSON.stringify(userObj));
        UserInfo.setUserInfoObj(userObj);
        return true;
      })
      .catch((err) => {
        sessionStorage.setItem('user', null);
        errors.email = true;
        errors.password = true;
        userObj = null;
        this.setState({
          loading: false,
          errors: errors,
          userObj: userObj,
          error: err.response,
          response: "Please check username or password",
        });
        UserInfo.setUserInfoObj(null);
        return false;
      });
    if (userObj) {
      const payload = {
        userObj: { ...this.state.userObj },
      };
      sessionStorage.setItem('user', JSON.stringify(payload));
      UserInfo.setUserInfoObj(payload);
      window.location.reload();
    }
  };

  showPasswordHandler = () => {
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  formChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  toastMessageHandler = (bool) => {
    this.setState({ userObj: bool, error: bool });
  };

  render() {
    const showPasswordText = this.state.showPassword
      ? "(hide password)"
      : "(show password)";

    const toastHeader = this.state.error
      ? "Failure"
      : this.state.userObj
      ? "Success"
      : "";

    return (
      <Aux>
        <Form noValidate onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="3" />
            <Form.Group as={Col} md="6" controlId="validationUsername">
              <Form.Label>
                Username
                <p style={{ color: "#737373", fontSize: "12px", marginBottom: "5px" }}>
                  <b>
                    <i>(for demo use: test@test.com)</i>
                  </b>
                </p>
                </Form.Label>
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
                  value={this.state.email}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="3" />
            <Form.Group as={Col} md="6" controlId="validationPassword">
              <Form.Label>
                Password
                <Link to={this.props.location.pathname}>
                  <span
                    className="show-password"
                    onClick={this.showPasswordHandler}
                  >
                    <i>{showPasswordText}</i>
                  </span>
                  <p style={{ color: "#737373", fontSize: "12px", marginBottom: "5px" }}>
                  <b>
                    <i>(for demo use: Test@123)</i>
                  </b>
                </p>
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
                  value={this.state.password}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" className="sign-in-btn">
              {this.state.loading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </Form>
        {this.state.error || this.state.userObj ? (
          <div
            style={{
              position: "absolute",
              top: "1%",
              right: "1%",
              color: `${
                this.state.userObj
                  ? "#155724"
                  : this.state.error
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
                    this.state.userObj
                      ? "#d4edda"
                      : this.state.error
                      ? "#f8d7da"
                      : ""
                  }`,
                  borderColor: `${
                    this.state.userObj
                      ? "#c3e6cb"
                      : this.state.error
                      ? "#721c24"
                      : ""
                  }`,
                  color: `${
                    this.state.userObj
                      ? "#37BD2C"
                      : this.state.error
                      ? "#e34234"
                      : ""
                  }`,
                }}
              >
                {this.state.userObj ? (
                  <span
                    style={{
                      color: "37BD2C",
                      marginRight: "3%",
                      marginLeft: "1%",
                    }}
                  >
                    <i class="fas fa-check"></i>
                  </span>
                ) : this.state.error ? (
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
                    this.state.userObj
                      ? "#d4edda"
                      : this.state.error
                      ? "#f8d7da"
                      : ""
                  }`,
                  borderColor: `${
                    this.state.userObj
                      ? "#c3e6cb"
                      : this.state.error
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

export default SignInForm;

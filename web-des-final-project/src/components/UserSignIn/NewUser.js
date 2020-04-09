import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
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
    },
    error: true,
    validated: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (this.checkPayloadHandler()) {
        console.log("true");
      } else {
        console.log("false");
      }
    }
    this.setState({ validated: true });
  };

  formChangeHandler = (e) => {
    let payload = { ...this.state.payload };
    payload[e.target.name] = e.target.value;
    this.setState({ payload: payload });
  };

  checkPayloadHandler = () => {
    let payload = { ...this.state.payload };
    this.setState({ error: true });

    if (payload["fName"].trim() === null || payload["fName"].trim() === "")
      return false;

    if (payload["lName"].trim() === null || payload["lName"].trim() === "")
      return false;

    if (payload["add1"].trim() === null || payload["add1"].trim() === "")
      return false;

    if (payload["city"].trim() === null || payload["fName"].trim() === "")
      return false;
    const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailReg.test(payload["email"])) return false;

    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/;
    if (!passReg.test(payload["password"])) return false;

    const zipReg = /^\d{5}$/;
    if (!zipReg.test(payload["zip"])) return false;
    if (payload["add2"] === null) {
      payload["add2"] = "";
      this.setState({ payload: payload });
    }
    this.setState({ error: false });
    return true;
  };

  render() {
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First Name"
              onChange={this.formChangeHandler}
              name="fName"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid First Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last Name"
              onChange={this.formChangeHandler}
              name="lName"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter valid Last Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
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
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fas fa-key" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                onChange={this.formChangeHandler}
                name="password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address 1</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            onChange={this.formChangeHandler}
            name="add1"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid Street Name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            onChange={this.formChangeHandler}
            name="add2"
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="City"
              onChange={this.formChangeHandler}
              name="city"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid City Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              placeholder="Choose..."
              onChange={this.formChangeHandler}
              name="state"
              required
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a valid State.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              placeholder="12345"
              onChange={this.formChangeHandler}
              name="zip"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid Zip Code.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Button className="sign-in-btn" type="submit">
          Register
        </Button>
      </Form>
    );
  }
}

export default User;

import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./UserSignIn.css";

class SignInForm extends Component {
  state = {
    validated: false,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  };
  render() {
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Row>
          <Form.Group as={Col} md="3" />
          <Form.Group as={Col} md="6" controlId="validationUsername">
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
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="3" />
          <Form.Group as={Col} md="6" controlId="validationPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fas fa-key" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <div style={{ textAlign: "center" }}>
          <Button type="submit" className="sign-in-btn">
            Sign In
          </Button>
        </div>
      </Form>
    );
  }
}

export default SignInForm;

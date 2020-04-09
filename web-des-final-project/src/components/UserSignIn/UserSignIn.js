import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import SignInForm from "./SignInForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google.png";
import "./UserSignIn.css";

class UserSignIn extends Component {
  //   state = {
  //     validated: false,
  //   };
  //   // const [validated, setValidated] = useState(false);

  //   signInHandler = (event) => {
  //     event.preventDefault();
  //     const form = event.currentTarget;
  //     console.log(form);
  //     if (form.checkValidity() === false) {
  //       event.stopPropagation();
  //     }

  //     //   setValidated(true);
  //   };
  render() {
    return (
      <Aux>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="user-page-heading">
                <img
                  style={{ display: "inline-block" }}
                  src={logo}
                  alt="/logo"
                  width="45px"
                />
                <p>Falcon Aviation</p>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignInForm {...this.props} />
            <div className="separator">
              <span className="separator-text">or</span>
            </div>
            <div
              class="fb-login-button"
              data-width=""
              data-size="large"
              data-button-type="continue_with"
              data-layout="default"
              data-auto-logout-link="false"
              data-use-continue-as="false"
            ></div>
            <img src={google} alt="google" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} id="modal-close-btn">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Aux>
    );
  }
}

export default UserSignIn;

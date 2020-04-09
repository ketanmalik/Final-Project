import React, { Component } from "react";
import { Link } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";
import SignInForm from "./SignInForm";
import NewUser from "./NewUser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google.png";
import FacebookLogin from "react-facebook-login";
// import TiSocialFacebookCircular from '../../../node_modules/react-f' ;
// ("react-icons/lib/ti/social-facebook-circular");
import "./UserSignIn.css";

class UserSignIn extends Component {
  responseFacebook = (response) => {
    console.log(response);
  };

  componentDidMount() {
    console.log("user modal");
  }
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
            {this.props.newUser ? (
              <NewUser {...this.props} />
            ) : (
              <Aux>
                <SignInForm {...this.props} />
                <div className="separator">
                  <span className="separator-text">or</span>
                </div>
                <div className="google-facbook">
                  <img id="google-img" src={google} alt="google" />
                  <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                  />
                </div>
                <div className="separator">
                  <span className="separator-text">or</span>
                </div>
                <Link
                  className="nav-link"
                  to={this.props.location.pathname}
                  onClick={this.props.newUserClicked}
                >
                  Register as <i>new user</i>
                </Link>
              </Aux>
            )}
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

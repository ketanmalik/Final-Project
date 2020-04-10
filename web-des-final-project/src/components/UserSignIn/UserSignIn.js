import React, { Component } from "react";
import { Link } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";
import SignInForm from "./SignInForm";
import NewUser from "./NewUser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/logo.png";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import google from "../../assets/images/google.png";
// import FacebookLogin from "react-facebook-login";
import "./UserSignIn.css";

class UserSignIn extends Component {
  responseFacebook = (response) => {
    console.log("fb", response);
  };

  responseGoogle = (resp) => {
    console.log("google", resp);
  };

  responseFacebook = (resp) => {
    console.log(resp);
  };

  componentDidMount() {
    console.log(window);
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
                <div className="google-facbook" style={{ textAlign: "center" }}>
                  <GoogleLogin
                    clientId="1038547540392-tfs3qj7b7qnlj7cqhm6o97k27tq7lvl4.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        className="google-btn"
                      >
                        <i class="fab fa-google"></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;Login with Google
                      </button>
                    )}
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <FacebookLogin
                    appId="549713162345863"
                    callback={this.responseFacebook}
                    fields="name,email,picture"
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick} className="fb-btn">
                        <i class="fab fa-facebook-f"></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;Login with Facebook
                      </button>
                    )}
                  />
                </div>
                <div className="separator">
                  <span className="separator-text">or</span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Link
                    className="nav-link"
                    to={this.props.location.pathname}
                    onClick={this.props.newUserClicked}
                  >
                    Register as <i>new user</i>
                  </Link>
                </div>
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

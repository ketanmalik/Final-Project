import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Aux from "../../hoc/Aux/Aux";
import SignInForm from "./SignInForm";
import NewUser from "./NewUser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/logo.png";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Spinner from "react-bootstrap/Spinner";
import "./UserSignIn.css";

class UserSignIn extends Component {
  state = {
    gLoading: false,
    fLoading: false,
    isLoggedIn: false,
    userCreated: false,
    userFailure: false,
    userObj: null,
  };

  userAlreadyPresent = async (email, userId, mode) => {
    let feedback = false;
    await axios
      .get("/login", {
        params: {
          email: email,
          socialId: userId,
          mode: mode,
        },
      })
      .then((resp) => {
        console.log("hi", resp);
        const userObj = resp.data.userObj;
        feedback = true;
        this.setState({ userObj: userObj, isLoggedIn: true });
        return true;
      })
      .catch((err) => {
        console.log("userAlreadyPresent err", err.response);
        this.setState({ userObj: null, isLoggedIn: false });
      });
    return feedback;
  };

  registerNewUser = async (fName, lName, email, userId) => {
    let feedback = false;

    const payload = {
      fName: fName,
      lName: lName,
      email: email,
      password: null,
      add1: null,
      add2: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      socialId: userId,
    };
    await axios({
      url: "/register",
      method: "POST",
      data: payload,
    })
      .then((resp) => {
        console.log(resp);
        const userObj = resp.data.userObj;
        this.setState({ userObj: userObj, isLoggedIn: true });
        feedback = true;
        return true;
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ userObj: null, isLoggedIn: false });
        return false;
      });
    return feedback;
  };

  responseFacebook = async (resp) => {
    this.setState({ fLoading: true, isLoggedIn: false });

    if (!resp.name || !resp.email || !resp.userID) {
      this.setState({ fLoading: false, isLoggedIn: false });
    } else {
      const fName = resp.name.split(" ")[0];
      const lName = resp.name.split(" ")[1];
      const email = resp.email;
      const userId = resp.userID;

      let feedback = await this.userAlreadyPresent(email, userId, "social");
      console.log("fb ", feedback);

      if (!feedback) {
        feedback = await this.registerNewUser(fName, lName, email, userId);
        if (!feedback) {
          this.setState({ fLoading: false, isLoggedIn: false });
        } else {
          this.setState({ fLoading: false, isLoggedIn: true });
        }
      } else {
        this.setState({ fLoading: false, isLoggedIn: true });
      }
    }
    console.log("fb ", this.state.userObj);
  };

  responseGoogle = async (resp) => {
    this.setState({ gLoading: true, isLoggedIn: false });

    if (resp.error || resp.details) {
      console.log("google error");
      this.setState({ gLoading: false, isLoggedIn: false });
    } else {
      const { googleId, email, givenName, familyName } = resp.profileObj;

      let feedback = await this.userAlreadyPresent(email, googleId, "social");
      if (!feedback) {
        feedback = await this.registerNewUser(
          givenName,
          familyName,
          email,
          googleId
        );
        if (!feedback) {
          this.setState({ gLoading: false, isLoggedIn: false });
        } else {
          this.setState({ gLoading: false, isLoggedIn: true });
        }
      } else {
        this.setState({ gLoading: false, isLoggedIn: true });
      }
    }
    console.log("go ", this.state.userObj);
  };

  componentDidMount() {}
  componentWillUnmount() {
    console.log("unmount");
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
                        {this.state.gLoading ? (
                          <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        ) : (
                          <Aux>
                            <i class="fab fa-google"></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;Login with Google
                          </Aux>
                        )}
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

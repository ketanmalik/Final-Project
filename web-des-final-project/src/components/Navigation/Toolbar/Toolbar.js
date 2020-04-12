import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserInfo from "../../../UserInfo/UserInfo";
import NavLink from "./NavLink";
import NavLinkDropdown from "./NavLinkDropdown";
import DashboardDropwdown from "./DashboardDropwdown";
import UserSignIn from "../../UserSignIn/UserSignIn";
import logo from "../../../assets/images/logo.png";
import test from "../../../assets/images/test.png";
import Spinner from "react-bootstrap/Spinner";
import "./Toolbar.css";

class toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { path: "/parts", content: "parts", isActive: false },
        { path: "/parts/featured", content: "parts", isActive: false },
        { path: "/parts/inventory", content: "parts", isActive: false },
        { path: "/parts/sell", content: "parts", isActive: false },
        { path: "/lease", content: "Lease", isActive: false },
        { path: "/about", content: "About", isActive: false },
        { path: "/contactus", content: "Contact Us", isActive: false },
        { path: "/user", content: "User", isActive: false },
        { path: "/dashboard", contetn: "User Dashboard", isActive: false },
        { path: "/user/signout", contetn: "User Sign Out", isActive: false },
      ],
      loggedIn: false,
      showModal: false,
      newUser: false,
      userObj: null,
      userName: "",
      safeToProceed: false,
    };
  }

  async componentDidMount() {
    this.setActiveLink();
    await this.getActiveUserInfo();
    this.setState({ safeToProceed: true });
  }

  getActiveUserInfo = async () => {
    await axios
      .get("/getsaveuser")
      .then((resp) => {
        const obj = resp.data.userObj;
        if (!obj.fName) {
          this.setState({ userObj: null, loggedIn: false, userName: "" });
          UserInfo.setUserInfoObj(null);
        } else {
          const name = obj.fName + " " + obj.lName;
          this.setState({
            userObj: obj,
            loggedIn: true,
            userName: name,
          });
          UserInfo.setUserInfoObj(obj);
        }
        return true;
      })
      .catch((err) => {
        this.setState({ userObj: null, loggedIn: false, userName: "" });
        UserInfo.setUserInfoObj(null);
        return false;
      });
  };

  newUserRegisterHandler = () => {
    this.setState({ newUser: true });
  };

  setActiveLink = () => {
    const links = [...this.state.links];
    const path = window.location.href.split("/");
    switch (path[path.length - 1]) {
      case "featured":
        links[0].isActive = true;
        links[1].isActive = true;
        break;
      case "inventory":
        links[0].isActive = true;
        links[2].isActive = true;
        break;
      case "sell":
        links[0].isActive = true;
        links[3].isActive = true;
        break;
      case "lease":
        links[4].isActive = true;
        break;
      case "about":
        links[5].isActive = true;
        break;
      case "contactus":
        links[6].isActive = true;
        break;
      case "dashboard":
        links[7].isActive = true;
        links[8].isActive = true;
      default:
        break;
    }
    this.setState({ links: links });
  };

  navLinkHandler = (i) => {
    const links = this.state.links.slice();
    links[0].isActive = false;
    links[1].isActive = false;
    links[2].isActive = false;
    links[3].isActive = false;
    links[7].isActive = false;
    links[8].isActive = false;
    links[9].isActive = false;
    for (var j = 4; j < 7; j++) {
      links[j].isActive = i + 4 == j;
    }
    this.setState({ links: links });
  };

  navLinkDropdownHandler = (i) => {
    const links = this.state.links.slice();
    this.navLinkHandler(-1);
    links[7].isActive = false;
    links[8].isActive = false;
    links[9].isActive = false;
    links[0].isActive = true;
    for (var j = 1; j < 4; j++) {
      links[j].isActive = i == j;
    }
    this.setState({ links: links });
  };

  dashboardHandler = (i) => {
    const links = this.state.links.slice();
    this.navLinkHandler(-1);
    links[7].isActive = true;
    links[8].isActive = true;
    links[9].isActive = false;
    this.setState({ links: links });
  };

  signOutHandler = (i) => {
    const links = this.state.links.slice();
    this.navLinkHandler(-1);
    links[7].isActive = true;
    links[8].isActive = false;
    links[9].isActive = true;
    this.setState({ links: links });
    axios({
      url: "/updatesaveuser",
      method: "PUT",
      data: { userObj: "null" },
    })
      .then(() => {
        UserInfo.setUserInfoObj(null);
        window.location.reload();
      })
      .catch();
  };

  homeButtonHandler = () => {
    const links = this.state.links.slice();
    for (const j in links) {
      links[j].isActive = false;
    }
    this.setState({ links: links });
  };

  userHandler = () => {
    const links = this.state.links.slice();
    links[7].isActive = true;
    this.setState({ links: links });
    this.signinHandler(true);
  };

  signinHandler = (bool) => {
    this.setState({ showModal: bool });
    setTimeout(() => {
      this.setState({ newUser: false });
    }, 10);
    if (!bool) {
      const links = this.state.links.slice();
      links[7].isActive = false;
      this.setState({ links: links });
    }
  };

  render() {
    let navLinks = null;
    let topLinks = [...this.state.links].slice(4, 7);
    navLinks = topLinks.map((link, i) => (
      <NavLink
        path={link.path}
        content={link.content}
        isActive={link.isActive}
        key={link.path}
        onClick={() => this.navLinkHandler(i)}
      />
    ));
    return this.state.safeToProceed ? (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-dark fixed-top"
          style={{ backgroundColor: "#581845" }}
        >
          <Link
            className="navbar-brand"
            to="/"
            onClick={this.homeButtonHandler}
          >
            <img src={logo} alt="/logo" width="45px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <NavLinkDropdown
                path="/"
                title="Products"
                isActive={this.state.links[0].isActive}
                clicked={this.navLinkDropdownHandler}
                item1={this.state.links[1].isActive}
                item2={this.state.links[2].isActive}
                item3={this.state.links[3].isActive}
              />
              {navLinks}
            </ul>
            <ul className="navbar-nav ml-auto">
              {this.state.loggedIn ? (
                <DashboardDropwdown
                  path={this.props.location.pathname}
                  title={this.state.userName}
                  isActive={this.state.links[7].isActive}
                  dbclicked={this.dashboardHandler}
                  dbpath={this.state.links[8].path}
                  soclicked={this.signOutHandler}
                  item1={this.state.links[8].isActive}
                  item2={this.state.links[9].isActive}
                />
              ) : (
                <li
                  className={
                    "nav-item " + (this.state.links[7].isActive ? "active" : "")
                  }
                >
                  <Link
                    className="nav-link"
                    to={this.props.location.pathname}
                    onClick={this.userHandler}
                  >
                    <svg
                      className="bi bi-people-circle"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                      <path
                        fillRule="evenodd"
                        d="M8 9a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="signin-text">Sign In / Register</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <UserSignIn
          {...this.props}
          show={this.state.showModal}
          onHide={() => this.signinHandler(false)}
          newUser={this.state.newUser}
          newUserClicked={this.newUserRegisterHandler}
        />
      </div>
    ) : (
      <div style={{ marginLeft: "50%", marginTop: "30%", color: "#581845" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default toolbar;

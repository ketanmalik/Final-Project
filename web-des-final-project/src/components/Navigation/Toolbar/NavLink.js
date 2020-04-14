import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavLink.scss";

class NavLink extends Component {
  contactUs = () => {
    const anchor = document.querySelector("#contact-us");
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  render() {
    return (
      <li className={"nav-item " + (this.props.isActive ? "active" : "")}>
        <Link
          className="nav-link"
          to={
            this.props.path === "/contactus"
              ? window.location.pathname
              : this.props.path
          }
          onClick={
            this.props.path === "/contactus"
              ? this.contactUs
              : () => this.props.onClick()
          }
        >
          {this.props.content}
        </Link>
      </li>
    );
  }
}

export default NavLink;

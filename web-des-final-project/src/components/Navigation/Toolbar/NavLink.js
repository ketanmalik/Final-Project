import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavLink.scss";

class NavLink extends Component {
  render() {
    return (
      <li className={"nav-item " + (this.props.isActive ? "active" : "")}>
        <Link
          className="nav-link"
          to={this.props.path}
          onClick={() => this.props.onClick()}
        >
          {this.props.content}
        </Link>
      </li>
    );
  }
}

export default NavLink;

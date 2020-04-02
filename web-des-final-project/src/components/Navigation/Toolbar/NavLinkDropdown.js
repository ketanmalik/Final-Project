import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavLinkDropdown extends Component {
  render() {
    return (
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to={this.props.path}
          id="navbardrop"
          data-toggle="dropdown"
        >
          {this.props.title}
        </Link>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="#section41">
            Featured Parts
          </Link>
          <Link className="dropdown-item" to="#section42">
            View Inventory
          </Link>
          <Link className="dropdown-item" to="#section42">
            Sell Parts
          </Link>
        </div>
      </li>
    );
  }
}

export default NavLinkDropdown;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavLinkDropdown extends Component {
  render() {
    const featuredParts = () => {
      this.props.clicked(1);
      if (document.querySelector("#featuredParts")) {
        const anchor = document.querySelector("#featuredParts");
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    return (
      <li
        className={
          "nav-item " + (this.props.isActive ? "active dropdown" : "dropdown")
        }
      >
        <Link
          className="nav-link dropdown-toggle"
          to={this.props.path}
          id="navbardrop"
          data-toggle="dropdown"
        >
          {this.props.title}
        </Link>
        <div className="dropdown-menu">
          <Link
            className={"dropdown-item" + (this.props.item1 ? " active" : "")}
            to="/parts/featured"
            onClick={featuredParts}
          >
            Featured Parts
          </Link>
          <Link
            className={"dropdown-item" + (this.props.item2 ? " active" : "")}
            to="/parts/inventory"
            onClick={() => this.props.clicked(2)}
          >
            View Inventory
          </Link>
          <Link
            className={"dropdown-item" + (this.props.item3 ? " active" : "")}
            to={window.location.pathname}
            onClick={() => this.props.clicked(3)}
          >
            Sell Parts
          </Link>
        </div>
      </li>
    );
  }
}

export default NavLinkDropdown;

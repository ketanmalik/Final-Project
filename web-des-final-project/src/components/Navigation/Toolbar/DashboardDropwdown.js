import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserInfo from "../../../UserInfo/UserInfo";
import { aux1 as Aux } from "../../../hoc/Aux1/Aux1";

class DashboardDropdown extends Component {
  render() {
    return (
      <Aux>
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
            <span className="signin-text">{this.props.title}</span>
          </Link>
          <div className="dropdown-menu">
            <Link
              className={"dropdown-item" + (this.props.item1 ? " active" : "")}
              to={this.props.dbpath}
              onClick={() => this.props.dbclicked(8)}
            >
              Dashboard
            </Link>
            <Link
              className={"dropdown-item" + (this.props.item2 ? " active" : "")}
              to={this.props.path}
              onClick={() => this.props.soclicked(9)}
            >
              Sign Out
            </Link>
          </div>
        </li>
      </Aux>
    );
  }
}

export default DashboardDropdown;

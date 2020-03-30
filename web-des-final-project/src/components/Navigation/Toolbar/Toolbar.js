import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import "./Toolbar.css";
import NavLinkDropdown from "./NavLinkDropdown";

class toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { path: "/clients", content: "Clients", isActive: false },
        { path: "/aboutus", content: "About Us", isActive: false },
        { path: "/contactus", content: "Contact Us", isActive: false }
      ]
    };
  }

  componentDidMount() {
    this.setActiveLink();
  }

  setActiveLink = () => {
    const links = [...this.state.links];
    const path = window.location.href.split("/");
    console.log(links);
    switch (path[path.length - 1]) {
      case "clients":
        links[0].isActive = true;
        break;
      case "aboutus":
        links[1].isActive = true;
        break;
      case "contactus":
        links[2].isActive = true;
        break;
      default:
        break;
    }
    this.setState({ links: links });
  };

  navLinkHandler = i => {
    const links = this.state.links.slice();
    for (const j in links) {
      console.log("click", links[j], i, j, i == j);
      links[j].isActive = i == j;
    }
    this.setState({ links: links });
  };

  homeButtonHandler = () => {
    const links = this.state.links.slice();
    for (const j in links) {
      links[j].isActive = false;
    }
    this.setState({ links: links });
  };

  render() {
    let navLinks = null;
    navLinks = this.state.links.map((link, i) => (
      <NavLink
        path={link.path}
        content={link.content}
        isActive={link.isActive}
        key={link.path}
        onClick={() => this.navLinkHandler(i)}
      />
    ));
    return (
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
            Logo
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
              <NavLinkDropdown path="/" title="Products" />
              {navLinks}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default toolbar;

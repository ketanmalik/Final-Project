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
        { path: "/parts", content: "parts", isActive: false },
        { path: "/parts/featured", content: "parts", isActive: false },
        { path: "/parts/inventory", content: "parts", isActive: false },
        { path: "/parts/sell", content: "parts", isActive: false },
        { path: "/lease", content: "Lease", isActive: false },
        { path: "/about", content: "About", isActive: false },
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
      default:
        break;
    }
    this.setState({ links: links });
  };

  navLinkHandler = i => {
    const links = this.state.links.slice();
    links[0].isActive = false;
    links[1].isActive = false;
    links[2].isActive = false;
    links[3].isActive = false;
    console.log(links);
    for (var j = 4; j < 7; j++) {
      links[j].isActive = i + 4 == j;
    }
    this.setState({ links: links });
  };

  navLinkDropdownHandler = i => {
    this.navLinkHandler(5);
    const links = this.state.links.slice();
    links[0].isActive = true;
    for (var j = 1; j < 4; j++) {
      links[j].isActive = i == j;
    }
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
          </div>
        </nav>
      </div>
    );
  }
}

export default toolbar;

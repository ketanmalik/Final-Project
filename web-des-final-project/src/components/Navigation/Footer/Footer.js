import React from "react";
import { Link } from "react-router-dom";

const footer = props => {
  return (
    <footer
      className="footer fixed-bottom"
      style={{ backgroundColor: "#581845", color: "white" }}
    >
      <div className="row" style={{ padding: "30px 0px 0px 30px" }}>
        <div className="col-6 col-md">
          <h5>Contact Us</h5>
          <ul className="list-unstyled text-small">
            <li>Item-1</li>
            <li>Item-1</li>
            <li>Item-1</li>
            <li>Item-1</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Heading-1</h5>
          <ul className="list-unstyled text-small">
            <li>Item-1</li>
            <li>Item-1</li>
            <li>Item-1</li>
            <li>Item-1</li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Heading-1</h5>
          <ul className="list-unstyled text-small">
            <li>Item-1</li>
            <li>Item-1</li>
            <li>Item-1</li>
            <li>Item-1</li>
          </ul>
        </div>
      </div>
      <div
        className="row"
        style={{ textAlign: "center", padding: "25px 0px 0px 0px" }}
      >
        <div className="col-12 col-md">
          Logo - &copy;&nbsp;&nbsp;{new Date().getFullYear()}
          <ul class="list-unstyled list-inline text-center">
            <li class="list-inline-item">
              <Link className="btn-floating btn-fb mx-1">
                <i className="fab fa-facebook-f"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link className="btn-floating btn-tw mx-1">
                <i className="fab fa-twitter"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link className="btn-floating btn-gplus mx-1">
                <i className="fab fa-google-plus-g"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link className="btn-floating btn-li mx-1">
                <i className="fab fa-linkedin-in"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link className="btn-floating btn-dribbble mx-1">
                <i className="fab fa-dribbble"> </i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default footer;

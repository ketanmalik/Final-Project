import React from "react";
import { Link } from "react-router-dom";
import asaLogo from "../../../assets/images/asa-logo.png";
// import logo from "../../../assets/images/logo_size.jpg";
import "./Footer.scss";

const footer = (props) => {
  return (
    <footer
      className="page-footer font-small"
      style={{ backgroundColor: "#581845", color: "#fcfcfc" }}
    >
      <div
        className="row"
        id="custom-row"
        // style={{ backgroundColor: "#581845", padding: "30px 0px 0px 30px" }}
      >
        <div className="col-6 col-md-3">
          <h4 className="font-weight-bold text-uppercase mb-4">Contact Us</h4>
          <ul className="list-unstyled text-small">
            <li>
              <p>
                <i className="fas fa-home mr-3"></i> New York, NY 10012, US
              </p>
            </li>
            <li>
              <p>
                <i className="fas fa-envelope mr-3"></i> info@example.com
              </p>
            </li>
            <li>
              <p>
                <i className="fas fa-phone mr-3"></i> + 01 234 567 88
              </p>
            </li>
            <li>
              <p>
                <i className="fas fa-print mr-3"></i> + 01 234 567 89
              </p>
            </li>
          </ul>
        </div>

        {/* <hr class="clearfix w-100 d-md-none" /> */}

        <div className="col-6 col-md-3">
          <h4 className="font-weight-bold text-uppercase mb-4">
            Certifications
          </h4>
          <ul className="list-unstyled text-small">
            <li>
              <p>
                <a
                  style={{ textDecoration: "none", color: "#fcfcfc" }}
                  href="#"
                >
                  ASA Certificate
                  <img src={asaLogo} height="100px" alt="ASA Logo" />
                </a>
              </p>
            </li>
          </ul>
        </div>

        {/* <hr class="clearfix w-100 d-md-none" /> */}

        <div className="col-6 col-md-3">
          <h4 className="font-weight-bold text-uppercase mb-4">
            Terms & Conditions
          </h4>
          <ul className="list-unstyled text-small">
            <li>
              <p>
                <a
                  style={{ textDecoration: "none", color: "#fcfcfc" }}
                  href="#"
                >
                  Purchase Order Terms and Conditions
                </a>
              </p>
            </li>
            <li>
              <p>
                <a
                  style={{ textDecoration: "none", color: "#fcfcfc" }}
                  href="#"
                >
                  Standard Commercial Terms & Conditions of Sale
                </a>
              </p>
            </li>
          </ul>
        </div>

        {/* <hr class="clearfix w-100 d-md-none" /> */}

        <div className="col-6 col-md-3">
          <h4 className="font-weight-bold text-uppercase mb-4">Connect</h4>
          <ul className="list-unstyled">
            <li className="list-inline-item">
              <Link to="" className="btn-floating btn-fb mx-1">
                <i className="fab fa-facebook-f"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="" className="btn-floating btn-tw mx-1">
                <i className="fab fa-twitter"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="" className="btn-floating btn-gplus mx-1">
                <i className="fab fa-google-plus-g"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="" className="btn-floating btn-li mx-1">
                <i className="fab fa-linkedin-in"> </i>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="" className="btn-floating btn-dribbble mx-1">
                <i className="fab fa-dribbble"> </i>
              </Link>
            </li>
          </ul>
          {/* <img src={logo} alt="logo" /> */}
        </div>
      </div>
      <div
        className="row"
        style={{
          textAlign: "center",
          padding: "25px 0px 15px 0px",
          backgroundColor: "#300D26",
        }}
      >
        <div className="col-12 col-md">
          &copy;&nbsp;Copyright Company Name - {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default footer;

import React from "react";
import { Link } from "react-router-dom";
import asaLogo from "../../../assets/images/asa-logo.png";

const footer = props => {
  return (
    <div>
      <footer
        className="page-footer font-small fixed-bottom"
        style={{ backgroundColor: "#581845", color: "white" }}
      >
        <div className="row" style={{ padding: "30px 0px 0px 30px" }}>
          <div className="col-6 col-md-3">
            <h6 className="font-weight-bold text-uppercase mb-4">Contact Us</h6>
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
            <h5 className="font-weight-bold text-uppercase mb-4">
              Certifications
            </h5>
            <ul className="list-unstyled text-small">
              <li>
                <p>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href="#"
                  >
                    ASA Certificate
                    <img src={asaLogo} height="100px" />
                  </a>
                </p>
              </li>
            </ul>
          </div>

          {/* <hr class="clearfix w-100 d-md-none" /> */}

          <div className="col-6 col-md-3">
            <h5 className="font-weight-bold text-uppercase mb-4">
              Terms & Conditions
            </h5>
            <ul className="list-unstyled text-small">
              <li>
                <p>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href="#"
                  >
                    Purchase Order Terms and Conditions
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
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
            <h5 className="font-weight-bold text-uppercase mb-4">Connect</h5>
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
            <h3>LOGO IMAGE</h3>
          </div>
        </div>
        <div
          className="row"
          style={{
            textAlign: "center",
            padding: "25px 0px 15px 0px",
            backgroundColor: "#300D26"
          }}
        >
          <div className="col-12 col-md">
            &copy;&nbsp;Copyright Company Name - {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;

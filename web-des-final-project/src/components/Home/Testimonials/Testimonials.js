import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import img1 from "../../../assets/images/testimonials1.png";
import img2 from "../../../assets/images/testimonials.png";
import img3 from "../../../assets/images/testimonials3.png";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Testimonials.css";

const testimonials = (props) => {
  return (
    <div className="testinonials-wrapper">
      <h2>Testimonials</h2>

      <Jumbotron>
        <Row>
          <Col>
            <span className="testimonial-img">
              <img src={img1} alt="Testimonial 1" />
            </span>
            <h2>Bob McConell</h2>
            <h6>
              <i>Executive Vice President, Aircraft Maintenance</i>
            </h6>
            <p className="testimonial-desciption">
              <i>
                "Company Name is a quality oriented company. We are fortunate to
                have suppliers like Company Name. Quality is ingrained in all
                the team members. We like the technical expertise and your
                commitment to safety, on-time delivery and customer service."
              </i>
            </p>
          </Col>
          <Col>
            <span className="testimonial-img">
              <img src={img2} alt="Testimonial 1" />
            </span>
            <h2>Joseph Brown</h2>
            <h6>
              <i>Senior General Manager, Supply Chain & Logistics</i>
            </h6>
            <p className="testimonial-desciption">
              <i>
                "The company's team helps us effectively manage not only parts
                procurement and logistics but also vendor agreements to
                streamline tasks, such as timely core exchanges, that ultimately
                impact our bottom line and level of service to our clients."
              </i>
            </p>
          </Col>
          <Col>
            <span className="testimonial-img">
              <img src={img3} alt="Testimonial 1" />
            </span>
            <h2>Beck O'Corner</h2>
            <h6>
              <i>Chief Technical Engineer, Maintenance & Security</i>
            </h6>
            <p className="testimonial-desciption">
              <i>
                "Working with Company Name was a pleasure. The level of quality,
                fairness, & technical expertise they brought was critical to a
                smooth and successful procurement process. We look forward to
                participating in future sourcing events with them."
              </i>
            </p>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default testimonials;

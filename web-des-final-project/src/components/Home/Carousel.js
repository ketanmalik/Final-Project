import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../assets/images/carousel1.jpg";
import img2 from "../../assets/images/carousel2.jpg";
import img3 from "../../assets/images/carousel3.jpg";
import "./Carousel.css";

const carousel = (props) => {
  return (
    <Carousel fade="true" interval="2500" height="100px">
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First slide" />
        <Carousel.Caption>
          <h1>Parts</h1>
          <p>Discover an extensive inventory of aircraft parts and APUs</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img2} alt="Third slide" />
        <Carousel.Caption>
          <h1>Reliable Team</h1>
          <p>
            We take pride in our commitment to safe and professional service by
            experienced engineers
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="Second slide" />
        <Carousel.Caption>
          <h1>Leasing</h1>
          <p>
            Aircraft Engines and APUs ready to support your engine leasing and
            rental needs
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default carousel;

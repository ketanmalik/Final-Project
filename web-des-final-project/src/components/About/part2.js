import React from "react";
import img1 from "../../assets/images/partsSupplyChain.jpeg";
import img2 from "../../assets/images/pricingKnowledge.jpeg";
import img3 from "../../assets/images/partsProcurement.png";
import img4 from "../../assets/images/technicalSupport.jpeg";
import Figure from "react-bootstrap/Figure";
import FigureCaption from "react-bootstrap/FigureCaption";
import FigureImage from "react-bootstrap/FigureImage";
import "./About.css";

export const part2 = (props) => {
  console.log("about", props);
  return (
    <div className="figure-wrapper">
      <div className="figure-div">
        <Figure id="featured-product-card">
          <FigureImage width={600} height={600} alt="171x180" src={img1} />
          <FigureCaption>
            <h5 className="figure-title">Parts Procurement</h5>
            <div className="figure-body">
              <p>Engine & airframe teardown inventory </p>
              <p>Qualified vendor network</p>
              <p>Aircraft asset lease portfolio</p>
            </div>
          </FigureCaption>
        </Figure>

        <Figure id="featured-product-card">
          <FigureImage width={700} height={700} alt="171x180" src={img2} />
          <FigureCaption>
            <h5 className="figure-title">Pricing Knowledge</h5>
            <div className="figure-body">
              <p>Driving down parts acquisition cost</p>
              <p>Delivering significant cost savings</p>
            </div>
          </FigureCaption>
        </Figure>

        <Figure id="featured-product-card">
          <FigureImage alt="171x180" src={img3} width={700} height={700} />
          <FigureCaption>
            <h5 className="figure-title">Parts Supply Chain</h5>
            <br></br>
            <div className="figure-body">
              <p>Parts procurement solutions</p>
              <p>Supply chain processes</p>
              <p>Customs & freight management</p>
            </div>
          </FigureCaption>
        </Figure>

        <Figure id="featured-product-card">
          <FigureImage alt="171x180" src={img4} width={700} height={700} />
          <FigureCaption>
            <h5 className="figure-title">24/7 Technical Support</h5>
            <div className="figure-body">
              <p>Extensive aircraft parts knowledge</p>
              <p>Technical expertise troubleshooting</p>
            </div>
          </FigureCaption>
        </Figure>
      </div>{" "}
    </div>
  );
};

export default part2;

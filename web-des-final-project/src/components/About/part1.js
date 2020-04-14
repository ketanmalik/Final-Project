import React from "react";
import Card from "react-bootstrap/Card";
import img1 from "../../assets/images/partsProcurement.png";
import img2 from "../../assets/images/pricingKnowledge.png";
import img3 from "../../assets/images/partsSupplyChain.png";
import "./About.css";

export const part1 = (props) => {
  console.log("about", props);
  return (
    <div className="wrapper">
      <div className="bg" />
      <div className="aboutdesc-left-wrapper">
        <h1>Falcon Aviation</h1>
        <h2>
          <i>A JSSI Company</i>
        </h2>
        <p id="aboutdescription-paragraph">
          <span>
            <strong>Falcon Aviation</strong>
          </span>{" "}
          is backed by the buying power and expertise of Jet Support Services,
          Inc. (JSSI). For more than 30 years, JSSI has been the leading
          independent provider of aircraft maintenance support and financial
          services to the aviation industry and is one of the largest purchasers
          of aircraft parts and maintenance services in the business.
        </p>
        <p id="aboutdescription-paragraph">
          We stock inventory and provide parts to support the day-to-day
          operational requirements for hundreds of customers, including JSSI.
        </p>

        <h2>Aircraft Parts and Engine Leasing Services</h2>
        <p id="aboutdescription-paragraph">
          We deliver aircraft parts, lease engines and APUs, and create supply
          chain processes to streamline the procurement and management of parts
          across entire fleets of business jets, helicopters and regional
          airlines.
        </p>
        <p>
          Our knowledgeable team not only oversees parts procurement and
          logistics but also routinely manages vendor agreements to better
          streamline important tasks, such as timely core exchanges.
        </p>
        <h2>Discover the Benefits of Global Buying Power</h2>
        <p id="aboutdescription-paragraph">
          The extensive pricing knowledge and global buying power we bring to
          market drives down acquisition cost, ultimately securing significant
          savings for clients. With our qualified global vendor network,
          international team of experts.
        </p>
        <h2>Services include:</h2>
        <ul>
          <li>Engine and APU leasing</li>
          <li>Inventory featuring 20,000+ stock lines</li>
          <li>Parts procurement</li>
          <li>Supply chain processes</li>
          <li>Logistics support</li>
          <li>Billing support</li>
          <li>Technical support</li>
        </ul>
        <br></br>
      </div>

      <div className="aboutdesc-right-wrapper">
        <Card
          style={{
            width: "18rem",
            backgroundColor: "transparent",
            border: "none",
            textAlign: "center",
          }}
        >
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title>Parts Procurement</Card.Title>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "18rem",
            backgroundColor: "transparent",
            border: "none",
            textAlign: "center",
          }}
        >
          <Card.Img variant="top" src={img2} />
          <Card.Body>
            <Card.Title>Pricing Knowledge</Card.Title>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "18rem",
            backgroundColor: "transparent",
            border: "none",
            textAlign: "center",
          }}
        >
          <Card.Img variant="top" src={img3} />
          <Card.Body>
            <Card.Title>Parts Supply Chain</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default part1;

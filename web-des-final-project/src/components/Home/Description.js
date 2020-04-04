import React from "react";
import { cards as Cards } from "./Cards";
import "./Description.css";

export const description = props => {
  const cards = [
    {
      heading: "Distribution & Logistics",
      text: "We have the ability to provide domestic and international delivery"
    },
    {
      heading: "Safety",
      text:
        "We are PMA certified manufacturers and offer nothing less than the highest quality parts and consumables in the market"
    },
    {
      heading: "Level of Service",
      text:
        "We operate multiple warehouse locations with our logistics centers for reliable and quick delivery of your parts"
    }
  ];

  let cardLayout = null;
  cardLayout = cards.map((key, i) => {
    return <Cards heading={key.heading} text={key.text} key={i} />;
  });
  return (
    <div className="description">
      <div className="desc-left-wrapper">
        <h2>Your Premier Provider of Aircraft</h2>
        <h2>Parts and Engine Leasing Services</h2>
        <p id="description-paragraph">
          From a single bolt to a complete engine, we offer an extensive
          inventory of aircraft parts, engines and APUs across multiple makes
          and models of commercial and business jets, turboprops and
          helicopters. With our qualified engineers, we can source assets for
          anything that flies. We also buy old parts from global vendors and
          certified retailers. Come to us for buying, selling or <i>leasing</i>{" "}
          aircraft parts.
        </p>
        <ul>
          <li>Jet engine & turboprop parts</li>
          <li>Helicopter parts</li>
          <li>Airframe parts</li>
          <li>APU parts</li>
        </ul>
        <p style={{ color: "#555", fontWeight: "900" }}>
          If we don’t have the required part in our inventory, we’ll find it.
        </p>
      </div>
      <div className="desc-right-wrapper">{cardLayout}</div>
    </div>
  );
};

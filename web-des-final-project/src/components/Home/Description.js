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
        <h2>Parts for Business and Commercial </h2>
        <h2>Jets, Turboprops & Helicopters</h2>
        <p>
          In today's Aviation Industry, locating the parts you need and having a
          vendor deliver them on time is key, along with finding someone who can
          secure you a better price than most vendors. The staff at Buy Aircraft
          Parts is focused on Sustainment and Modernization projects
          domestically and internationally
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

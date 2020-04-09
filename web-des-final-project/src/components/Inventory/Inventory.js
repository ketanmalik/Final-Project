import React from "react";
import InvTable from "./InvTable/InvTable";
import img1 from "../../assets/images/inventory1.jpg";
import img2 from "../../assets/images/inventory2.jpg";
import img3 from "../../assets/images/inventory3.jpg";
import img4 from "../../assets/images/inventory4.jpg";
import img5 from "../../assets/images/inventory5.jpg";
import img6 from "../../assets/images/inventory6.jpg";
import img7 from "../../assets/images/inventory7.jpg";

import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import "./Inventory.css";

const inventoryImages = [
  { src: img1, text: "Engine Parts" },
  { src: img2, text: "Electric Pads" },
  { src: img3, text: "Brake Pads" },
  { src: img4, text: "Wheel Base" },
  { src: img5, text: "APU Frames" },
  { src: img6, text: "Joint Bearings" },
  { src: img7, text: "Turboprop Parts" },
];

const Inventory = (props) => {
  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)",
    opacity: 1,
  }));

  const bind = useScroll((event) => {
    set({
      transform: `perspective(700px)rotateY(${
        event.scrolling ? event.delta[0] : 0
      }deg)`,
      opacity: event.scrolling ? 0.8 : 1,
    });
  });

  return (
    <div className="inv-wrapper">
      <h2 id="inv-p">Our Inventory Offers</h2>
      <div className="inv-cd-wrapper" {...bind()}>
        {inventoryImages.map((key, i) => {
          return (
            <animated.div
              key={i}
              className="inv-cd"
              style={{ ...style, backgroundImage: `url(${key.src})` }}
            >
              <div id="inv-cd-img">
                <p id="inv-cd-p">{key.text}</p>
              </div>
            </animated.div>
          );
        })}
      </div>
      <h3 className="inv-tbl-h">View Full Inventory</h3>
      <InvTable />
    </div>
  );
};

export default Inventory;

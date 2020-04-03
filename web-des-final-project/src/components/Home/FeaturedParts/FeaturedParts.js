import React from "react";
import CardsDeck from "./CardsDeck";
import ScrollToTop from "../../Navigation/ScrollToTop/ScrollToTop";
import "./FeaturedParts.css";

const featuredParts = props => {
  return (
    <div className="featured-parts-wrapper">
      <h1>Featured Parts</h1>
      <ScrollToTop yOffSet={1600} topPos={1390}>
        <CardsDeck />
      </ScrollToTop>
    </div>
  );
};

export default featuredParts;

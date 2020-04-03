import React from "react";
import CardsDeck from "./CardsDeck";
import ScrollToTop from "../../Navigation/ScrollToTop/ScrollToTop";
import "./FeaturedParts.css";

const featuredParts = props => {
  return (
    <div className="featured-parts-wrapper">
      <h2>Featured Parts</h2>
      <ScrollToTop yOffSet={2000} topPos={1390}>
        <CardsDeck />
      </ScrollToTop>
    </div>
  );
};

export default featuredParts;

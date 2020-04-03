import React from "react";
import CardsDeck from "./CardsDeck";
import "./FeaturedParts.css";

const featuredParts = props => {
  return (
    <div className="featured-parts-wrapper">
      <h1>Featured Parts</h1>
      <CardsDeck />
    </div>
  );
};

export default featuredParts;

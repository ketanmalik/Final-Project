import React from "react";
import Carousel from "./Carousel";
import { description as Description } from "./Description";
import FeaturedParts from "./FeaturedParts/FeaturedParts";

const Home = props => {
  return (
    <div>
      <Carousel {...props} />
      <Description />
      <FeaturedParts />
    </div>
  );
};

export default Home;

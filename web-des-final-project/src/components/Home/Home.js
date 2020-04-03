import React from "react";
import Carousel from "./Carousel";
import { description as Description } from "./Description";
import FeaturedParts from "./FeaturedParts/FeaturedParts";
import Testimonials from "./Testimonials/Testimonials";

const Home = props => {
  return (
    <div>
      <Carousel {...props} />
      <Description />
      <FeaturedParts />
      <Testimonials />
    </div>
  );
};

export default Home;

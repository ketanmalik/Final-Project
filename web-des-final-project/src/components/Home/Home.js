import React from "react";
import Carousel from "./Carousel";
import { description as Description } from "./Description";
import FeaturedParts from "./FeaturedParts/FeaturedParts";
import Testimonials from "./Testimonials/Testimonials";
import ConfirmationModal from "./ConfirmationModal";

const Home = (props) => {
  return (
    <div>
      <Carousel {...props} />
      <Description />
      <div id="featuredParts">
        <FeaturedParts />
      </div>
      <Testimonials />
      <ConfirmationModal />
    </div>
  );
};

export default Home;

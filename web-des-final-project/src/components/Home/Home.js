import React from "react";
import Carousel from "./Carousel";
import { description as Description } from "./Description";

const Home = props => {
  console.log("home", props);
  return (
    <div>
      <Carousel {...props} />
      <Description />
    </div>
  );
};

export default Home;

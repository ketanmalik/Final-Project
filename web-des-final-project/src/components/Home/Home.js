import React from "react";
import Carousel from "./Carousel";

const Home = props => {
  console.log("home", props);
  return (
    <div>
      <Carousel {...props} />
    </div>
  );
};

export default Home;

import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Footer from "../Navigation/Footer/Footer";
import "./Layout.css";

const layout = props => {
  return (
    <div className="container">
      <Toolbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default layout;

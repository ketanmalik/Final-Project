import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Footer from "../Navigation/Footer/Footer";
import "./Layout.css";

const layout = props => {
  return (
    <div style={{ marginTop: "5em" }}>
      <Toolbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default layout;

import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Footer from "../Navigation/Footer/Footer";
import Container from "react-bootstrap/Container";
import "./Layout.css";

const layout = (props) => {
  return (
    <div>
      <Toolbar />
      <Container fluid style={{ padding: "0px", marginTop: "4.6em" }}>
        {props.children}
      </Container>
      <Footer />
    </div>
  );
};

export default layout;

import React from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import MainContent from "../../containers/MainContent/MainContent";
import Footer from "../Navigation/Footer/Footer";
import Container from "react-bootstrap/Container";
import "./Layout.css";

const layout = (props) => {
  return (
    <div>
      <Toolbar {...props} />
      <Container fluid style={{ padding: "0px", marginTop: "4.6em" }}>
        {/* {props.children} */}
        <MainContent />
      </Container>
      <Footer {...props} />
    </div>
  );
};

export default layout;

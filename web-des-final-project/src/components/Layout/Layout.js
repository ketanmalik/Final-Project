import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import MainContent from "../../containers/MainContent/MainContent";
import Footer from "../Navigation/Footer/Footer";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import UserInfo from "../../UserInfo/UserInfo";
import axios from "axios";

import "./Layout.css";

class Layout extends Component {
  state = {
    userObj: null,
    safeToProceed: false,
  };

  async componentDidMount() {
    await axios
      .get("/getsaveuser")
      .then((resp) => {
        const obj = resp.data.userObj;
        if (!obj.fName) {
          UserInfo.setUserInfoObj(null);
        } else {
          UserInfo.setUserInfoObj(obj);
        }
        console.log("check");
        return true;
      })
      .catch((err) => {
        UserInfo.setUserInfoObj(null);
        return false;
      });
    this.setState({ safeToProceed: true });
  }

  render() {
    return this.state.safeToProceed ? (
      <div>
        <Toolbar {...this.props} />
        <Container
          fluid
          style={{ padding: "0px", marginTop: "4.6em", minHeight: "50vh" }}
        >
          <MainContent />
        </Container>
        <Footer {...this.props} />
      </div>
    ) : (
      <div style={{ marginLeft: "50%", marginTop: "30%", color: "#581845" }}>
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }
}

export default Layout;

import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import img from "../../assets/images/dashboard.png";
import UserInfo from "../../UserInfo/UserInfo";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    userObj: null,
    firstName: "",
  };

  componentDidMount() {
    let obj = UserInfo.getUserInfoObj();
    if (!obj) {
      window.location.replace("https://localhost:3000/");
    } else {
      this.setState({
        userObj: obj,
        firstName: obj.fName,
      });
    }
  }

  render() {
    return (
      <Aux>
        <Jumbotron fluid>
          <Container>
            <div className="jumbotron-container">
              <Row>
                <Col lg="4" xs="12">
                  <Image src={img} rounded />
                </Col>
                <Col lg="8" xs="12">
                  <div className="jumbotron-text">
                    <h1>{this.state.firstName}'s Dashboard</h1>
                    <p>
                      This is a modified jumbotron that occupies the entire
                      horizontal space of its parent.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Jumbotron>

        <div className="dashboard-info">
          <Row>
            <Col lg="6">
              <Card>
                <Card.Header className="dashboard-pi-header">
                  Featured
                  <i style={{ float: "right" }} class="far fa-edit"></i>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Aux>
    );
  }
}
export default Dashboard;

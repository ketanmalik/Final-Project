import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import img from "../../assets/images/dashboard.png";
import UserInfo from "../../UserInfo/UserInfo";
import Spinner from "react-bootstrap/Spinner";

import "./Dashboard.css";

function renderTooltip(props) {
  return (
    <Tooltip id="info-tooltip" {...props}>
      Edit Information
    </Tooltip>
  );
}

class Dashboard extends Component {
  state = {
    userObj: null,
    // firstName: "",
    // lastName: "",
    // email: "",
    editAccountInfo: false,
    safeToProceed: false,
  };

  componentDidMount() {
    console.log("did");
    let obj = UserInfo.getUserInfoObj();
    if (!obj) {
      window.location.replace("https://localhost:3000/");
    } else {
      this.setState({
        userObj: obj,
        safeToProceed: true,
      });
      console.log(obj);
    }
  }

  render() {
    let readOnly = "readOnly";
    return this.state.safeToProceed ? (
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
                    <h1>{this.state.userObj.fName}'s Dashboard</h1>
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
                  Account Information
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 200 }}
                    overlay={renderTooltip}
                  >
                    <i style={{ float: "right" }} class="far fa-edit"></i>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Contact</Card.Title>
                  <Card.Text className="dashboard-card-text">
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formPlaintextFirstName">
                          <Form.Label className="dashboard-form-label">
                            First Name:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.fName}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPlaintextLastName">
                          <Form.Label className="dashboard-form-label">
                            Last Name:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.lName}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formPlaintextEmail">
                          <Form.Label className="dashboard-form-label">
                            Email:
                          </Form.Label>
                          <Form.Control
                            plaintext
                            defaultValue={this.state.userObj.email}
                            readOnly
                          />
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Card.Text>
                  <Card.Title>Address</Card.Title>
                  <Card.Text className="dashboard-card-text">
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formPlaintextAdd1">
                          <Form.Label className="dashboard-form-label">
                            Street, Area:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.add1}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPlaintextadd2">
                          <Form.Label className="dashboard-form-label">
                            Apartment, Studio, Floor:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.add2}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formPlaintextCity">
                          <Form.Label className="dashboard-form-label">
                            City:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.city}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPlaintextState">
                          <Form.Label className="dashboard-form-label">
                            State:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.state}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formPlaintextZip">
                          <Form.Label className="dashboard-form-label">
                            Zip:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.zip}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPlaintextCountry">
                          <Form.Label className="dashboard-form-label">
                            Country:
                          </Form.Label>
                          <Form.Control
                            plaintext={!this.state.editAccountInfo}
                            defaultValue={this.state.userObj.country}
                            readOnly={!this.state.editAccountInfo}
                          />
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Aux>
    ) : (
      <div
        style={{
          marginLeft: "50%",
          marginTop: "30%",
          marginBotton: "50%",
          color: "#581845",
        }}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }
}
export default Dashboard;

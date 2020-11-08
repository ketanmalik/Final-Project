import React, { Component } from "react";
import CartInfo from "../../CartInfo/CartInfo";
import UserInfo from "../../UserInfo/UserInfo";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PayPalBtn from "./PayPalBtn";
import axios from "axios";
import { numberFormat } from "../../assets/NumberFormat/NumberFormat";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./Checkout.css";

class Checkout extends Component {
  state = {
    cartInfo: null,
    userInfo: null,
    safeToProceed: false,
    price: 0,
    processingPayment: false,
    orderInfo: [],
  };

  async componentDidMount() {
    let cartInfo = await CartInfo.getCartObjs();
    console.log("cart", cartInfo);
    if (cartInfo === null) {
      console.log("ss");
      this.props.history.push("/");
      // this.props.history.replace("/", "/checkout");
    } else {
      let userInfo = await UserInfo.getUserInfoObj();
      UserInfo.setUserInfoObj(userInfo);
      if (!userInfo || !userInfo.fName) {
        this.props.history.push("/");
        return;
      }
      userInfo.cartInfo = cartInfo;
      this.setState({ orderInfo: userInfo.orderInfo });

      let price = cartInfo.price;
      console.log("user", userInfo);

      axios({
        url: "/checkout/cartinfo",
        method: "PUT",
        data: userInfo,
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err.response);
        });
      this.setState({
        cartInfo: cartInfo,
        userInfo: userInfo,
        price: price,
        safeToProceed: true,
      });
      CartInfo.setOrderPlaced(false);
    }
  }

  updateCartInfo = async (e) => {
    let cartInfo = { ...this.state.cartInfo };
    let userInfo = { ...this.state.userInfo };

    let index = e.currentTarget.dataset.id;
    let items = cartInfo.items;
    let price = cartInfo.price;
    price = price - items[index].price;
    items.splice(index, 1);

    cartInfo = { items: items, price: price };
    userInfo.cartInfo = cartInfo;

    axios({
      url: "/checkout/cartinfo",
      method: "PUT",
      data: userInfo,
    })
      .then((resp) => {
        var self = this;
        console.log(resp);
        this.setState({ cartInfo: cartInfo, userInfo: userInfo });
        UserInfo.setUserInfoObj(userInfo);
        CartInfo.setCartObjs(cartInfo);
        if (cartInfo.items.length === 0) {
          self.props.history.replace("/parts/inventory", "/checkout");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  payPalSuccess = (details, data) => {
    this.setState({ processingPayment: true, safeToProceed: false });
    if (details.status === "COMPLETED") {
      let userInfo = { ...this.state.userInfo };
      let orderInfo = [...this.state.orderInfo];

      const date = new Date();
      const payerFname = details.payer.name.given_name;
      const payerLname = details.payer.name.surname;
      const orderId = details.id;
      const amount = details.purchase_units[0].amount.value;

      const order = {
        date: date,
        fName: payerFname,
        lName: payerLname,
        orderId: orderId,
        amount: amount,
        items: this.state.cartInfo.items,
      };

      orderInfo.push(order);
      userInfo.orderInfo = orderInfo;

      axios({
        url: "/checkout/orderinfo",
        method: "PUT",
        data: userInfo,
      })
        .then(() => {
          sessionStorage.setItem('user', JSON.stringify(userInfo));
          this.setState({
            userInfo: userInfo,
            orderInfo: orderInfo,
            processingPayment: false,
            safeToProceed: true,
          });
          UserInfo.setUserInfoObj(userInfo);
          CartInfo.setOrderPlaced(true);
          this.props.history.replace("/", "/checkout");
        })
        .catch(() => {
          this.setState({ processingPayment: false, safeToProceed: true });
        });
    } else {
      this.setState({ processingPayment: false, safeToProceed: true });
    }
  };

  payPalHandler = () => {
    console.log("handler");
  };

  render() {
    let tempProductDescription = [];
    let productDescription = [];
    if (this.state.safeToProceed) {
      let items = [...this.state.cartInfo.items];
      var j = 0;
      items.map((item) => {
        tempProductDescription.push(
          <div className="checkout-item-card" key={item.serialNo}>
            <h4>
              <i>{item.description}</i>
              <Button
                onClick={this.updateCartInfo.bind(this)}
                data-id={j++}
                style={{
                  float: "right",
                }}
                className="checkout-delete-btn"
              >
                <i
                  className="far fa-trash-alt fa-lg"
                  style={{
                    float: "right",
                    color: "red",
                  }}
                ></i>
              </Button>
            </h4>
            <div className="checkout-separator" />
            <p>
              <b>Serial Number:</b>&nbsp;{item.serialNo}{" "}
            </p>
            <p>
              <b>Model Number:</b>&nbsp;{item.modelNo}{" "}
            </p>
            <p>
              <b>Price:</b>&nbsp;${item.price}{" "}
            </p>
            <p>
              <b>Category:</b>&nbsp;{item.category}{" "}
            </p>
          </div>
        );
      });
      var ss = 0;
      console.log("temp", tempProductDescription);
      for (var i = 0; i < tempProductDescription.length; i += 2) {
        productDescription.push(
          <Row key={ss} id="checkout-prod-row">
            <Col lg="6" sm="12" id={i} id="checkout-prod-col1" key={ss}>
              {tempProductDescription[i]}
            </Col>
            <Col lg="6" sm="12" key={ss + 1} id="checkout-prod-col2">
              {tempProductDescription[i + 1]}
            </Col>
          </Row>
        );
        ss = ss + 2;
      }
    }

    return this.state.safeToProceed ? (
      this.state.userInfo.fName ? (
        <div className="checkout-wrapper">
          <div className="checkout-heading">
            <h2>Finalize Your Order</h2>
            <p style={{ color: "#737373", textAlign: "center" }}>
              <b>
                <i>(We just need 5% of the total bill right now to start preparing your order.)</i>
              </b>
            </p>
          </div>
          <Row>
            <Col lg="2" />
            <Col lg="8" sm="12">
              <Accordion className="checkout-accordion" defaultActiveKey="2">
                <Card className="checkout-card">
                  <Card.Header className="checkout-card-header">
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="0"
                      className="checkout-accordion-title"
                    >
                      Cart Items&nbsp;-&nbsp;
                      {numberFormat(this.state.cartInfo.price * 0.05)}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse
                    className="checkout-accordion-collapse"
                    eventKey="0"
                  >
                    <ReactCSSTransitionGroup
                      transitionName="example"
                      transitionEnterTimeout={700}
                      transitionLeaveTimeout={700}
                    >
                      {productDescription}
                    </ReactCSSTransitionGroup>
                  </Accordion.Collapse>
                </Card>
                <Card className="checkout-card">
                  <Card.Header className="checkout-card-header">
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="1"
                      className="checkout-accordion-title"
                    >
                      Shipping Information
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse
                    className="checkout-accordion-collapse"
                    eventKey="1"
                  >
                    <Card.Body>
                      <Row>
                        <Col lg="6" sm="12">
                          <div className="checkout-item-card">
                            <h4>Contact Information</h4>
                            <div className="checkout-separator" />
                            <p>
                              <b>First Name:</b>&nbsp;
                              {this.state.userInfo.fName}
                            </p>
                            <p>
                              <b>Last Name:</b>&nbsp;{this.state.userInfo.lName}
                            </p>
                            <p>
                              <b>Email:</b>&nbsp;{this.state.userInfo.email}
                            </p>
                          </div>
                        </Col>
                        <Col lg="6" sm="12">
                          <div className="checkout-item-card">
                            <h4>Address</h4>
                            <div className="checkout-separator" />
                            <p>
                              <b>Street/Road:</b>&nbsp;
                              {this.state.userInfo.add1}
                            </p>
                            <p>
                              <b>Apartment/Studio:</b>&nbsp;
                              {this.state.userInfo.add2}
                            </p>
                            <p>
                              <b>City, State, Zip:</b>&nbsp;
                              {this.state.userInfo.city}
                              ,&nbsp;{this.state.userInfo.state}&nbsp;
                              {this.state.userInfo.zip}
                            </p>
                            <p>
                              <b>Country:</b>&nbsp;{this.state.userInfo.country}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card className="checkout-card">
                  <Card.Header className="checkout-card-header">
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="2"
                      className="checkout-accordion-title"
                    >
                      Payment
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse
                    className="checkout-accordion-collapse"
                    eventKey="2"
                  >
                    <Card.Body>
                      <div className="payPalWrapper">
                        <PayPalBtn
                          amount={this.state.cartInfo.price * 0.05}
                          currency={"USD"}
                          onSuccess={this.payPalSuccess}
                        />
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </div>
      ) : (
          this.props.history.push("/")
        )
    ) : (
        <div style={{ marginLeft: "50%", marginTop: "30%", color: "#581845" }}>
          <Spinner animation="border" role="status"></Spinner>
        </div>
      );
  }
}

export default Checkout;

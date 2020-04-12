import React, { Component } from "react";
import CartInfo from "../../CartInfo/CartInfo";
import Spinner from "react-bootstrap/Spinner";
import Aux from "../../hoc/Aux/Aux";
import "./Checkout.css";

class Checkout extends Component {
  state = {
    cartInfo: null,
    safeToProceed: false,
  };

  async componentDidMount() {
    let cartInfo = await CartInfo.getCartObjs();
    this.setState({ cartInfo: cartInfo, safeToProceed: true });
  }
  render() {
    console.log(this.state);
    // axios({
    //   url: "/checkout",
    //   method: "POST",
    //   data: payload,
    // })
    //   .then(console.log("data send"))
    //   .catch(console.log("not send"));
    return this.state.safeToProceed ? (
      <div>Checkout</div>
    ) : (
      <div style={{ marginLeft: "50%", marginTop: "30%", color: "#581845" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default Checkout;

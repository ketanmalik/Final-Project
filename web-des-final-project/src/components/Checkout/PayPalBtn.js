import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";

class PayPalBtn extends Component {
  render() {
    const { amount, onSuccess, currency } = this.props;

    return (
      <PayPalButton
        amount={amount}
        currency={currency}
        onSuccess={(details, data) => this.props.onSuccess(details, data)}
        options={{
          clientId:
            "AWwSyw3X1EWB_TJWU6QACwlzVQixz81r8VUQ263iatn29nwdBN54DHOHFdXxpDg485NIAvurfpU4utQM",
        }}
      />
    );
  }
}

export default PayPalBtn;

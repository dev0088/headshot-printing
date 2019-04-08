import React, { Component, Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import HeadshotAPI from 'apis/headshotAPIs';

class StripeCheckoutButton extends Component {
  
  state = {
    publishableKey: "pk_test_3MJjMu9cCoQbihWg8Sw8dqUM"
  };
   
  onToken = token => {
    const { headshot, onCheckout, onPayment } = this.props;
    const body = {
      amount: this.props.amount * 100,
      token: token
    };

    if (onCheckout) this.props.onCheckout(body);

    HeadshotAPI.createPayment(headshot.id, body, onPayment);
    // axios
    //   .post(`http://192.168.0.121:8000/api/v1/headshot/charge/62/`, body)
    //   .then(response => {
    //     console.log(response);
    //     if (onCheckout) onPayment(response, false);
    //   })
    //   .catch(error => {
    //     console.log("Payment Error: ", error);
    //     if (onPayment) onPayment(error, true);
    //   });
  };

  render () {
    const { headshot, amount } = this.props;
    return (
      <StripeCheckout
        label="Pay"
        name="Martello Creative"
        description={`Pay to print ${headshot.file_name} image on ${headshot.cloudinary_image_secure_url}.`}
        panelLabel="Pay"
        email={headshot.email}
        amount={amount * 100} // convert to cent
        token={this.onToken}
        stripeKey={this.state.publishableKey}
        image={require('../../../images/logo.jpg')} //Pop-in header image
        billingAddress={false}
        shippingAddress
        zipCode
      />
    );  
  }
};
export default StripeCheckoutButton;
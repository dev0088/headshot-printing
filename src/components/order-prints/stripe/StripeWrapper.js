import React, { Component } from "react";

import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

import MyStoreCheckout from "./MyStoreCheckout";

//StripeProvider gives us access to the Stripe Object
//i.e Stripe.createToken, stripe.elements() etc
//App loads the stripe script asynchronously in CDM

class StripeWrapper extends Component {
  state = { stripe: "pk_test_3MJjMu9cCoQbihWg8Sw8dqUM" };

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe("pk_test_3MJjMu9cCoQbihWg8Sw8dqUM")
      });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        //Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(pk_test_3MJjMu9cCoQbihWg8Sw8dqUM)
        });
      });
    }
  }

  render() {
    return (
      this.state.stripe && (
        <StripeProvider apiKey={'pk_test_3MJjMu9cCoQbihWg8Sw8dqUM'}>
          <MyStoreCheckout />
        </StripeProvider>
      )
    );
  }
}

export default StripeWrapper;

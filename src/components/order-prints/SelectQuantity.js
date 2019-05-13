import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { materialStyles } from 'styles/material/index';
import Button from '@material-ui/core/Button';
import StripeCheckoutButton from './stripe/StripeCheckoutButton';
import * as appUtils from 'utils/appUtils';


class SelectQuantity extends Component {
  state = {
    order: this.props.order,
    quantityId: this.props.quantityId,
    labelWidth: 0,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ quantityId: nextProps.quantityId, order: nextProps.order });
  }

  handleChangeOrder = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.onChangeOrder(this.state.order)
    });
  };

  handleChangeQuantity = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.onChangeQuantity(this.state.quantityId)
    });
  };

  handleNext = () => {
    this.props.handleNext();
  }

  handleBack = () => {
    this.props.handleBack();
  }

  render = () => {
    const { production, classes } = this.props;
    const { quantityId } = this.state;
    let productionQuantities = [];

    if (production && production.production_quantities) {
      productionQuantities = production.production_quantities.map((quantity) => {
        return (<MenuItem key={quantity.id} value={quantity.id}>{quantity.caption}</MenuItem>);
      });
    }

    return (
      <Grid container alignItems="center">
        <Grid item xl={3} lg={3} md={2} sm={1} xs={1} />
        <Grid item xl={6} lg={6} md={8} sm={10} xs={10} className={classNames(classes.swipeableGridContainer, )}>
          <Typography className={classNames(classes.itemTitleText, classes.colorBlack)}>
            { `Quantity` }
          </Typography>
          <FormControl variant="outlined" className={classNames(classes.formControl, classes.noMargin)}>
            <Select
              value={quantityId ? quantityId : ""}
              onChange={this.handleChangeQuantity}
              input={
                <OutlinedInput
                  labelWidth={0}
                  name="quantityId"
                />
              }
              color="primary"
            >
              { productionQuantities }
            </Select>
          </FormControl>
        </Grid>
<<<<<<< HEAD
        <Grid item xl={5} lg={5} md={3} sm={2} xs={1} />
=======
        <Grid item xl={3} lg={3} md={2} sm={1} xs={1} />
        <Grid item xs={12} className={classes.centerText}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            disabled={this.props.state.step === 0}
            className={classes.nextButton}
            onClick={this.handleBack}
          >
            { 'Back' }
          </Button>
          {
            ((this.props.state.step === appUtils.getSteps().length - 1) && !this.props.state.paid) ? (
              <StripeCheckoutButton 
                headshot={this.props.state.headshot} 
                amount={this.props.state.totalPrice} 
                onCheckout={this.handleCheckout} 
                onPayment={this.handlePayment}
              />
            ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.nextButton}
              onClick={this.handleNext}
            >
              { this.props.state.paid ? 'Finish' : 'Next' }
            </Button>
            )
          }
        </Grid> 
>>>>>>> 473b9071231e141448979543944211fb25cca57d
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(SelectQuantity);

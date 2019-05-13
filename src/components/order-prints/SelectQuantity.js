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
        <Grid item xl={5} lg={5} md={3} sm={2} xs={1} />
        <Grid item xl={2} lg={2} md={6} sm={8} xs={10} className={classNames(classes.swipeableGridContainer, )}>
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
        <Grid item xl={5} lg={5} md={3} sm={2} xs={1} />
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(SelectQuantity);

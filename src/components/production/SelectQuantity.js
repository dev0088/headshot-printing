import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import * as appUtils from '../../utils/appUtils';
import { materialStyles } from '../../styles/material/index';

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
    const { quantityId, order } = this.state;
    let productionQuantities = [];

    if (production && production.production_quantities) {
      productionQuantities = production.production_quantities.map((quantity) => {
        return (<MenuItem key={quantity.id} value={quantity.id}>{quantity.caption}</MenuItem>);
      });
    }

    return (
      <Grid container spacing={16} alignItems="center">
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { production.description }
          </Typography>
        </Grid>
        
        <Grid item xs={4}>
          <Typography className={classNames(classes.itemTitleText)}>
            { `I am placing a:` }
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="Order"
              name="order"
              className={classes.orderRadioGroup}
              value={order}
              onChange={this.handleChangeOrder}
              row
            >
              <FormControlLabel value="neworder" control={<Radio color="primary" />} label="New Order" labelPlacement="start" className={classes.orderRadio} />
              <FormControlLabel value="reorder" control={<Radio color="primary" />} label="Reorder" labelPlacement="start"/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classNames(classes.itemTitleText)}>
          { `Quantity` }
        </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={quantityId}
              onChange={this.handleChangeQuantity}
              input={
                <OutlinedInput
                  name="quantityId"
                />
              }
            >
              { productionQuantities }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(SelectQuantity);

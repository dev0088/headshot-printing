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
      <Grid container spacing={16} alignItems="center">
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { production.description }
          </Typography>
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

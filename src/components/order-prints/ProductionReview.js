import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageLoader from 'react-loading-image';
import * as productionActions from 'actions/productionActions';
import { materialStyles } from 'styles/material/index';

class ProductionReview extends Component {
  state = {
  };

  handleChange = (name, event) => {
    console.log(name, event.target.checked);
    this.setState({ [name]: event.target.checked }, () => {
      this.props.onChange(name, this.state[name]);
    });
  };

  handleChangeText = (name, event) => {
    this.setState({
      [name]: event.target.value,
    }, () => {
      this.props.onChange(name, this.state[name]);
    });
  };

  render = () => {
    const { production, classes } = this.props;
    let amount = 0;
    let price = 0;

    let currentQuantiry = production.production.production_quantities.find(quantity => {
      return quantity.id === production.quantityId;
    });
    if (currentQuantiry) {
      amount = currentQuantiry.amount;
      price = currentQuantiry.plus_price;
    }
    return (
      <Grid container spacing={16} alignItems="center" className={classNames(classes.swipeableGridContainer, )}>
        <Grid item xs={12}>
          <Typography className={classNames(classes.itemTitleText)}>
            { `Review Your Order` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `It looks like we have gone over everything we need to proceed with your order. 
              Please take a moment to review the details below and confirm that everything is correct. 
              You can make changes using the buttons provided to return to a previous section.` }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Stripe Payment` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <StripeWrapper /> */}
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Headshots` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Quantity: ${amount}` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `$${price}` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Set-up fee` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `$${25}` }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Your infomation` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Image on File: ${production.hasImage ? 'Yes' : 'No'}, Reproductions already has my image.` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `File name or image description: ${production.fileName}` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Your email address: ${production.email}` }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Image` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageLoader
            className={classes.productionGalleryImage}
            src={production.headshot ? production.headshot.cloudinary_image_url : ''}
            loading={() => <CircularProgress size={20} thickness={5} />}
            error={() => <img src={require("../../images/missing.png")} />} 
          />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { productions, production } = state;
  return {
    productions,
    production
  }
}

function mapDispatchToProps(dispatch) {
  return {
    productionActions: bindActionCreators(productionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductionReview));

// export default withStyles(materialStyles)(ProductionReview);

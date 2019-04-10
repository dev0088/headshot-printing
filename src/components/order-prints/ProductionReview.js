import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImageLoader from 'react-loading-image';
import * as productionActions from 'actions/productionActions';
import { materialStyles } from 'styles/material/index';
import * as appUtils from 'utils/appUtils';

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

  handleStyleChange = (event) => {
    console.log(event.target.value);
    this.setState({ styleValue: event.target.value });
  }

  render = () => {
    const { production, classes } = this.props;
    const { styleValue } = this.state;
    const { reviewLayout } = appUtils;
    let amount = 0;
    let price = 0;

    let currentQuantiry = production.production ? production.production.production_quantities.find(quantity => {
      return quantity.id === production.quantityId;
    }) : null;
    if (currentQuantiry) {
      amount = currentQuantiry.amount;
      price = currentQuantiry.plus_price;
    }
    return (
      <Grid container alignItems="center">
        <Grid item sm={1} />
        <Grid item xs={12} sm={10} alignItems="center" className={classNames(classes.swipeableGridContainer, classes.sampleContainer)}>
          {reviewLayout.map(each => {
            return (
              <Grid item xs={6} sm={4} className={classNames(classes.samplePhotoEach)}>
                <div className={classNames(classes.itemTitleImage)}>
                  <img src={require(`../../images/samples/${each.photo}`)} />
                </div>
                <Typography className={classNames(classes.itemTitleText)}>
                  { each.title }
                </Typography>
                <Radio
                  checked={styleValue === each.id}
                  onChange={this.handleStyleChange}
                  value={each.id}
                  color="default"
                  name="radio-button-demo"
                  aria-label={each.id}
                />
              </Grid>);
          })}
        </Grid>
        {/*<Grid item xs={12}>
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
            error={() => <img src={require("../../images/missing.png")} alt="missing" />} 
          />
        </Grid>*/}
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

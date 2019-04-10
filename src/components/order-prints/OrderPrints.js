import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ImageLoader from 'react-loading-image';
import ProductionSteper from './ProductionSteper';
import SelectQuantity from './SelectQuantity';
import ProductionUserInfo from './ProductionUserInfo';
import ProductionReview from './ProductionReview';
import StripeCheckoutButton from './stripe/StripeCheckoutButton';
import HeadshotAPI from 'apis/headshotAPIs';
import Spacer from '../common/material/Spacer';
import * as appUtils from 'utils/appUtils';
import * as productionActions from 'actions/productionActions';
import { materialStyles, themeMaterial } from 'styles/material/index';


class OrderPrints extends Component {
  state = {
    loading: false,
    production: null,
    quantityId: null,
    order: null,
    step: 0,
    hasImage: false,
    uploadImageUrl: null,
    fileName: '',
    email: '',
    headshot: null,
    paid: false
  };

  componentWillMount() {
    this.setState({
      loading: true,
      step: 0,
      headshot: null,
      // ...this.props.production
    }, () => {
      // let productionId = (this.props.location && this.props.location.state) ? this.props.location.state.productionId : 0;
      // if (productionId) {
        HeadshotAPI.getProduction(2, this.handleGetProductionResponse);
      // }
    });
  }

  handleGetProductionResponse = (response, isFailed) => {
    this.setState({production: response, loading: false});
  };

  handleClickGallery = (productionId) => {
    this.props.onChangeMenu({key: 'imagemap', productionId});
  };

  handleChangeOrder = order => {
    this.setState({ order });
  };

  handleChangeQuantity = quantityId => {
    this.setState({ quantityId });
  };

  handleChangeStep = (step) => {
    this.setState({step});
  }

  handleChange = (name, value) => {
    console.log(name, value);
    this.setState({[name]: value});
  }

  handleChangeIndex = index => {
    this.setState({ step: index });
  };

  handleNext = () => {
    const { step, paid } = this.state;
    if (step === 1) {
      // Create new headshot
      this.setState({loading: true}, () => {
        const { email, fileName, uploadImageUrl, quantityId } = this.state;
        let data = {
          "email": email,
          "file_name": fileName,
          "quantity": quantityId,
          "status": "Draft"
        };
        HeadshotAPI.createHeadshot(data, this.handleCreateHeadshot);
      });
    } else {
      this.setState({
        step: step + 1,
      }, () => {
        this.props.productionActions.setProductionState(this.state);
        if (paid) {
          // this.props.onChangeMenu({key: 'productions'});
          // Go to home page
          this.props.history.push('/')
        }
      });  
    }
  };

  handleBack = () => {
    this.setState({
      step: this.state.step - 1,
    }, () => {
      this.props.productionActions.setProductionState(this.state);
      if (this.state.step === 1) {
        if (this.state.headshot) HeadshotAPI.deleteHeadshot(this.state.headshot.id, this.handleCreateHeadshot);
      }
    });
  };

  handleReset = () => {
    this.setState({
      step: 0,
    }, () => {
      this.props.productionActions.setProductionState(this.state);
    });
  };

  handleCreateHeadshot = (response, isFailed) => {
    if (isFailed) {}
    else this.setState({loading: false, headshot: response, step: this.state.step + 1}, () => {
      this.props.productionActions.setProductionState(this.state);
    });
  }

  handleCheckout = (token, isFailed) => {
    if(isFailed) {}
    else {
      this.setState({loading: true}, () => {
        this.props.productionActions.setProductionState(this.state);
      });
    }
  }

  handlePayment = (response, isFailed) => {
    if(isFailed) {}
    else {
      this.setState({loading: false, paid: true, step: this.state.step + 1}, () => {
        this.props.productionActions.setProductionState(this.state);
      });
    }
  }

  renderStepForm = () => {
    const { classes } = this.props;
    const { production, step, order, quantityId, hasImage } = this.state;
    return (
      
        production ? (
            <SwipeableViews
              axis={themeMaterial.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={step}
              onChangeIndex={this.handleChangeIndex}
            >
              <SelectQuantity
                production={production}
                quantityId={quantityId}
                onChangeQuantity={this.handleChangeQuantity}
                order={order}
                onChangeOrder={this.handleChangeOrder}
              />
              <ProductionUserInfo hasImage={hasImage} onChange={this.handleChange} />
              <ProductionReview />
            </SwipeableViews>
          ) : (
            <div/>
          )
    );
  }

  render() {
    const { classes } = this.props;
    const { loading, production, step, quantityId, headshot, paid } = this.state;
    // console.log('==== production: ', this);
    let amount = 0;
    let price = 0;
    let fileName = headshot ?  headshot.file_name : '';
    let imageUrl = headshot ? headshot.cloudinary_image_secure_url : '';
    let productionQuantities = [];
    // Get current quantity
    let currentQuantity = null;
    if (production && production.production_quantities) {
      currentQuantity = production.production_quantities.find(quantity => {
        return quantity.id === quantityId;
      });
    }
    if (currentQuantity) {
      amount = currentQuantity.amount;
      price = parseFloat(currentQuantity.plus_price);
    }

    if (!(production && production.production_quantities)) {
      return (
        <Paper className={classes.containerPaper} center="true">
          <CircularProgress size={40} thickness={5} />
        </Paper>
      );
    }
    return (
      <div>
        {/* <div className={classNames(classes.orderPrintsSteperLayout)}> */}
        <div className={classNames(classes.orderContainer)}>
          <Grid container className={classNames(classes.orderPrintsSteperLayout, )}>
            <Grid item lg={1} md={1} sm={12} xs={12}/>
            <Grid item lg={10} md={10} sm={12} xs={12}>
              <Grid container className={classNames(classes.steperGridContainer)}>
                <Grid item xs={6}>
                  <Typography className={classNames(classes.pageTitleText, classes.bold, classes.whiteImportant)}>
                    {`Order Printing`}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.rightText}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    disabled={step === 0}
                    className={classes.nextButton}
                    onClick={this.handleBack}
                  >
                    { 'Back' }
                  </Button>
                  {
                    ((step === appUtils.getSteps().length - 1) && !paid) ? (
                      <StripeCheckoutButton 
                        headshot={headshot} 
                        amount={price} 
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
                      { paid ? 'Finish' : 'Next' }
                    </Button>
                    )
                  }
                </Grid>
                <Grid item xs={12}>
                  <ProductionSteper step={step} onChangeStep={this.handleChangeStep} />
                </Grid>
                {/* <Grid item xs={12}>
                  { this.renderStepForm() }
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item lg={1} md={1} sm={12} xs={12}/>
          </Grid>

          <Grid 
            container direction="column" 
            justify="center" alignItems="center" 
            className={classNames(classes.orderPrintsSteperBody, )}
          >
            <Grid item xs={12}>
              { this.renderStepForm() }
            </Grid>
          </Grid>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(OrderPrints));


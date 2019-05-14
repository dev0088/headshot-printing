import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ImageLoader from 'react-loading-image';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomReviewItem from './CustomReviewItem';
import Spacer from 'components/common/material/Spacer';
import * as appUtils from 'utils/appUtils';
import { materialStyles } from 'styles/material/index';
import Button from '@material-ui/core/Button';
import StripeCheckoutButton from './stripe/StripeCheckoutButton';


class ProductProof extends Component {

  handleBack = () => {
    this.props.handleBack();
  }

  handleNext = () => {
    this.props.handleNext();
  }

  render = () => {
    const { data, classes } = this.props;
    const { 
      production, design, orderElectronic, email, quantityId, headshot, fileName
    } = data;
    console.log('==== data: ', data);
    const { layoutType, layout } = design;
    const { reviewLayout } = appUtils;
    let firstname = layout ? layout.firstname : '';
    let lastname = layout ? layout.lastname : '';
    let middlename = layout ? layout.middlename : '';
    let moveName = layout ? layout.moveName : '';
    let placement = layout ? layout.placement : '';
    let lineColor = layout ? layout.lineColor : '';
    let containerStyle = layout ? layout.containerStyle : {};
    let captionStyle = layout ? layout.captionStyle : {};
    let imageStyle = layout ? layout.imageStyle : {};

    let amount = 0;
    let price = 0;
    let currentQuantiry = production ? 
      production.production_quantities.find(quantity => {return quantity.id === quantityId;}) : 
      null;
    
    if (currentQuantiry && (currentQuantiry.plus_price !== null)) {
      amount = currentQuantiry.amount;
      price = parseFloat(currentQuantiry.plus_price);
    }

    let total = price;
    if (appUtils.linkOptionList[orderElectronic.likeOption] && appUtils.linkOptionList[orderElectronic.likeOption].price)
      total += appUtils.linkOptionList[orderElectronic.likeOption].price;
    if (production && production.price)
      total += parseFloat(production.price);
    total = total ? total.toFixed(2) : 0.0;

    return (
      <Grid>
        <Grid container alignItems="center">
          <Grid item sm={1}/>
          <Grid item xs={12} sm={10} className={classNames(classes.swipeableGridContainer)}>
            <Grid container space={16} className={classNames(classes.flexContainer)}>
              <Grid item sm={5} className={classNames(classes.proofImageContainerGridItem, classes.descriptionContainer)}>
                <div className={classNames(classes.itemRealImage)}>
                  <ImageLoader
                    src={(headshot && headshot.cloudinary_image_url) ? headshot.cloudinary_image_url : require(`images/missing.png`)}
                    className={classNames(classes.proofImageView)}
                    loading={() => 
                      <div style={imageStyle}>
                        <CircularProgress
                          variant="indeterminate"
                          className={classes.loadingProgress}
                          disableShrink
                          size={60}
                          thickness={4}
                        />
                      </div>
                    }
                    error={() => <div>Error</div>}
                  />
                  <Grid item xs={12}>
                    <Typography className={classNames(classes.itemSubTitleText, classes.colorBlack)}>
                      { `I approve this order and picture for print check mark` }
                    </Typography>
                  </Grid>
                </div>
              </Grid>
              <Grid item sm={7} className={classNames(classes.descriptionContainer)}>
              <Typography className={classNames(classes.customizeTitle)}>
                Review Your Order
              </Typography>
              <Typography className={classNames(classes.customizeDescription)}>
                It looks like we have gone over everything we need to proceed with your order. Please take a moment to review the details below and confirm that everything is correct. You can make changes using the buttons provided to return to a previous section.
              </Typography>
              <Grid item sm={12}>
                <Spacer size={30} />
              </Grid>
              <Grid item sm={12} className={classNames(classes.reviewProcedureTitleContainer)}>
                <Typography className={classNames(classes.customizeTitle)}>
                  { `Printing service` }
                </Typography>
              </Grid>
              <CustomReviewItem name={'Price'} value={`$${(production && production.price) ? production.price : 0}`} />

              <Grid item sm={12} className={classNames(classes.reviewProcedureTitleContainer)}>
                <Typography className={classNames(classes.customizeTitle)}>
                  { `Quantity` }
                </Typography>
              </Grid>
              <CustomReviewItem name={'Amount'} value={amount} />
              <CustomReviewItem name={'Price'} value={`$${price}`} />

              <Grid item sm={12} className={classNames(classes.reviewProcedureTitleContainer)}>
                <Typography className={classNames(classes.customizeTitle)}>
                  { `Your info` }
                </Typography>
              </Grid>
              <CustomReviewItem name={'Your name'} value={appUtils.makeFullName(firstname, middlename, lastname)} />
              <CustomReviewItem name={'Your email'} value={email} />
              
              <Grid item sm={12} className={classNames(classes.reviewProcedureTitleContainer)}>
                <Typography className={classNames(classes.customizeTitle)}>
                  { `Designs` }
                </Typography>
              </Grid>
              <CustomReviewItem name={'Layout'} value={reviewLayout[parseInt(layoutType)] ? reviewLayout[parseInt(layoutType)].title : ''} />
              <CustomReviewItem name={'Font'} value={captionStyle ? captionStyle.fontFamily : ''} />
              <CustomReviewItem name={'Case'} value={captionStyle ? captionStyle.textTransform : ''} />
              <CustomReviewItem name={'Border Color'} value={containerStyle ? containerStyle.backgroundColor : ''} />
              <CustomReviewItem name={'Text Color'} value={captionStyle ? captionStyle.color : ''} />
              <CustomReviewItem name={'Move name'} value={moveName} />
              <CustomReviewItem name={'Name Placement'} value={placement} />
              <CustomReviewItem name={'Line Color'} value={lineColor} />                        
              <Grid item xs={12}>
              <Typography className={classNames(classes.totalPrice)}>{`Sub Total: $${total}`}</Typography>
            </Grid>
            </Grid>
            </Grid>
          </Grid>
          <Grid item sm={1}/>
        </Grid>
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
    </Grid>   
    );
  }
}


const mapStateToProps = (state) => {
  const { production } = state;
  return {
    production
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductProof));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import StripeCheckoutButton from './stripe/StripeCheckoutButton';
import * as productionActions from 'actions/productionActions';
import { materialStyles } from 'styles/material/index';
import * as appUtils from 'utils/appUtils';
import VerticalWithBorder from './headshot-types/VerticalWithBorder';
import HorizontalWithBorder from './headshot-types/HorizontalWithBorder';
import HorizontalOnVerticalBorder from './headshot-types/HorizontalOnVerticalBorder';
import VerticalBorderless from './headshot-types/VerticalBorderless';
import HorizontalBorderless from './headshot-types/HorizontalBorderless';
import HorizontalOnVerticalBleed from './headshot-types/HorizontalOnVerticalBleed';

class ProductionDesign extends Component {
  state = {
    layoutType: '0',
    layout: {}
  };

  componentWillMount() {
    this.setState({}, () => this.props.onChange('design', this.state));
  }

  handleLayoutTypeChange = (layoutType) => {
    this.setState({ layoutType }, () => this.props.onChange('design', this.state));
  };

  handleLayoutDesignChagne = (layout) => {
    this.setState({layout}, () => this.props.onChange('design', this.state));
  };

  handleBack = () => {
    this.props.handleBack();
  }

  handleNext = () => {
    this.props.handleNext();
  }

  renderDesign = (layoutIndex) => {
    let Designer = VerticalWithBorder;
    switch (layoutIndex) {
      case '0': 
        Designer = VerticalWithBorder;
        break;
      case '1': 
        Designer = HorizontalWithBorder;
        break;
      case '2':
        Designer = HorizontalOnVerticalBorder;
        break;
      case '3':
        Designer = VerticalBorderless;
        break;
      case '4':
        Designer = HorizontalBorderless;
        break;
      case '5':
        Designer = HorizontalOnVerticalBleed;
        break;
      default:
        Designer = VerticalWithBorder;
        break;
    }
    return <Designer layoutIndex={layoutIndex} onChange={this.handleLayoutDesignChagne} />;
  }

  render = () => {
    const { classes } = this.props;
    const { layoutType } = this.state;
    const { reviewLayout } = appUtils;

    return (
      <Grid>
        <Grid container alignItems="center">
        <Grid item sm={1} />
        <Grid item xs={12} sm={10} className={classNames(classes.swipeableGridContainer)}>
          <Grid item xs={12} className={classNames(classes.sampleContainer)}>
            {reviewLayout.map(each => {
              return (
                <Grid item xs={6} sm={4} key={each.id} className={classNames(classes.samplePhotoEach)}>
                  <div className={classNames(each.isBorder ? classes.itemLayoutImageWithBorder : classes.itemLayoutImage)}>
                    <img src={require(`images/samples/${each.photo}`)} alt=""/>
                  </div>
                  <Typography className={classNames(classes.itemTitleText)}>
                    { each.title }
                  </Typography>
                  <Radio
                    checked={layoutType === each.id}
                    onChange={() => this.handleLayoutTypeChange(each.id)}
                    value={each.id}
                    color="default"
                    name="radio-button-demo"
                    aria-label={each.id}
                  />
                </Grid>);
            })}
          </Grid>
          { this.renderDesign(layoutType) }
        </Grid>
        <Grid item sm={1} />
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
};

const mapStateToProps = (state) => {
  const { productions, production } = state;
  return {
    productions,
    production
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    productionActions: bindActionCreators(productionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductionDesign));


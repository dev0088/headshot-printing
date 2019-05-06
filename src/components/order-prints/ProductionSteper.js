import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { getSteps } from 'utils/appUtils';
import { materialStyles } from 'styles/material/index';


class ProductionSteper extends React.Component {
  state = {
    activeStep: this.props.step,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({activeStep: nextProps.step});
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }), () => {
      this.props.onChangeStep(this.state.activeStep);
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }), () => {
      this.props.onChangeStep(this.state.activeStep);
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    }, () => {
      this.props.onChangeStep(this.state.activeStep);
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div >
        <Stepper activeStep={activeStep} alternativeLabel className={classNames(classes.steperGridContainer,)}>
          {steps.map(label => (
            <Step key={label} >
              <StepLabel>
                <Typography className={classNames(classes.generalDescriptionText)}>
                  {label}
                </Typography>    
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

ProductionSteper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(materialStyles)(ProductionSteper);
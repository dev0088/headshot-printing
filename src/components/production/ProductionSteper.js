import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { getSteps } from 'utils/appUtils';
import { materialStyles } from 'styles/material/index';


function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

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
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
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
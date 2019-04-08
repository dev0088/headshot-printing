import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HeadshotScreen from './HeadshotScreen';
import HeadshotHeader from './HeadshotHeader';
import Spacer from '../../components/common/material/Spacer';
import { themeMaterial } from '../../styles/material/index';

class HeadshotImageEditorContainer extends Component {
  render () {
    const { children } = this.props;

    return (
      <MuiThemeProvider theme={themeMaterial}>
        <div>
          <HeadshotScreen Layout={HeadshotHeader} />
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}

HeadshotImageEditorContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HeadshotImageEditorContainer;

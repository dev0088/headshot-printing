import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import HeadshotScreen from './HeadshotScreen';
import HeadshotHeader from './HeadshotHeader';
import GlobalNotification from 'components/notification/GlobalNotification';
import { themeMaterial } from 'styles/material/index';

class HeadshotImageEditorContainer extends Component {
  render () {
    const { children } = this.props;

    return (
      <MuiThemeProvider theme={themeMaterial}>
        <div>
          <HeadshotScreen Layout={HeadshotHeader} />
          {children}
          <GlobalNotification />
        </div>
      </MuiThemeProvider>
    );
  }
}

HeadshotImageEditorContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HeadshotImageEditorContainer;

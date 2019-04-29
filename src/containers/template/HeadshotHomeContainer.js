import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HeadshotScreen from './HeadshotScreen';
import HeadshotHeader from './HeadshotHeader';
import GlobalNotification from 'components/notification/GlobalNotification';
import { themeMaterial } from '../../styles/material/index';

class HeadshotHomeContainer extends Component {
  render () {
    const { children, onChangeMenu } = this.props;

    return (
      <MuiThemeProvider theme={themeMaterial}>
        <div>
          <HeadshotScreen Layout={HeadshotHeader} onChangeMenu={onChangeMenu}/>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
          <GlobalNotification />
        </div>
      </MuiThemeProvider>
    );
  }
}

HeadshotHomeContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HeadshotHomeContainer;

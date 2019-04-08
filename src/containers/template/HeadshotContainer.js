import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { MuiThemeProvider, } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HeadshotScreen from './HeadshotScreen';
import HeadshotHeader from './HeadshotHeader';
import Spacer from '../../components/common/material/Spacer';
import { themeMaterial } from '../../styles/material/index';

class HeadshotContainer extends Component {
  render () {
    const { children, onChangeMenu } = this.props;

    return (
      <MuiThemeProvider theme={themeMaterial}>
        <div>
          <HeadshotScreen Layout={HeadshotHeader} onChangeMenu={onChangeMenu}/>
          <Grid container spacing={24}>
            <Grid item xs={12}><Spacer size={30}/></Grid>
            <Grid item xl={2} lg={2} md={1} sm={1} xs={1} />
            <Grid item xl={8} lg={8} md={10} sm={10} xs={10} >
                <Container fluid>
                  {children}
                </Container>
            </Grid>
            <Grid item xl={2} lg={2} md={1} sm={1} xs={1} />
          </Grid>

        </div>
      </MuiThemeProvider>
    );
  }
}

HeadshotContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HeadshotContainer;

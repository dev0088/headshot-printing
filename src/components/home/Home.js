import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ImageLoader from 'react-loading-image';
import HeadshotAPI from 'apis/headshotAPIs'
import { materialStyles } from 'styles/material/index';
import Spacer from '../common/material/Spacer';
import * as appUtils from 'utils/appUtils';
import * as productionActions from 'actions/productionActions';


class Home extends Component {
    state = {
        loading: false,
        productions: []
    };

    componentWillMount() {
        this.setState({loading: true}, () => {
            HeadshotAPI.getProductions(this.handleGetProductionsResponse);
        });
    }

    handleGetProductionsResponse = (response, isFailed) => {
        this.setState({productions: response, loading: false});
    };

    handleClickGallery = (productionId) => {
        this.props.productionActions.initProductionState();
    };

    render() {
        const { classes } = this.props;
        const { loading, productions } = this.state;
        
        return (
          <div>
              <Grid container spacing={0} direction="row" justify="center" alignItems="center" 
                className={classNames(classes.homeContainerGrid, )}
              >
                <Grid item lg={3} md={2} xs={12}/>
                <Grid item lg={6} md={8} xs={12}>
                  <Grid container spacing={16} direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                      <Typography className={classNames(classes.homeTitle, classes.centerText)}>
                        {`PRODUCTION`}
                      </Typography> 
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classNames(classes.homeSloganTitle, classes.centerText)}>
                        {`Serving the United States, Canada and Mexico`}
                      </Typography> 
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classNames(classes.homeSloganSubTitle, classes.centerText)}>
                        {`The reading printing, imaging and video services company serving actors and performing artists nationwide`}
                      </Typography> 
                    </Grid>
                    <Grid item xs={12}>
                      <div className={classNames(classes.centerText, )}>
                        <Link to={{pathname: '/order-prints'}} className={classNames(classes.generalLink,)}>
                          <Button
                            variant="outlined"
                            color="white"
                            size="samll"
                            className={classes.homeButton}
                          >
                            {'Order Print'}
                          </Button>
                        </Link>
                        <Button
                          variant="outlined"
                          color="white"
                          size="samll"
                          className={classes.homeButton}
                        >
                          {'Order Retouching'}
                        </Button>
                        <Button
                          variant="outlined"
                          color="white"
                          size="samll"
                          className={classes.homeButton}
                        >
                          {'Order Video Services'}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={3} md={2} xs={12}/>
              </Grid>
           
            <div className={classNames(classes.homeBackgroundImageContainer, )}>
              <img src={require('images/background.jpg')} alt="home background" className={classNames(classes.homeBackgroundImage, )}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(Home));


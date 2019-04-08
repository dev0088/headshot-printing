import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import ImageLoader from 'react-loading-image';
import HeadshotAPI from 'apis/headshotAPIs'
import { materialStyles } from 'styles/material/index';
import Spacer from '../common/material/Spacer';
import * as appUtils from 'utils/appUtils';
import * as productionActions from 'actions/productionActions';


class Productions extends Component {
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
        
        let productionImages = productions.map(production => {
            return (
                <Grid item lg={3} md={3} sm={4} xs={6} 
                    onClick={() => this.handleClickGallery(production.id)}
                    key={production.id}
                >
                    <Link 
                        to={{pathname: '/production', state: {productionId: production.id}}}
                        onClick={this.handleClickGallery}
                    >
                        <ImageLoader
                            className={classes.productionsGalleryImage}
                            src={appUtils.generateImageUrl(production.gallery_image)}
                            loading={() => <CircularProgress size={20} thickness={5} />}
                            error={() => <img src={require("../../images/missing.png")} />} 
                        />
                    </Link>
                </Grid>
            );
        })

        return (
            <Paper className={classes.containerPaper}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography className={classNames(classes.generalDescriptionText, classes.bold, classes.inlineText)}>
                            {`Reproductions is the leading headshot retouching and printing company, serving actors and other performing artists nationwide. 
                            With offices in NY and LA, Reproductions has set the standard for high quality photographic printing 
                            and superior level of customer service since 1991. From choosing a photographer to processing a print order, 
                            Reproductions ensures the client experience is seamless. For more information, visit www.reproductions.com.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}><Spacer size={5}/></Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={24}>
                            {productionImages}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(Productions));


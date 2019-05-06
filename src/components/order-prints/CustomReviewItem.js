import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { materialStyles } from 'styles/material/index';

class CustomReviewItem extends Component {
  render = () => {
    const { name, value, classes } = this.props
    return (
      <Grid item sm={12} className={classNames(classes.reviewGridItemContainer)}>
        <Grid item sm={4} className={classNames(classes.reviewItemTitle)}>
          { name }
        </Grid>
        <Grid item sm={8} className={classNames(classes.reviewItemValueText)}>
          { value }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(CustomReviewItem);

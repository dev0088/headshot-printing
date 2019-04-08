import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import { materialStyles } from '../../styles/material/index';

class Error extends React.Component {
  render () {
    const { title, content } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <h2>{title}</h2>
          <p>{content}</p>
          <Link to="/">
            <Button
              color="primary"
            >
            Go To Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
};

export default withStyles(materialStyles)(Error);

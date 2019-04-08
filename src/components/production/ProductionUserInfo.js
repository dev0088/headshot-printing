import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import * as appUtils from '../../utils/appUtils';
import { materialStyles } from '../../styles/material/index';


class ProductionUserInfo extends Component {
  state = {
    hasImage: false,
    fileName: '',
    email: ''
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ hasImage: nextProps.hasImage });
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.checked }, () => {
      this.props.onChange(name, this.state[name]);
    });
  };

  handleChangeText = (name, event) => {
    this.setState({
      [name]: event.target.value,
    }, () => {
      this.props.onChange(name, this.state[name]);
    });
  };

  render = () => {
    const { production, classes } = this.props;
    const { hasImage, fileName, email } = this.state;

    return (
      <Grid container spacing={16} alignItems="center">
        <Grid item xs={12}>
          <Typography className={classNames(classes.itemTitleText)}>
            { `Do We Have Your Image?` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.listItems}>
            <ul className={classes.listItems}>
              <li>
                <Typography className={classNames(classes.generalDescriptionText)}>
                  { `If we have your image: please provide a specific file name and/or 
                    a specific description (e.g.smiling, red shirt, vertical, indoor, 
                    recently retouched by Reproductions etc.)` }
                </Typography>
              </li>
              <li>
                <Typography className={classNames(classes.generalDescriptionText)}>
                  { `If we have your image: please provide a specific file name and/or 
                    a specific description (e.g.smiling, red shirt, vertical, indoor, 
                    recently retouched by Reproductions etc.)` }
                </Typography>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row className={classes.listItems}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasImage}
                  onChange={event => this.handleChange('hasImage', event)}
                  value="hasImage"
                  color="primary"
                />
              }
              label="Yes, Reproductions has my image"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Enther file name or description` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-full-width"
            label="File name"
            style={{ margin: 8 }}
            placeholder="Please enter a file name"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={fileName}
            onChange={event => this.handleChangeText('fileName', event)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Enter your email address` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            style={{ margin: 8 }}
            placeholder="Please enter your email"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={event => this.handleChangeText('email', event)}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(ProductionUserInfo);

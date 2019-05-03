import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import * as appUtils from '../../utils/appUtils';
import { materialStyles } from '../../styles/material/index';

class CustomSelect extends Component {
  state = {
    value: this.props.value,
    labelWidth: 0,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ value: nextProps.value });
  }

  handleChange = event => {
    this.props.onChange(event.target.value)
    // this.setState({ value: event.target.value }, () => {
    //   this.props.onChange(event.target.value)
    // });
  };

  render = () => {
    const { list, classes } = this.props;
    const { value } = this.state;
    let selections = [];

    if (list) {
      selections = list.map((each, index) => {
        return (<MenuItem key={index} value={each.id}>{each.caption}</MenuItem>);
      });
    }

    return (
      <FormControl variant="outlined" className={classNames(classes.formControl, classes.noMargin)}>
        <Select
          value={value ? value : ""}
          onChange={this.handleChange}
          input={
            <OutlinedInput
              labelWidth={0}
              name="id"
            />
          }
          color="primary"
        >
          { selections }
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(materialStyles)(CustomSelect);

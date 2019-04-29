import React, { Component, createRef } from 'react';
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
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/HighlightOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Dropzone from 'react-dropzone'
import * as appUtils from '../../utils/appUtils';
import { materialStyles } from '../../styles/material/index';

const FontFamilyList = [
  {caption: "Arial", id: "Arial"},
  {caption: "Helvetica", id: "Helvetica"},
  {caption: "Times New Roman", id: "Times New Roman"},
  {caption: "Courier New", id: "Courier New"},
  {caption: "Verdana", id: "Verdana"}
];
const TextStyleList = [
  {caption: "Uppercase", id: "Uppercase"},
  {caption: "Upper and Lower Case", id: "Upper and Lower Case"},
  {caption: "Lowercase", id: "Lowercase"},
];
const MoveNameList = [
  {caption: "Lower Top", id: "Lower Top"},
  {caption: "Higher Top", id: "Higher Top"},
  {caption: "More Left", id: "More Left"},
  {caption: "Less Left", id: "Less Left"},
];
const TransformSyle = {
  "Uppercase" : "uppercase",
  "Upper and Lower Case": "capitalize",
  "Lowercase": "lowercase",
};

class ProductProof extends Component {

  render = () => {
    const { data, classes } = this.props;
    const { 
      firstname, middlename, lastname, 
      fontFamily, textStyle, borderColor, textColor,
      moveName, placement, lineColor, checkedCover,
      uploadImageUrl: photo,
    } = data;
    let styleValue = data.styleValue ? data.styleValue : 0;;
    let yourName = '';
    if (firstname && firstname.length > 0) yourName = firstname + ' ';
    if (middlename && middlename.length > 0) yourName += middlename + ' ';
    if (lastname && lastname.length > 0) yourName += lastname + ' ';
    const { reviewLayout } = appUtils;
    let customCaptionStyle = {};
    customCaptionStyle['fontFamily'] = fontFamily;
    customCaptionStyle['textTransform'] = TransformSyle[textStyle];
    customCaptionStyle['color'] = textColor;
    customCaptionStyle = Object.assign(
      customCaptionStyle, 
      reviewLayout[styleValue].style
    );
    if (moveName === 'Lower Top') {
      customCaptionStyle['top'] = 10;
    }
    else if (moveName === 'Higher Top') {
      customCaptionStyle['top'] = -10;
    }
    else if (moveName === 'More Left') {
      if (customCaptionStyle['left']) {
        customCaptionStyle['left'] += 10;
      }
      else {
        customCaptionStyle['right'] += 10; 
      }
    }
    else {
      if (customCaptionStyle['left']) {
        customCaptionStyle['left'] -= 10;
      }
      else {
        customCaptionStyle['right'] -= 10; 
      }
    }

    const customImageStyle = (placement === 'On Border') ? 
      {
        borderColor: `0px none`,
      } : {
        borderColor: `1px solid ${borderColor}`,
      };
    const customContainerStyle = (placement === 'On Border') ? 
      {
        borderColor: `1px solid ${borderColor}`,
      } : {};

    return (
      <Grid container alignItems="center">
        <Grid item sm={1} />
        <Grid item xs={12} sm={10} className={classNames(classes.swipeableGridContainer)}>
          <Grid item sm={12}>
            <div className={classNames(classes.itemRealImage)} style={customContainerStyle}>
              <img style={customImageStyle} src={photo ? photo.preview : require(`images/samples/${reviewLayout[styleValue].photo}`)} />
              <Typography 
                style={ customCaptionStyle } 
                className={classNames(classes.itemRealImageName)}
              >
                {yourName.length === 0 ? 'Your name Here' : yourName}
              </Typography>
            </div>
          </Grid>
          <Grid item sm={12} className={classNames(classes.descriptionContainer)}>
            <Typography className={classNames(classes.customizeTitle)}>
              Customize Your Layout
            </Typography>
            <Typography className={classNames(classes.customizeDescription)}>
              We set this ordering system to default to the most common layout.
              Please make any of the changes you would like and click 'Apply'
            </Typography>
            <Grid item sm={12}>
              <Typography className={classNames(classes.customizeTextLabel, classes.colorCustomizeTitle)}>
                { `Enter your name as it will appear on your print` }
              </Typography>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer)}>
              <Grid item sm={4}>
                <TextField
                  id="firstname"
                  type="text"
                  placeholder="First Name"
                  fullWidth
                  disabled
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={firstname}
                  className={classNames(classes.formControl, classes.formTextControl)}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="middlename"
                  type="text"
                  placeholder="Middle Name"
                  fullWidth
                  disabled
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={middlename}
                  className={classNames(classes.formControl, classes.formTextControl)}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  id="lastname"
                  type="text"
                  placeholder="Last Name"
                  fullWidth
                  disabled
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={lastname}
                  className={classNames(classes.formControl, classes.formTextControl)}
                />
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Change Font` }
              </Grid>
              <Grid item sm={8}>
                {fontFamily}
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Change case` }
              </Grid>
              <Grid item sm={8}>
                {textStyle}
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer, classes.alignItemCenter)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Border Color` }
              </Grid>
              <Grid item sm={8}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={borderColor === 'white'}
                      value={"White"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"White"}
                      disabled
                    />
                  }
                  label="white"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={borderColor === 'black'}
                      value={"Black"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"Black"}
                      disabled
                    />
                  }
                  label="black"
                />
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer, classes.alignItemCenter)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Change Text Color` }
              </Grid>
              <Grid item sm={8}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={textColor === 'black'}
                      value={"Black"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"Black"}
                      disabled
                    />
                  }
                  label="white"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={textColor === 'white'}
                      value={"White"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"White"}
                      disabled
                    />
                  }
                  label="black"
                />
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Move name` }
              </Grid>
              <Grid item sm={8}>
                {moveName}
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer, classes.alignItemCenter)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Name Placement` }
              </Grid>
              <Grid item sm={8}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={placement === 'On Border'}
                      value={"On Border"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"On Border"}
                      disabled
                    />
                  }
                  label="On Border"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={placement === 'On Image'}
                      value={"On Image"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"On Image"}
                      disabled
                    />
                  }
                  label="On Image"
                />
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer, classes.alignItemCenter)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Line Color` }
              </Grid>
              <Grid item sm={8}>
                <FormControlLabel
                  control={
                    <Radio
                      checked={lineColor === 'Black Line'}
                      value={"Black Line"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"Black Line"}
                      disabled
                    />
                  }
                  label="Black Line"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={lineColor === 'White Line'}
                      value={"White Line"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"White Line"}
                      disabled
                    />
                  }
                  label="White Line"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={lineColor === 'No Line'}
                      value={"No Line"}
                      color="default"
                      name="radio-button-demo"
                      aria-label={"No Line"}
                      disabled
                    />
                  }
                  label="No Line"
                />
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer, classes.colorCustomizeTitle, classes.alignItemCenter)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Cover image to black and white` }
              </Grid>
              <Grid item sm={8}>
                <Checkbox
                  checked={checkedCover}
                  color="default"
                  value="cover"
                  style={{ padding: '0 10px' }}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(ProductProof);

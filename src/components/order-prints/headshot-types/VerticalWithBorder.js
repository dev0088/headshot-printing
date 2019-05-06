import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import styled from 'styled-components';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImageLoader from 'react-loading-image';
import * as productionActions from 'actions/productionActions';
import { materialStyles } from 'styles/material/index';
import * as appUtils from 'utils/appUtils';
import CustomSelect from '../CustomSelect';
import PreviewImg from 'components/common/styled/PreviewImage.js';

class VerticalWithBorder extends Component {
  state = {
    firstname: '',
    lastname: '',
    middlename: '',
    moveName: appUtils.MoveNameList[0].id,
    placement: appUtils.PlacemetList[0],
    lineColor: appUtils.LineColorList[2],
    checkedCover: false,
    containerStyle: {},
    captionStyle: {},
    imageStyle: {},
  };

  componentWillMount() {
    const { layoutIndex } = this.props;
    this.setState({
      containerStyle: appUtils.reviewLayout[layoutIndex].style.containerStyle,
      captionStyle: appUtils.reviewLayout[layoutIndex].style.captionStyle,
      imageStyle: appUtils.reviewLayout[layoutIndex].style.imageStyle,
    }, () => {
      this.props.onChange(this.state);
    })
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.checked }, () => {
      this.props.onChange(this.state);
    });
  };

  handleChangeText = (name, event) => {
    this.setState({
      [name]: event.target.value,
    }, () => {
      this.props.onChange(this.state);
    });
  };

  handleChangeFont = (family) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    newCaptionStyle.fontFamily = family;
    this.setState({captionStyle: newCaptionStyle}, () => {
      this.props.onChange(this.state);
    });
  };

  handleChangeTextStyle = (style) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    newCaptionStyle.textTransform = style;
    this.setState({captionStyle: newCaptionStyle}, () => {
      this.props.onChange(this.state);
    });
  };

  handleTextColorChange = (color) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    newCaptionStyle.color = color;
    this.setState({captionStyle: newCaptionStyle}, () => {
      this.props.onChange(this.state);
    });
  };

  handleBorderColorChange = (color) => {
    const { containerStyle } = this.state;
    let newContainerStyle = Object.assign({}, containerStyle);
    newContainerStyle.backgroundColor = color;
    this.setState({ containerStyle: newContainerStyle }, () => {
      this.props.onChange(this.state);
    });
  };

  handleMoveNameStyle = (name) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    
    if (name === 'Lower Top') {
      if (newCaptionStyle['top']) {
        newCaptionStyle['top'] -= 10;
      } else {
        newCaptionStyle['bottom'] -= 10; 
      }
    } else if (name === 'Higher Top') {
      if (newCaptionStyle['top']) {
        newCaptionStyle['top'] += 10;
      } else {
        newCaptionStyle['bottom'] += 10; 
      }
    } else if (name === 'More Left') {
      if (newCaptionStyle['left']) {
        newCaptionStyle['left'] += 10;
      } else {
        newCaptionStyle['right'] += 10; 
      }
    } else if (name === 'Less Left') {
      if (newCaptionStyle['left']) {
        newCaptionStyle['left'] -= 10;
      } else {
        newCaptionStyle['right'] -= 10; 
      }
    }
    this.setState({captionStyle: newCaptionStyle, moveName: name}, () => {
      this.props.onChange(this.state);
    });
  };

  handlePlacementChange = (place) => {
    const { containerStyle, imageStyle, captionStyle } = this.state;
    let newContainerStyle = Object.assign({}, containerStyle);
    let newCaptionStyle = Object.assign({}, captionStyle);
    let newImageStyle = Object.assign({}, imageStyle);
    if (place === 'On Border') {
      newContainerStyle.padding = '30px 24px 30px 24px';
      newCaptionStyle.position = null;
      newCaptionStyle.top = null;
      newCaptionStyle.bottom = -3;
      newCaptionStyle.right = 0;
    } else {
      newCaptionStyle.top = null;
      newCaptionStyle.bottom = 33;
      newCaptionStyle.right = 12;
    }
    this.setState({
      containerStyle: newContainerStyle,
      captionStyle: newCaptionStyle,
      imageStyle: newImageStyle,
      placement: place
    }, () => {
      this.props.onChange(this.state);
    });
  };

  handleLineColorChange = (lineC) => {
    const { imageStyle } = this.state;
    let newImageStyle = Object.assign({}, imageStyle);
    
    if (lineC === 'Black Line') {
      newImageStyle['outline'] = `3px solid black`;
      newImageStyle['outlineOffset'] = '-3px';
    } else if (lineC === 'White Line') {
      newImageStyle['outline'] = `3px solid white`;
      newImageStyle['outlineOffset'] = '-3px';
    } else if (lineC === 'No Line') {
      newImageStyle['outline'] = null;
      newImageStyle['outlineOffset'] = null;
    }

    this.setState({
      imageStyle: newImageStyle,
      lineColor: lineC
    }, () => {
      this.props.onChange(this.state);
    });
  };

  handleToggleCover = (event) => {
    this.setState({ checkedCover: event.target.checked }, () => {
      this.props.onChange(this.state);
    });
  };

  render = () => {
    const { production, classes } = this.props;
    const { 
      firstname, middlename, lastname,
      moveName, placement, lineColor,
      containerStyle, captionStyle, imageStyle
    } = this.state;
    let yourName = '';
    if (firstname.length > 0) yourName = firstname + ' ';
    if (middlename.length > 0) yourName += middlename + ' ';
    if (lastname.length > 0) yourName += lastname + ' ';

    return (
      <Grid item xs={12} className={classNames(classes.flexContainer)}>
        <Grid item sm={6} className={classNames(classes.reviewImageContainerGridItem)}>
          <div id="preview-headshot" className={classNames(classes.itemRealImage)} style={containerStyle}>
            <ImageLoader
              src={(production.uploadImageUrl && production.uploadImageUrl.preview) ? production.uploadImageUrl.preview : require(`images/missing.png`)}
              image={props => <PreviewImg style={imageStyle} {...props}/>}
              loading={() => 
                <div style={imageStyle}>
                  <CircularProgress
                    variant="indeterminate"
                    className={classes.loadingProgress}
                    disableShrink
                    size={60}
                    thickness={4}
                  />
                </div>
              }
              error={() => <div>Error</div>} 
            />
            <Typography 
              style={ captionStyle } 
              className={classNames(classes.itemRealImageName)}
            >
              {yourName.length === 0 ? 'Your name Here' : yourName}
            </Typography>
          </div>
        </Grid>
        <Grid item sm={6} className={classNames(classes.descriptionContainer)}>
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
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstname}
                onChange={event => this.handleChangeText('firstname', event)}
                className={classNames(classes.formControl, classes.formTextControl)}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                id="middlename"
                type="text"
                placeholder="Middle Name"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={middlename}
                onChange={event => this.handleChangeText('middlename', event)}
                className={classNames(classes.formControl, classes.formTextControl)}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                id="lastname"
                type="text"
                placeholder="Last Name"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={lastname}
                onChange={event => this.handleChangeText('lastname', event)}
                className={classNames(classes.formControl, classes.formTextControl)}
              />
            </Grid>
          </Grid>
          <Grid item sm={12} className={classNames(classes.flexContainer)}>
            <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
              { `Change Font` }
            </Grid>
            <Grid item sm={8}>
              <CustomSelect
                list={appUtils.FontFamilyList}
                value={captionStyle.fontFamily}
                onChange={this.handleChangeFont}
              />
            </Grid>
          </Grid>
          <Grid item sm={12} className={classNames(classes.flexContainer)}>
            <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
              { `Change case` }
            </Grid>
            <Grid item sm={8}>
              <CustomSelect
                list={appUtils.TextStyleList}
                value={captionStyle.textTransform}
                onChange={this.handleChangeTextStyle}
              />
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
                    checked={containerStyle.backgroundColor === appUtils.Color.white}
                    onChange={() => this.handleBorderColorChange(appUtils.Color.white)}
                    value={appUtils.Color.white}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"White"}
                  />
                }
                label="white"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={containerStyle.backgroundColor === appUtils.Color.black}
                    onChange={() => this.handleBorderColorChange(appUtils.Color.black)}
                    value={appUtils.Color.black}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"Black"}
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
                    checked={captionStyle.color === appUtils.Color.black}
                    onChange={() => this.handleTextColorChange(appUtils.Color.black)}
                    value={appUtils.Color.black}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"Black"}
                  />
                }
                label="Black"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={captionStyle.color === appUtils.Color.white}
                    onChange={() => this.handleTextColorChange(appUtils.Color.white)}
                    value={appUtils.Color.white}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"White"}
                  />
                }
                label="White"
              />
            </Grid>
          </Grid>
          <Grid item sm={12} className={classNames(classes.flexContainer)}>
            <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
              { `Move name` }
            </Grid>
            <Grid item sm={8}>
              <CustomSelect
                list={appUtils.MoveNameList}
                value={moveName}
                onChange={this.handleMoveNameStyle}
              />
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
                    onChange={() => this.handlePlacementChange('On Border')}
                    value={"On Border"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"On Border"}
                  />
                }
                label="On Border"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={placement === 'On Image'}
                    onChange={() => this.handlePlacementChange('On Image')}
                    value={"On Image"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"On Image"}
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
                    onChange={() => this.handleLineColorChange('Black Line')}
                    value={"Black Line"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"Black Line"}
                  />
                }
                label="Black Line"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={lineColor === 'White Line'}
                    onChange={() => this.handleLineColorChange('White Line')}
                    value={"White Line"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"White Line"}
                  />
                }
                label="White Line"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={lineColor === 'No Line'}
                    onChange={() => this.handleLineColorChange('No Line')}
                    value={"No Line"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"No Line"}
                  />
                }
                label="No Line"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => {
  const { productions, production } = state;
  return {
    productions,
    production
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    productionActions: bindActionCreators(productionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(VerticalWithBorder));


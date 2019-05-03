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
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImageLoader from 'react-loading-image';
import * as productionActions from 'actions/productionActions';
import { materialStyles } from 'styles/material/index';
import * as appUtils from 'utils/appUtils';
import CustomSelect from './CustomSelect';
import domtoimage from 'dom-to-image';
import HeadshotAPI from 'apis/headshotAPIs';

const PreviewImg = styled.div`
  background-image: url(${props => props.src});
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
`;

class ProductionReview extends Component {
  state = {
    styleValue: 0,
    firstname: '',
    lastname: '',
    middlename: '',
    moveName: appUtils.MoveNameList[0].id,
    placement: appUtils.PlacemetList[0],
    lineColor: appUtils.LineColorList[0],
    checkedCover: false,
    containerStyle: {},
    captionStyle: {},
    imageStyle: {},
    imageClassNames: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  };

  componentWillMount() {
    this.setState({
      containerStyle: appUtils.reviewLayout[0].style.containerStyle,
      captionStyle: appUtils.reviewLayout[0].style.captionStyle,
      imageStyle: appUtils.reviewLayout[0].style.imageStyle,
      imageClassNames: null
    })
  }

  handleChange = (name, event) => {
    console.log(name, event.target.checked);
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

  handleStyleChange = (event) => {
    console.log(event.target.value);
    this.setState({ styleValue: event.target.value });
  };

  handleChangeFont = (family) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    newCaptionStyle.fontFamily = family;
    this.setState({captionStyle: newCaptionStyle});
  };

  handleChangeTextStyle = (style) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    newCaptionStyle.textTransform = style;
    this.setState({captionStyle: newCaptionStyle});
  };

  handleTextColorChange = (color) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);
    newCaptionStyle.color = color;
    console.log('==== color: ', color)
    this.setState({captionStyle: newCaptionStyle});
  };

  handleBorderColorChange = (color) => {
    const { containerStyle } = this.state;
    let newContainerStyle = Object.assign({}, containerStyle);
    newContainerStyle.borderColor = color;
    this.setState({ containerStyle: newContainerStyle });
  };

  handleMoveNameStyle = (name) => {
    const { captionStyle } = this.state;
    let newCaptionStyle = Object.assign({}, captionStyle);;
    console.log('==== name: ', name);
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
    this.setState({captionStyle: newCaptionStyle, moveName: name});
  };

  handlePlacementChange = (place) => {
    const { containerStyle, imageStyle, captionStyle } = this.state;
    let newContainerStyle = Object.assign({}, containerStyle);
    let newCaptionStyle = Object.assign({}, captionStyle);
    let newImageStyle = Object.assign({}, imageStyle);
    console.log('==== place: ', place);
    if (place === 'On Border') {
      newContainerStyle.padding = 25;
      newCaptionStyle.position = null;
      newImageStyle.width = 380;
      newImageStyle.height = 480;
    } else {
      newContainerStyle.padding = 0;
      newCaptionStyle.position = 'absolute';
      newCaptionStyle.top = null;
      newImageStyle.width = 400;
      newImageStyle.height = 500;
    }
    this.setState({
      containerStyle: newContainerStyle,
      captionStyle: newCaptionStyle,
      imageStyle: newImageStyle,
      placement: place
    });
  };

  handleLineColorChange = (lineC) => {
    console.log('===== lineC: ', lineC);
    const { imageClassNames, imageStyle } = this.state;
    const { classes } = this.props;
    let newImageClassNames = Object.assign({}, imageClassNames);
    
    if (lineC === 'Black Line') {
      newImageClassNames = classNames(classes.itemRealImage, classes.borderColorBlack);
    } else if (lineC === 'White Line') {
      newImageClassNames = classNames(classes.itemRealImage, classes.borderColorWhite);
    } else if (lineC === 'No Line') {
      newImageClassNames = classNames(classes.itemRealImage, classes.borderColorNone);
    }

    this.setState({
      imageClassNames: newImageClassNames, 
      lineColor: lineC
    });
  };

  handleToggleCover = (event) => {
    this.setState({ checkedCover: event.target.checked });
  };

  render = () => {
    const { production, classes, photo, uploadImageUrl } = this.props;
    const { 
      styleValue, firstname, middlename, lastname,
      moveName, placement, lineColor, checkedCover,
      containerStyle, captionStyle, imageStyle, imageClassNames
    } = this.state;
    const { reviewLayout } = appUtils;
    let yourName = '';
    if (firstname.length > 0) yourName = firstname + ' ';
    if (middlename.length > 0) yourName += middlename + ' ';
    if (lastname.length > 0) yourName += lastname + ' ';
    if (lineColor === "")

    console.log('=== this.state: ', this.state);

    return (
      <Grid container alignItems="center">
        <Grid item sm={1} />
        <Grid item xs={12} sm={10} className={classNames(classes.swipeableGridContainer)}>
          <Grid item xs={12} className={classNames(classes.sampleContainer)}>
            {reviewLayout.map(each => {
              return (
                <Grid item xs={6} sm={4} key={each.id} className={classNames(classes.samplePhotoEach)}>
                  <div className={classNames(classes.itemLayoutImage)}>
                    <img src={require(`images/samples/${each.photo}`)} alt=""/>
                    <Typography style={each.style} className={classNames(classes.itemLayoutImageName)}>
                      Your Name Here
                    </Typography>
                  </div>
                  <Typography className={classNames(classes.itemTitleText)}>
                    { each.title }
                  </Typography>
                  <Radio
                    checked={styleValue === each.id}
                    onChange={this.handleStyleChange}
                    value={each.id}
                    color="default"
                    name="radio-button-demo"
                    aria-label={each.id}
                  />
                </Grid>);
            })}
          </Grid>
          <Grid item xs={12} className={classNames(classes.flexContainer)}>
            <Grid item sm={5} className={classNames(classes.reviewImageContainerGridItem)}>
              <div id="preview-headshot" className={classNames(classes.itemRealImage)} style={containerStyle}>
                <ImageLoader
                  src={(production.uploadImageUrl && production.uploadImageUrl.preview) ? production.uploadImageUrl.preview : require(`images/missing.png`)}
                  image={props => <PreviewImg {...props}/>}
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
            <Grid item sm={7} className={classNames(classes.descriptionContainer)}>
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
                        checked={containerStyle.borderColor === appUtils.Color.white}
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
                        checked={containerStyle.borderColor === appUtils.Color.black}
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
              <Grid item sm={12} className={classNames(classes.flexContainer, classes.colorCustomizeTitle, classes.alignItemCenter)}>
                <FormControlLabel
                  classes={{
                    label: classes.colorCustomizeTitle,
                  }}
                  control={
                    <Checkbox
                      checked={checkedCover}
                      onChange={this.handleToggleCover}
                      color="default"
                      value="cover"
                      style={{ padding: '0 10px' }}
                    />
                  }
                  label="Cover image to black and white"
                  labelPlacement="start"
                />
              </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductionReview));

// export default withStyles(materialStyles)(ProductionReview);

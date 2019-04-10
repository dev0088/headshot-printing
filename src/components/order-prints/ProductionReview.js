import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
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

class ProductionReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleValue: 0,
      firstname: '',
      lastname: '',
      middlename: '',
      fontFamily: FontFamilyList[0].id,
      textStyle: TextStyleList[0].id,
      borderColor: 'black',
      textColor: 'black',
      moveName: MoveNameList[0].id,
      placement: 'On Border',
      lineColor: 'Black Line',
      checkedCover: false,
    };
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
  }

  handleChangeFont = (family) => {
    this.setState({ fontFamily: family });
  }

  handleChangeTextStyle = (style) => {
    this.setState({ textStyle: style })
  }

  handleTextColorChange = (color) => {
    this.setState({ textColor: color });
  }

  handleBorderColorChange = (color) => {
    this.setState({ borderColor: color });
  }

  handleMoveNameStyle = (name) => {
    this.setState({ moveName: name });
  }

  handlePlacementChange = (place) => {
    this.setState({ placement: place });
  }

  handleLineColorChange = (lineC) => {
    this.setState({ lineColor: lineC });
  }

  handleToggleCover = (event) => {
    this.setState({ checkedCover: event.target.checked });
  }

  render = () => {
    const { production, classes, photo } = this.props;
    const { 
      styleValue, firstname, middlename, lastname, 
      fontFamily, textStyle, borderColor, textColor,
      moveName, placement, lineColor, checkedCover
    } = this.state;
    const { reviewLayout } = appUtils;
    let yourName = '';
    if (firstname.length > 0) yourName = firstname + ' ';
    if (middlename.length > 0) yourName += middlename + ' ';
    if (lastname.length > 0) yourName += lastname + ' ';
    let customCaptionStyle = {};
    customCaptionStyle['fontFamily'] = fontFamily;
    customCaptionStyle['textTransform'] = TransformSyle[textStyle];
    customCaptionStyle['color'] = textColor;
    customCaptionStyle = Object.assign(customCaptionStyle, reviewLayout[styleValue].style);
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
      } : {

      }
    let amount = 0;
    let price = 0;

    let currentQuantiry = production.production ? production.production.production_quantities.find(quantity => {
      return quantity.id === production.quantityId;
    }) : null;
    if (currentQuantiry) {
      amount = currentQuantiry.amount;
      price = currentQuantiry.plus_price;
    }

    return (
      <Grid container alignItems="center">
        <Grid item sm={1} />
        <Grid item xs={12} sm={10} className={classNames(classes.swipeableGridContainer)}>
          <Grid item xs={12} className={classNames(classes.sampleContainer)}>
            {reviewLayout.map(each => {
              return (
                <Grid item xs={6} sm={4} key={each.id} className={classNames(classes.samplePhotoEach)}>
                  <div className={classNames(classes.itemLayoutImage)}>
                    <img src={require(`../../images/samples/${each.photo}`)} />
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
            <Grid item sm={5}>
              <div className={classNames(classes.itemRealImage)} style={customContainerStyle}>
                <img style={customImageStyle} src={photo ? photo.preview : require(`../../images/samples/${reviewLayout[styleValue].photo}`)} />
                <Typography 
                  style={ customCaptionStyle } 
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
                    list={FontFamilyList}
                    value={fontFamily}
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
                    list={TextStyleList}
                    value={textStyle}
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
                        checked={borderColor === 'white'}
                        onChange={() => this.handleBorderColorChange('white')}
                        value={"White"}
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
                        checked={borderColor === 'black'}
                        onChange={() => this.handleBorderColorChange('black')}
                        value={"Black"}
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
                        checked={textColor === 'black'}
                        onChange={() => this.handleTextColorChange('black')}
                        value={"Black"}
                        color="default"
                        name="radio-button-demo"
                        aria-label={"Black"}
                      />
                    }
                    label="white"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={textColor === 'white'}
                        onChange={() => this.handleTextColorChange('white')}
                        value={"White"}
                        color="default"
                        name="radio-button-demo"
                        aria-label={"White"}
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
                  <CustomSelect
                    list={MoveNameList}
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
        {/*<Grid item xs={12}>
          <Typography className={classNames(classes.itemTitleText)}>
            { `Review Your Order` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `It looks like we have gone over everything we need to proceed with your order. 
              Please take a moment to review the details below and confirm that everything is correct. 
              You can make changes using the buttons provided to return to a previous section.` }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Stripe Payment` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Headshots` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Quantity: ${amount}` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `$${price}` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Set-up fee` }
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `$${25}` }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Your infomation` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Image on File: ${production.hasImage ? 'Yes' : 'No'}, Reproductions already has my image.` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `File name or image description: ${production.fileName}` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.generalDescriptionText)}>
            { `Your email address: ${production.email}` }
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classNames(classes.itemSubTitleText)}>
            { `Image` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageLoader
            className={classes.productionGalleryImage}
            src={production.headshot ? production.headshot.cloudinary_image_url : ''}
            loading={() => <CircularProgress size={20} thickness={5} />}
            error={() => <img src={require("../../images/missing.png")} alt="missing" />} 
          />
        </Grid>*/}
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductionReview));

// export default withStyles(materialStyles)(ProductionReview);

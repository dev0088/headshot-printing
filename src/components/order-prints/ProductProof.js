import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styled from 'styled-components';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import ImageLoader from 'react-loading-image';
import * as appUtils from 'utils/appUtils';
import { materialStyles } from 'styles/material/index';

const PreviewImg = styled.div`
  background-image: url(${props => props.src});
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
`;

class ProductProof extends Component {
  state = {
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

  render = () => {
    const { containerStyle, captionStyle, imageStyle } = this.state;
    const { data, production, classes } = this.props;
    const { 
      firstname, middlename, lastname, 
      // fontFamily, textStyle, borderColor, textColor,
      moveName, placement, lineColor, checkedCover,
      uploadImageUrl: photo,
    } = data;
    let styleValue = data.styleValue ? data.styleValue : 0;;
    let yourName = '';
    if (firstname && firstname.length > 0) yourName = firstname + ' ';
    if (middlename && middlename.length > 0) yourName += middlename + ' ';
    if (lastname && lastname.length > 0) yourName += lastname + ' ';
    const { reviewLayout } = appUtils;

    return (
      <Grid container alignItems="center" className={classNames(classes.swipeableGridContainer)}>
        <Grid item xs={12} sm={10} className={classNames(classes.flexContainer)}>
          <Grid item sm={5} className={classNames(classes.reviewImageContainerGridItem)}>
            <div className={classNames(classes.itemRealImage)}>
              <ImageLoader
                src={(production && production.headshot && production.headshot.cloudinary_image_url) ? production.headshot.cloudinary_image_url : require(`images/missing.png`)}
                
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
                {captionStyle.fontFamily}
              </Grid>
            </Grid>
            <Grid item sm={12} className={classNames(classes.flexContainer)}>
              <Grid item sm={4} className={classNames(classes.colorCustomizeTitle)}>
                { `Change case` }
              </Grid>
              <Grid item sm={8}>
                { captionStyle.textTransform }
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
                      checked={captionStyle.color === 'white'}
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
                      checked={containerStyle.borderColor === 'black'}
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
                      checked={captionStyle.color === 'black'}
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
                      checked={captionStyle.color === 'white'}
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


const mapStateToProps = (state) => {
  const { production } = state;
  return {
    production
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(materialStyles)(ProductProof));

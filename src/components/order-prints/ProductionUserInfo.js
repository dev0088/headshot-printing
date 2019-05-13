import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import { materialStyles } from 'styles/material/index';
import StripeCheckoutButton from './stripe/StripeCheckoutButton';
import * as appUtils from 'utils/appUtils';


class ProductionUserInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imageURL: null, 
      fileName: '',
      email: ''
    };
    this.dropzoneRef = createRef();
  }

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

  onPreviewDrop = (files) => {
    let file = files[0];
    let previewFile = Object.assign({}, file);
    previewFile.preview = URL.createObjectURL(file);
    
    this.setState({ file: previewFile });
    this.props.onChange('uploadFile', file);
    this.props.onChange('uploadImageUrl', previewFile);
  }

  onRemovePreview = () => {
    this.setState({ file: null });
  }

  handleBack = () => {
    this.props.handleBack();
  }

  handleNext = () => {
    this.props.handleNext();
  }

  render = () => {
    const { production, classes } = this.props;
    const { fileName, email, file } = this.state;
    return (
      <Grid>
        <Grid container alignItems="center">
          <Grid item xl={3} lg={2} md={2} sm={2} xs={1} />
          <Grid item xl={6} lg={8} md={8} sm={8} xs={10} className={classNames(classes.swipeableGridContainer, )}>
            <React.Fragment>
              <Grid item xs={12}>
                <Typography className={classNames(classes.itemTitleText, classes.colorBlack)}>
                  { `Add your headshots` }
                </Typography> 
              </Grid>
              <Grid item xs={12} >
                {file && (
                  <Grid item xs={12} className={classNames(classes.previewContainer)}>
                    <img
                      alt="Preview"
                      key={file.preview}
                      src={file.preview}
                      className={classNames(classes.previewStyle)}
                    />
                    <div className={classNames(classes.previewClose)} onClick={this.onRemovePreview}>
                      <CloseIcon className={classNames(classes.previewCloseIcon)} />
                    </div>
                  </Grid>
                )}
                <Dropzone 
                  ref={this.dropzoneRef}
                  accept="image/*, application/*"
                  maxFiles={1}
                  onDrop={this.onPreviewDrop}
                >
                  {({getRootProps, getInputProps}) => (
                    <div className={classNames(classes.addImageContainer)} {...getRootProps()}>
                      <div className={classNames(classes.addImageIcon)}>
                        <AddIcon className={classes.largeIcon} />
                      </div>
                      <Typography className={classNames(classes.addImageText, classes.colorBlack)}>
                        { `Add your headshot` }
                      </Typography>
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
              </Grid>
            </React.Fragment>
            <Grid item xs={12}>
              <Typography className={classNames(classes.itemSubTitleText, classes.colorBlack)}>
                { `Enter file name or description` }
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-full-width"
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
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classNames(classes.itemSubTitleText, classes.colorBlack)}>
                { `Enter your email address` }
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-email-input"
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
                className={classes.formControl}
              />
            </Grid>
               
          </Grid>        
          <Grid item xl={3} lg={2} md={2} sm={2} xs={1} />      
        </Grid>
        <Grid item xs={12} className={classes.centerText}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            disabled={this.props.state.step === 0}
            className={classes.nextButton}
            onClick={this.handleBack}
          >
            { 'Back' }
          </Button>
          {
            ((this.props.state.step === appUtils.getSteps().length - 1) && !this.props.state.paid) ? (
              <StripeCheckoutButton 
                headshot={this.props.state.headshot} 
                amount={this.props.state.totalPrice} 
                onCheckout={this.handleCheckout} 
                onPayment={this.handlePayment}
              />
            ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.nextButton}
              onClick={this.handleNext}
            >
              { this.props.state.paid ? 'Finish' : 'Next' }
            </Button>
            )
          }
        </Grid>   
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(ProductionUserInfo);

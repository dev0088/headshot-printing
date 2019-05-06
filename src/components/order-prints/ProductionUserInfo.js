import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dropzone from 'react-dropzone';
import { materialStyles } from 'styles/material/index';


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

  render = () => {
    const { production, classes } = this.props;
    const { fileName, email, file } = this.state;
    return (
      <Grid container alignItems="center">
        <Grid item xl={1} lg={1} md={1} sm={1} xs={1} />
        <Grid item xl={2} lg={3} md={6} sm={7} xs={10} className={classNames(classes.swipeableGridContainer, )}>
          <React.Fragment>
            <Grid item xs={12}>
              <Typography className={classNames(classes.itemTitleText, classes.colorBlack)}>
                { `Do we have your image because we don't` }
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
                accept="image/*"
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
        
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(ProductionUserInfo);

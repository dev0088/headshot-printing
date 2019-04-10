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
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/HighlightOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Dropzone from 'react-dropzone'
import * as appUtils from '../../utils/appUtils';
import { materialStyles } from '../../styles/material/index';


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
    let file = Object.assign({}, files[0]);
    file.preview = URL.createObjectURL(files[0]);
    this.setState({ file: file });
    this.props.onChange('uploadImageUrl', file);
  }

  onRemovePreview = () => {
    this.setState({ file: null });
  }

  render = () => {
    const { production, classes } = this.props;
    const { fileName, email, file } = this.state;
    return (
      <Grid container alignItems="center">
        <Grid item sm={1} xs={2} />
        <Grid item sm={3} xs={6} className={classNames(classes.swipeableGridContainer, )}>
          <React.Fragment>
            <Grid item xs={12}>
              <Typography className={classNames(classes.itemTitleText, classes.colorBlack)}>
                { `Do we have your iamge because we don't` }
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
                      { `Add your file` }
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

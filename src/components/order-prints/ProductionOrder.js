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

class ProductionOrder extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      burnDisk: false,
      likeOption: 1,
      additionalInstruction: '',
      price: 95,
    };
    
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
    this.props.onChange('additionalInstruction', file);
  }

  onRemovePreview = () => {
    this.setState({ file: null });
  }

  handleBurnDiskChange = (b) => {
    this.setState({ burnDisk: b });
  }

  handleLikeOptionChange = (option) => {
    this.setState({ likeOption: option });
  }

  render = () => {
    const { production, classes } = this.props;
    const { burnDisk, likeOption, additionalInstruction, file, price } = this.state;
    let total = price;
    if (likeOption === 1) {
      total += 12.5
    }
    else if (likeOption === 2) {
      total += 25;
    }
    else if (likeOption === 3) {
      total += 25;
    }
    return (
      <Grid container alignItems="center">
        <Grid item sm={3} xs={1} />
        <Grid item sm={6} xs={10} className={classNames(classes.swipeableGridContainer, )}>
          <Grid item xs={12}>
            <Typography className={classNames(classes.itemTitleText, classes.colorTitle)}>
              { `Order Electronic Files` }
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classNames(classes.itemTitleTextSmall, classes.colorBlack)}>
              { `
                Retouching includes both high-resolution printable files and low-resolution web files.
                The files will be emailed to you when your order is complete. <br/>
                If you wish to have them burned onto a CD or DVD, please choose from the options below.
                ` 
              }
            </Typography>
          </Grid>
          <Grid item sm={12} >
            <Grid item sm={6} className={classNames(classes.colorCustomizeTitle)}>
              { `Do you need us to burn a disk?` }
            </Grid>
            <Grid item sm={6}>
              <FormControlLabel
                control={
                  <Radio
                    checked={burnDisk}
                    onChange={() => this.handleBurnDiskChange(true)}
                    value={"burnTrue"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"burnTrue"}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={!burnDisk}
                    onChange={() => this.handleBurnDiskChange(false)}
                    value={"burnFalse"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"burnFalse"}
                  />
                }
                label="No"
              />
            </Grid>
          </Grid>
          <Grid item sm={12} >
            <Grid item sm={12} className={classNames(classes.colorCustomizeTitle)}>
              { `Please tell us what you would like` }
            </Grid>
            <Grid item sm={10} xsOffset={2} >
              <FormControlLabel
                control={
                  <Radio
                    checked={likeOption === 1}
                    onChange={() => this.handleLikeOptionChange(1)}
                    value={"ReleaseImage"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"ReleaseImage"}
                  />
                }
                label="Release of images from order only as E-mail or CD(+$12.5)"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={likeOption === 2}
                    onChange={() => this.handleLikeOptionChange(2)}
                    value={"PhotoShootOnly"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"PhotoShootOnly"}
                  />
                }
                label="Photo shoot only(DVD only)(+$25.00)"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={likeOption === 3}
                    onChange={() => this.handleLikeOptionChange(3)}
                    value={"Both"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"Both"}
                  />
                }
                label="Both release of images and photo shoot (DVD only)(+$25.00)"
              />
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={12} className={classNames(classes.colorCustomizeTitle)}>
              { `Please provide any additional instructions(i.e.filename)` }
            </Grid>
            <Grid item xs={12} >
              <Dropzone 
                ref={this.dropzoneRef}
                maxFiles={1}
                onDrop={this.onPreviewDrop}
              >
                {({getRootProps, getInputProps}) => (
                  <div className={classNames(classes.additionalContainer)} {...getRootProps()}>
                    <Typography className={classNames(classes.addImageText, classes.colorBlack)}>
                      { `Add your file` }
                    </Typography>
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
              {file && (
                <Grid item xs={12} className={classNames(classes.filePathContainer)} >
                  <Grid item xs={10}>
                    <Typography>{file.path}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <div className={classNames(classes.pathClose)} onClick={this.onRemovePreview}>
                      <CloseIcon className={classNames(classes.previewCloseIcon)} />
                    </div>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classNames(classes.totalPrice)}>{`Sub Total: $ ${total.toFixed(2)}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(ProductionOrder);

import React, { Component } from 'react';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CloseIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone'
import Spacer from 'components/common/material/Spacer';
import * as appUtils from 'utils/appUtils';
import { materialStyles } from 'styles/material/index';

class ProductionOrder extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      burnDisk: false,
      likeOption: 0,
      additionalInstruction: null,
      price: 0,
    };
  }

  componentWillMount = () => {
    this.props.onChange('orderElectronic', this.state);
  }

  handleChange = (name, event) => {
    this.setState({ [name]: event.target.checked }, () => {
      this.props.onChange('orderElectronic', this.state);
    });
  };

  handleChangeText = (name, event) => {
    this.setState({[name]: event.target.value}, () => {
      this.props.onChange('orderElectronic', this.state);
    });
  };

  onPreviewDrop = (files) => {
    let file = Object.assign({}, files[0]);
    file.preview = URL.createObjectURL(files[0]);
    this.setState({ file: file }, () => {
      this.props.onChange('orderElectronic', this.state);
    });
  }

  onRemovePreview = () => {
    this.setState({ file: null }, () => {
      this.props.onChange('orderElectronic', this.state);
    });
  }

  handleBurnDiskChange = (b) => {
    this.setState({ burnDisk: b }, () => {
      this.props.onChange('orderElectronic', this.state);
    });
  }

  handleLikeOptionChange = (option) => {
    this.setState({ likeOption: option }, () => {
      this.props.onChange('orderElectronic', this.state);
    });
  }

  render = () => {
    const { production, classes } = this.props;
    const { burnDisk, likeOption, file, price } = this.state;
    let total = price;
    total += appUtils.linkOptionList[likeOption].price
    
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
            <Spacer size={30} />
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
                    checked={likeOption === 0}
                    onChange={() => this.handleLikeOptionChange(0)}
                    value={"ReleaseImage"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"ReleaseImage"}
                  />
                }
                label={appUtils.linkOptionList[0].caption}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={likeOption === 1}
                    onChange={() => this.handleLikeOptionChange(1)}
                    value={"PhotoShootOnly"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"PhotoShootOnly"}
                  />
                }
                label={appUtils.linkOptionList[1].caption}
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={likeOption === 2}
                    onChange={() => this.handleLikeOptionChange(2)}
                    value={"Both"}
                    color="default"
                    name="radio-button-demo"
                    aria-label={"Both"}
                  />
                }
                label={appUtils.linkOptionList[2].caption}
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
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
              >
                {({getRootProps, getInputProps}) => (
                  <div className={classNames(classes.additionalContainer)} {...getRootProps()}>
                    <div className={classNames(classes.addImageIcon)}>
                      <AddIcon className={classes.largeIcon} />
                    </div>
                    <Typography className={classNames(classes.addImageText, classes.colorBlack, classes.inlineText)}>
                      { `Add your file ` }
                    </Typography>
                    <Typography className={classNames(classes.itemTitleTextSmall, classes.colorBlack, classes.inlineText)}>
                      {`(*.txt, *.pdf, *.doc, *.docx)`}
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
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(materialStyles)(ProductionOrder);

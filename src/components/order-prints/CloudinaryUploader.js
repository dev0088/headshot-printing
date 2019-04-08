import React, {Component} from 'react';
import { Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Request from 'superagent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearRounded from '@material-ui/icons/ClearRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
// import Dropzone from 'react-dropzone';
// import ImageLoader from 'react-loading-image';
// import ImageLightbox from 'react-image-lightbox';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
// import Alert from '../../components/common/alert';
// import 'react-image-lightbox/style.css';
import { materialStyles } from '../../styles/material/index';

const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'dnxe2ejbx'});

class CloudinaryUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      openImageModal: false,
      progressPercent: 0.0,
      progressing: false,
      notification: false,
      imageUrl: null
    }
    // this.onFinish = this.onFinish.bind(this)
  }

  uploadWidget() {
    cloudinary.openUploadWidget({ cloud_name: 'dnxe2ejbx', upload_preset: 'PRESET', tags:['xmas']},
      function(error, result) {
          console.log(result);
      });
  }

  renderContents() {
    const { classes } = this.props
    const { imageUrl, openImageModal, progressing, progressPercent } = this.state

    return (
      <Grid container spacing={16} alignItems="center">
        <Grid item xs={12}>
          <div className="upload">
            <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                Add Image
            </button>
          </div>
        </Grid>
      </Grid>
    )
  }

  renderNotification = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!this.state.notification}
        autoHideDuration={3000}
        onClose={() => this.setState({notification: false})}
      >
        <Alert
          onClose={() => this.setState({notification: false})}
          variant="error"
          message={this.state.notification}
        />
      </Snackbar>
    )
  }

  render() {
    return (
      <div>
        {/* {this.renderNotification()} */}
        {this.renderContents()}
      </div>
    )
  }
}

export default withStyles(materialStyles)(CloudinaryUploader);

function createNotifyMessage(progress, success, failed) {
  return { progress, success, failed};
}

export const NOTIFY_MESSAGES = {
  CREATE_HEADSHOT: createNotifyMessage(
    'Creating your headshot...',
    'Headshot was created successfully.',
    'Failed to create headshot. Please try later.'
  ),
  DELETE_HEADSHOT: createNotifyMessage(
    'Deleting your headshot...',
    'Headshot was deleted successfully.',
    'Failed to create headshot. Please try later.'
  ),
  UPLOAD_HEADSHOT_IMAGE: createNotifyMessage(
    'Uploading your headshot image...',
    'Your headshot image was uploaded successfully.',
    'Failed to upload your headshot. Please try later.'
  ),
  CREAT_PAYMENT: createNotifyMessage(
    'Processing your payment...',
    'Your payment was processed successfully.',
    'Failed to process your payment. Please try later.'
  ),
  SAVE_QUENTITY: createNotifyMessage(
    'Saving quentity...',
    'Quentity was saved successfully.',
    'Failed to save quentity. Please try later.'
  ),
  SAVE_EMAIL: createNotifyMessage(
    'Saving email...',
    'Email was saved successfully.',
    'Failed to save email. Please try later.'
  ),
  Upload_FILE: createNotifyMessage(
    'Uploading file...',
    'File was uploaded successfully.',
    'Failed to upload file. Please try later.'
  ),
};

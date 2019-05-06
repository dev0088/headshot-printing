import CommonAPI from "./commonAPIs";
import { NOTIFY_MESSAGES } from "constants/notifications";

class HeadshotAPI {

  static getProductions(handleResponse) {
    CommonAPI.processRequest(`productions/all`, 'get', null, handleResponse);
  }

  static getProduction(productionId, handleResponse) {
    CommonAPI.processRequest(`productions/${productionId}`, 'get', null, handleResponse);
  }

  static createHeadshot(data, handleResponse) {
    CommonAPI.processRequestWithNotification(`headshot/create`, 'post', data, handleResponse, NOTIFY_MESSAGES.CREATE_HEADSHOT, true);
  }

  static deleteHeadshot(headshotId, handleResponse) {
    CommonAPI.processRequestWithNotification(`headshot/${headshotId}/`, 'delete', null, handleResponse, NOTIFY_MESSAGES.DELETE_HEADSHOT, true);
  }

  static uploadHeadshotImage(headshotId, data, handleResponse) {
    CommonAPI.processRequestWithFile(`headshot/upload/${headshotId}/`, 'put', data, handleResponse, NOTIFY_MESSAGES.UPLOAD_HEADSHOT_IMAGE, true);
  }

  static uploadHeadshotDescriptionFile(headshotId, data, handleResponse) {
    CommonAPI.processRequestWithFile(`headshot/upload_file/${headshotId}/`, 'put', data, handleResponse, NOTIFY_MESSAGES.UPLOAD_HEADSHOT_DESCRIPTION_FILE, true);
  }

  static createPayment(headshotId, data, handleResponse) {
    CommonAPI.processRequestWithNotification(`headshot/charge/${headshotId}/`, 'post', data, handleResponse, NOTIFY_MESSAGES.CREAT_PAYMENT, true);
  }

};

export default HeadshotAPI;

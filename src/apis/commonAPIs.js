import apiConfig from 'constants/api';
import { store } from "App";
import { getToken } from "service/storage";
import * as globalNotificationActions from 'actions/globalNotificationActions';

class CommonAPI {

  static processResponse = (response, handleResponse) => {
    if(response.error) {
      if (handleResponse) handleResponse(response.error, true);
    } else {
      if (response){
        if (handleResponse) handleResponse(response, false);
      } else {
        if (handleResponse) handleResponse(response.error, true);
      }
    }
  };

  static processRequest = (url, method, data, handleResponse) => {
    // console.log('==== processRequest: ', url, data);
    let params = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (data) {
      params = {
        ...params,
        body: JSON.stringify(data)
      };
    }

    fetch(`${apiConfig.url}/${url}`, params)
      .then(response => response.json())
      .then(response => this.processResponse(response, handleResponse))
      .catch(error => {
        console.log('error: ', error);
        if (handleResponse) handleResponse(error, true);
      })
  };

  static processRequestWithFile = (url, method, data, handleResponse, messages, needRefreshUserInfo) => {
    let params = {
      method: method,
      headers: {
        "Authorization": `Bearer ${getToken()}`
      },
      body: data
    };

    
    fetch(`${apiConfig.url}/${url}`, params)
      .then(response => response.json())
      .then(response => this.hanldeResponseWithNotification(response, false, messages.failed, messages.success, handleResponse, needRefreshUserInfo))
      .catch(error => {
        console.log('error: ', error);
        this.hanldeResponseWithNotification(error, true, messages.failed, messages.success, handleResponse, needRefreshUserInfo);
      })
  };

  static processRequestWithToken = (url, method, data, handleResponse) => {
    let parameters = {
      method: method,
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    if (method !== 'get' && data !== '' && data !== null) {
      parameters = {...parameters, body: JSON.stringify(data)};
    }

    fetch(`${apiConfig.url}/${url}`, parameters)
      .then(response => {console.log('=== response: ', response); return response.json()})
      .then(response => this.processResponse(response, handleResponse))
      .catch(error => {
        console.log('error: ', error);
        handleResponse(error, true);
      })
  };

  static notifyStatus = (type, message) => store.dispatch(globalNotificationActions.notify(true, type, message));

  static notifyProgress = (message) => this.notifyStatus('progress', message);

  static notifyError = (message) => this.notifyStatus('error', message);

  static notifySuccess = (message) => this.notifyStatus('success', message);

  static notifyInfo = (message) => this.notifyStatus('info', message);

  static handleResponseNotification = (isFailed, failedMessage, successMessage) => {
    if (isFailed) this.notifyError(failedMessage);
    else this.notifySuccess(successMessage);
  };

  static hanldeResponseWithNotification = (response, isFailed, failMessage, successMessage, handleResponse, needRefreshTalentInfo) => {
    this.handleResponseNotification(isFailed, failMessage, successMessage);
    handleResponse(response, isFailed);
  };

  static processRequestWithNotification = (url, method, data, handleResponse, messages, needRefreshUserInfo) => {
    this.notifyProgress(messages.progress);
    this.processRequestWithToken(
      url, 
      method, 
      data, 
      (response, isFailed) => {     
        this.hanldeResponseWithNotification(response, isFailed, messages.failed, messages.success, handleResponse, needRefreshUserInfo);
      }
    );
  };
};

export default CommonAPI;
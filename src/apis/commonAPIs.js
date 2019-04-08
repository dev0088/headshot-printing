import apiConfig from '../constants/api';
import { getToken, getUserID } from "../service/storage";

class CommonAPI {

static processResponse(response, handleResponse) {
  console.log('=== response: ', response);
  if(response.error) {
    console.log('error: ', response.error);
    if (handleResponse) handleResponse(response.error, true);
  }
  else {
    if (response){
      console.log('success: ', response);
      if (handleResponse) handleResponse(response, false);
    } else {
      console.log('error: ', response);
      if (handleResponse) handleResponse(response.error, true);
    }
  }
}

static processRequest(url, method, data, handleResponse) {
  console.log('==== processRequest: ', url, data);
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
    .then(response => {
      this.processResponse(response, handleResponse);
    })
    .catch(error => {
      console.log('error: ', error);
      if (handleResponse) handleResponse(error, true);
    })
}


static processRequestWithFile(url, method, data, handleResponse) {
  console.log('==== processRequestWithFile: ', url, data);
  let params = {
    method: method,
    headers: {
      // 'content-type': 'multipart/form-data'
    }
  };

  if (data) {
    params = {
      ...params,
      body: data
    };
  }

  fetch(`${apiConfig.url}/${url}`, params)
    .then(response => response.json())
    .then(response => {
      this.processResponse(response, handleResponse);
    })
    .catch(error => {
      console.log('error: ', error);
      if (handleResponse) handleResponse(error, true);
    })
}

static processRequestWithToken(url, method, data, handleResponse) {
  console.log('==== processRequest: ', url, data);
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

  fetch(`${apiConfig.url}/${url}/`, parameters)
    .then(response => {console.log('=== response: ', response); return response.json()})
    .then(response => {
      this.processResponse(response, handleResponse);
    })
    .catch(error => {
      console.log('error: ', error);
      handleResponse(error, true);
    })
  }
};

export default CommonAPI;
import apiConfig from '../constants/api';
import CommonAPI from "./commonAPIs";


class HeadshotAPI {

  static getProductions(handleResponse) {
    CommonAPI.processRequest(`productions/all`, 'get', null, handleResponse);
  }

  static getProduction(productionId, handleResponse) {
    CommonAPI.processRequest(`productions/${productionId}`, 'get', null, handleResponse);
  }

  static createHeadshot(data, handleResponse) {
    CommonAPI.processRequest(`headshot/create`, 'post', data, handleResponse);
  }

  static deleteHeadshot(headshottId, handleResponse) {
    CommonAPI.processRequest(`headshot/${headshottId}/`, 'delete', null, handleResponse);
  }

  static uploadHeadshotImage(headshotId, data, handleResponse) {
    CommonAPI.processRequestWithFile(`headshot/upload/${headshotId}/`, 'put', data, handleResponse);
  }

  static createPayment(headshotId, data, handleResponse) {
    CommonAPI.processRequest(`headshot/charge/${headshotId}/`, 'post', data, handleResponse);
  }

  // static saveProfile(userId, data, handleResponse) {
  //   this.processRequestWithToken(`talent/${userId}`, 'put', data, handleResponse);
  // }

  // static saveProfileResume(resumeId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_resume/${resumeId}`, 'put', data, handleResponse);
  // }

  // static deleteProfileResume(resumeId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_resume/${resumeId}`, 'delete', data, handleResponse);
  // }

  // static saveProfilePicture(pictureId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_picture/${pictureId}`, 'put', data, handleResponse);
  // }

  // static deleteProfilePicture(pictureId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_picture/${pictureId}`, 'delete', data, handleResponse);
  // }

  // static getAllCastingRequests(handleResponse) {
  //   this.processRequestWithToken(`agency/casting_request/all`, 'get', null, handleResponse);
  // }
  
  // static searchCastingRequestTalent(data, handleResponse) {
  //   this.processRequestWithToken(`agency/casting_request_talent/search`, 'post', data, handleResponse);
  // }

  // static searchCastingRequest(data, handleResponse) {
  //   this.processRequestWithToken(`agency/casting_request/search`, 'post', data, handleResponse);
  // }

  // static getCastingRequest(castingRequestId, handleResponse) {
  //   this.processRequestWithToken(`agency/casting_request/${castingRequestId}`, 'get', null, handleResponse);
  // }

  // static setCastingRequestStatus(castingRequestId, data, handleResponse) {
  //   this.processRequestWithToken(`agency/casting_request/set_status/${castingRequestId}`, 'put', data, handleResponse);
  // }

  // static saveGreetingVideo(videoId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_video_greetings/${videoId}`, 'put', data, handleResponse);
  // }

  // static deleteGreetingVideo(videoId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_video_greetings/${videoId}`, 'delete', data, handleResponse);
  // }

  // static saveSubSkillVideo(videoId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_video_sub_skills/${videoId}`, 'put', data, handleResponse);
  // }

  // static deleteSubSkillVideo(videoId, data, handleResponse) {
  //   this.processRequestWithToken(`talent_video_sub_skills/${videoId}`, 'delete', data, handleResponse);
  // }

  // static addNote(data, handleResponse) {
  //   this.processRequestWithToken(`agency/user_note/create`, 'post', data, handleResponse);
  // }

  // static searchNotes(data, handleResponse) {
  //   this.processRequestWithToken(`agency/user_note/search`, 'post', data, handleResponse);
  // }

  // static getAgencyOverview(handleResponse) {
  //   this.processRequestWithToken(`agency/overview/overview`, 'get', null, handleResponse);
  // }
};

export default HeadshotAPI;

// import * as auth from '../actions/auth'
import * as types from '../actions/actionTypes';
import jwtDecode from 'jwt-decode';

const initialState = {
  access: false,
  errors: false,
  isAuthenticated: false,
}

export function accessToken(state) {
  if (state.access) {
    return  state.access.token
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function refreshToken(state) {
  if (state.refresh) {
    return  state.refresh.token
  }
}

export function isRefreshTokenExpired(state) {
  // console.log("refresh", jwtDecode(state.access.token));
  if (state.access && state.access.token)
  {
    let decode = jwtDecode(state.access.token);
    if (decode && decode.exp) {
      return 1000 * decode.exp - (new Date()).getTime() < 5000;
    }
    return true;
  }
  return true;
}

export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}

export function errors(state) {
  return  state.errors
}

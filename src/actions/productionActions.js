import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const getAllProductions = () => {
  return ({
    [RSAA]: {
      endpoint: `${apiConfig.url}/productions/all`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      types: [
        types.ALL_PRODUCTIONS.REQUEST, types.ALL_PRODUCTIONS.SUCCESS, types.ALL_PRODUCTIONS.FAILURE
      ]
    }
  });
};


export const setStep = (setp) => {
  return {
    type: types.SET_STEP,
    payload: {
      ...setp
    }
  }
};

export const setProductionState = (state) => {
  return {
    type: types.SET_PRODUCTION_STATE,
    payload: {
      ...state
    }
  }
};

export const initProductionState = (state) => {
  return {
    type: types.INIT_PRODUCTION_STATE,
    payload: {
      ...state
    }
  }
};
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RECEIVED = 'RECEIVED';
const INIT     = 'INIT';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, RECEIVED, INIT].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

export const TOKEN = createRequestTypes('@@jwt/TOKEN');
export const RESTORE_AUTH = 'RESTORE_AUTH';
export const ALL_PRODUCTIONS = createRequestTypes('ALL_PRODUCTIONS');
export const SET_PRODUCTION_STATE = 'SET_PRODUCTION_STATE';
export const INIT_PRODUCTION_STATE = 'INIT_PRODUCTION_STATE';
export const SET_STEP = 'SET_STEP';
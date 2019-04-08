import * as types from '../actions/actionTypes';

const initialState = {
  init: true,
  step: 0
};

export const productionStepReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_STEP:
      return Object.assign({}, state, {
        ...action.payload
      });
  }
}
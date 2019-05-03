import * as types from './actionTypes'

export const notify = (open, type, message) => {
  return {
    type: types.GLOBAL_NOTIFICATION,
    payload: {
      open: open,
      type: type,
      message: message
    }
  }
}

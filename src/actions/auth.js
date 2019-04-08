import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'
// import { withAuth } from '../reducers';

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: `{$apiConfig.url}/auth/token/refresh/`,
        method: 'POST',
        body: JSON.stringify({token: token}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.TOKEN.REQUEST, types.TOKEN.RECEIVED, types.TOKEN.FAILURE
        ]
    }
})

export const restoreAuth = () => {
  return {
    type: types.RESTORE_AUTH
  }
}
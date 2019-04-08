import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { getAllProductions } from './productionsReducer';
// import { productionStepReducer } from './productionStepReducer';
import { productionStateReducer } from './productionStateReducer';

export default combineReducers({
  productions: getAllProductions,
  production: productionStateReducer,
  // productionStep: productionStepReducer
});

// export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
// export const accessToken = state => fromAuth.accessToken(state.auth)
// export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
// export const refreshToken = state => fromAuth.refreshToken(state.auth)
// export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)

// export function withAuth(headers={}) {
//   return (state) => ({
//     ...headers,
//     'Authorization': `Bearer ${accessToken(state)}`
//   })
// }

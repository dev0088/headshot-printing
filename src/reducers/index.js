import { combineReducers } from 'redux';
import { getAllProductions } from './productionsReducer';
import { productionStateReducer } from './productionStateReducer';
import globalNotification from './globalNotification';

export default combineReducers({
  productions: getAllProductions,
  production: productionStateReducer,
  globalNotification,
});

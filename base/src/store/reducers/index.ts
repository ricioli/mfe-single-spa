import { combineReducers } from 'redux';

import accountReducer from './accountReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  users: userReducer,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './features/auth/slice';

export default combineReducers({
  /**
   *  Account
   */
  auth: authReducer,
});
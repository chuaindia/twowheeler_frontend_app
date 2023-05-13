import { configureStore, combineReducers } from '@reduxjs/toolkit';
import twowheelersReducer from './twowheelers/twowheelers';
import userReducer from './user/session-redux';

const rootReducer = combineReducers({
  twowheelers: twowheelersReducer,
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

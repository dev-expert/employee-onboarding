import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';

import employeeReducer from 'container/Employee/reducer';
import login from 'container/Login/reducer';

const reducers = {
  employee: employeeReducer,
  login: login,
};

export const persistConfig = {
  key: 'config',
  storage,
};

const appReducer = persistCombineReducers(persistConfig, reducers);

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

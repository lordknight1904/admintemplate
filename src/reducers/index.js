import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './App/app';

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  app,
});

export default rootReducer;

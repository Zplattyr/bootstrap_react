import { combineReducers } from 'redux';

import tasks from './tasks';
import firebaseInfo from './firebase';

const rootReducer = combineReducers({ tasks, firebaseInfo });

export default rootReducer;

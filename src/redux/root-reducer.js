import { combineReducers } from 'redux';

import achievementsReducer from './achievements/achievements.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
  user: userReducer,
  achievements: achievementsReducer
})
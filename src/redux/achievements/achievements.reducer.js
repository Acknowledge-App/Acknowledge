import { AchievementActionTypes } from './achievements.types';

const initialState = [];

function achievementsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AchievementActionTypes.GET_ACHIEVEMENTS:
      return payload;
    case 'ADD_ACH':
      let output = Object.assign({}, state, {
        ...state.achievements,
        payload,
      });
      console.log('out: ' + output);
      return output;
    case 'CLEAR_ACH':
      return initialState;
    default:
      return state;
  }
}

export default achievementsReducer;

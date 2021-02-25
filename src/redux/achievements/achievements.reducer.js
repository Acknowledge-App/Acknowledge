import { AchievementActionTypes } from './achievements.types'

const initialState = []

function achievementsReducer(state = initialState, action) {
  switch (action.type) {
    case AchievementActionTypes.GET_ACHIEVEMENTS:
      return action.payload
    
    default:
      return state
  }
}

export default achievementsReducer
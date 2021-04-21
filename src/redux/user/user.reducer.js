import { UserActionTypes } from './user.types'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return action.payload
        case UserActionTypes.SIGNUP:
            return action.payload
        case UserActionTypes.LOGOUT:
            return {...state, uid: undefined, email: undefined, emailVerified: undefined}
        case UserActionTypes.UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UserActionTypes.UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        case UserActionTypes.PASSWORD_RESET:
            return action.payload 
        default:
        return state
    }
}

export default userReducer
import Firebase, { db } from '../../../config/Firebase.js'

import { UserActionTypes } from './user.types'

export const updateEmail = email => {
  return {
      type: UserActionTypes.UPDATE_EMAIL,
      payload: email
  }
}

export const updatePassword = password => {
  return {
      type: UserActionTypes.UPDATE_PASSWORD,
      payload: password
  }
}

export const logout = () => {
  return {
      type: UserActionTypes.LOGOUT
  }
}

export const login = () => {
  return async (dispatch, getState) => {
      try {
          const { email, password } = getState().user
          const response = await Firebase.auth().signInWithEmailAndPassword(email, password)
          
          dispatch(getUser(response.user.uid))
      } catch (e) {
          alert(e)
      }
  }
}

export const getUser = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: UserActionTypes.LOGIN, payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const signup = () => {
  return async (dispatch, getState) => {
      try {
          const { email, password } = getState().user
          const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
          if (response.user.uid) {
            const user = {
              uid: response.user.uid,
              email: email
            }

            db.collection('users')
              .doc(response.user.uid)
              .set(user)

            dispatch({ type: UserActionTypes.SIGNUP, payload: response.user })

            
            var userCurrent = Firebase.auth().currentUser;

            userCurrent.sendEmailVerification().then(function() {
              console.log('Email sent.');
            }).catch(function(error) {
              console.log('An error happened.')
            });
          }
      } catch (e) {
          alert(e)
      }
  }
}

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

// persist log in
// var f = Firebase.auth()
// f.setPersistence('local')
// .then(function() {
//   console.log('hi')
// })

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://access-db-8a356.firebaseapp.com',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

export const signup = () => {
  return async (dispatch, getState) => {
      try {
          const { email, password } = getState().user
          console.log(email)
          Firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
              // The link was successfully sent. Inform the user.
              // Save the email locally so you don't need to ask the user for it again
              // if they open the link on the same device.
              console.log('email')
              window.localStorage.setItem('emailForSignIn', email);
              const response = Firebase.auth().createUserWithEmailAndPassword(email, password)
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
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
              // ...
            });
         
      } catch (e) {
          alert(e)
      }
  }
}

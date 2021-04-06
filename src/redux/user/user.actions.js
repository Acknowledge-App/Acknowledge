import Firebase, { db } from '../../../config/Firebase.js';

import { UserActionTypes } from './user.types';

export const updateEmail = (email) => {
  return {
    type: UserActionTypes.UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: UserActionTypes.UPDATE_PASSWORD,
    payload: password,
  };
};

export const logout = () => {
  return {
    type: UserActionTypes.LOGOUT,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      if (response.user) {
        const user = {
          uid: response.user.uid,
          email: response.user.email,
          emailVerified: response.user.emailVerified,
        };

        console.log(response.user);
        dispatch({ type: UserActionTypes.LOGIN, payload: user });
      }
      //dispatch(getUser(response.user.uid));
    } catch (e) {
      alert('Log In: ' + e);
    }
  };
};

export const getUser = (uid) => {
  return async (dispatch, getState) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      //console.log(user.data());

      // const user = {
      //   uid: user.uid,
      //   email: user.email,
      //   emailVerified: user.emailVerified,
      // };

      dispatch({ type: UserActionTypes.LOGIN, payload: user.data() });
    } catch (e) {
      alert('getUser: ' + e);
    }
  };
};

var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://access-db-8a356.firebaseapp.com',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  dynamicLinkDomain: 'example.page.link',
};

export const signup = () => {
  return async (dispatch, getState) => {
      try {
          const { email, password } = getState().user
              const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
              
              if (response.user.uid) {
                const user = {
                  uid: response.user.uid,
                  email: email,
                  emailVerified: response.user.emailVerified
                }
    
                db.collection('users')
                  .doc(response.user.uid)
                  .set(user)
    
                dispatch({ type: UserActionTypes.SIGNUP, payload: response.user })
    
                response.user.sendEmailVerification()
                  .then(function() {
                    alert('Please check your inbox/spam foler in your e-mail to get verfied.')
                    console.log('Email sent.');
                  })
                  .catch(function(error) {
                    console.log(`An error happened: ${error}`)
                });
              }
              // ...
      } catch (e) {
          alert(e)
      }
      // ...
    } catch (e) {
      alert(e);
    }
  };
};

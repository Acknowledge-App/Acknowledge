import Firebase, { db } from "../../../config/Firebase.js";
import { UserActionTypes } from "./user.types";
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

export const updateUsername = (nickname) => {
  return {
    type: UserActionTypes.UPDATE_USERNAME,
    payload: nickname,
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
          // username: (null || response.user.username)
        };
        db.collection("users").doc(response.user.uid).update(user);
        dispatch({ type: UserActionTypes.LOGIN, payload: response.user });
      }
      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert("Log In: " + e);
    }
  };
};
export const getUser = (uid) => {
  return async (dispatch, getState) => {
    try {
      const user = await db.collection("users").doc(uid).get();
      dispatch({ type: UserActionTypes.LOGIN, payload: user.data() });
    } catch (e) {
      alert("getUser: " + e);
    }
  };
};
export const passwordReset = () => {
  return async (dispatch, getState) => {
    try {
      const { email } = getState().user;
      await Firebase.auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          alert("Please check your inbox/spam folder to reset your password");
          console.log("password reset sent to email");
          // Email sent.
        })
        .catch(function (error) {
          // An error happened.
          console.log("error");
        });
    } catch (e) {
      alert("Broken at Password Reset " + e);
    }
  };
};
export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
        };
        db.collection("users").doc(response.user.uid).set(user);
        dispatch({ type: UserActionTypes.SIGNUP, payload: response.user });
        response.user
          .sendEmailVerification()
          .then(function () {
            alert(
              "Please check your inbox/spam folder in your e-mail to get verified."
            );
            console.log("Email sent.");
          })
          .catch(function (error) {
            console.log(`An error happened: ${error}`);
          });
      }
    } catch (e) {
      alert(e);
    }
    // ...
  };
};

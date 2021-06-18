import { AchievementActionTypes } from "./achievements.types";
import { db } from "../../../config/Firebase.js";

// Action Creators

export const addachievementfirebase = (achievement) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().user;
      db.collection("users")
        .doc(uid)
        .collection("achievements")
        .add(achievement);
      console.log("Added achievement to firebase");
    } catch (e) {
      alert(e);
    }
  };
};

export const deleteachievementfirebase = (id) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().user;
      db.collection("users")
        .doc(uid)
        .collection("achievements")
        .doc(id)
        .delete();
    } catch (e) {
      alert(e);
    }
  };
};

export const getachievementsfirebase = () => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().user;
      console.log(uid);
      console.log("Fetched achievements");
      db.collection("users")
        .doc(uid)
        .collection("achievements")
        .orderBy("createdAt", "asc")
        .onSnapshot(
          (querySnapshot) => {
            const newAchievements = [];
            querySnapshot.forEach((doc) => {
              const achievement = doc.data();
              achievement.id = doc.id;
              newAchievements.push(achievement);
            });
            dispatch({
              type: AchievementActionTypes.GET_ACHIEVEMENTS,
              payload: newAchievements,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (e) {
      alert(e);
    }
  };
};

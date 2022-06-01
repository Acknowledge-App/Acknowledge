import * as firebase from 'firebase/app';
// Import the CRUD operations for firebase
import '@firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
const Firebase = firebase.initializeApp(firebaseConfig);
// Create and instance of the firestore database
export const db = firebase.firestore();
// avoid deprecated warnings
// db.settings({
//   timestampsInSnapshots: true
// })
export default Firebase;
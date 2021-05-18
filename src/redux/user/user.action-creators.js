import Firebase, {
  db
} from '../../../config/Firebase.js';

export const updateUsername = (uid, nickname) => {
  return new Promise(done => {
       db.collection('users').doc(uid).update({
            username: nickname
         }).then((result) => {
           console.log(result)
           done(true)
         })
         .catch((e) => {
           console.log(e)
           done(false)
         })
  })

}
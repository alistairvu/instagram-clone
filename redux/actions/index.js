import { USER_STATE_CHANGE } from "../constants/index"
import firebase from "firebase"
import "firebase/firestore"

export const fetchUser = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(firebase.auth().currentUser.uid)
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() })
        } else {
          console.log("does not exist")
        }
      })
  }
}

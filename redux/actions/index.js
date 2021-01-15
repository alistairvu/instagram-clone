import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from "../constants/index"
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
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() })
        } else {
          console.log("does not exist")
        }
      })
  }
}

export const fetchUserPosts = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          payload: posts,
        })
      })
  }
}

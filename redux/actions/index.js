import {
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants/index"
import firebase from "firebase"
import "firebase/firestore"

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA })
  }
}

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

export const fetchUserFollowing = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        const following = snapshot.docs.map((doc) => doc.id)
        dispatch({
          type: USER_FOLLOWING_STATE_CHANGE,
          payload: following,
        })

        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i]))
        }
      })
  }
}

export const fetchUsersData = (uid) => {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid)

    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data()
            user.uid = snapshot.id
            dispatch({ type: USERS_DATA_STATE_CHANGE, payload: user })
            dispatch(fetchUsersFollowingPosts(user.uid))
          } else {
            console.log("does not exist")
          }
        })
    }
  }
}

export const fetchUsersFollowingPosts = (uid) => {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const uid = snapshot.query.EP.path.segments[1]
        const user = getState().usersState.users.find((el) => el.uid === uid)

        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          user: user,
        }))
        console.log(posts)
        dispatch({
          type: USERS_POSTS_STATE_CHANGE,
          payload: { posts, uid },
        })
        console.log(getState())
      })
  }
}

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants/index"
const initialState = {
  currentUser: null,
  posts: [],
  following: [],
}

export const user = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: payload,
      }
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: payload,
      }
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: payload,
      }
    case CLEAR_DATA:
      return initialState
    default:
      return state
  }
}

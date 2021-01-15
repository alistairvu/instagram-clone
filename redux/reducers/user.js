import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants/index"
const initialState = {
  currentUser: null,
  posts: [],
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
    default:
      return state
  }
}

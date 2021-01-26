import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants"

const initialState = {
  users: [],
  userLoaded: 0,
}

export const users = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, payload],
      }
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: payload,
      }
    default:
      return state
  }
}

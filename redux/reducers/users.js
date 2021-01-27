import {
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants"

const initialState = {
  users: [],
  usersLoaded: 0,
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
        usersLoaded: state.usersLoaded + 1,
        users: state.users.map((user) =>
          user.uid === payload.uid ? { ...user, posts: payload.posts } : user
        ),
      }
    case CLEAR_DATA:
      return initialState
    default:
      return state
  }
}

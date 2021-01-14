import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.development"
import { USER_STATE_CHANGE } from "../constants/index"
const initialState = {
  currentUser: null,
}

export const user = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      return state
  }
}

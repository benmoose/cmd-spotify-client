import { types } from './actions'

const initialState = {
  accessToken: ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload }
    case types.GET_PROFILE_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

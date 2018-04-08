import api from '../../services/api'

// types
export const types = {
  SET_ACCESS_TOKEN: 'cmd-spotify/profile/SET_ACCESS_TOKEN',
  GET_PROFILE_REQUEST: 'cmd-spotify/profile/GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS: 'cmd-spotify/profile/GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILURE: 'cmd-spotify/profile/GET_PROFILE_FAILURE'
}

const getProfileRequest = () => ({ type: types.GET_PROFILE_REQUEST })
const getProfileSuccess = (payload) => ({ type: types.GET_PROFILE_SUCCESS, payload })
const getProfileFailure = (payload) => ({ type: types.GET_PROFILE_FAILURE, payload, error: true })

const setAccessToken = payload => ({
  type: types.SET_ACCESS_TOKEN,
  payload
})

const getProfile = () => (dispatch, getState) => {
  // get user's access token
  const accessToken = getState().profile.accessToken
  // perform request
  dispatch(getProfileRequest())
  return api({
    baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
    url: '/v1/me',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => dispatch(getProfileSuccess(res.data)))
    .catch(err => dispatch(getProfileFailure(err)))
}

// actions
export const actions = {
  setAccessToken,
  getProfile
}

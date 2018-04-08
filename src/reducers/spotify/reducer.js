import { combineReducers } from 'redux'
import createReducer from 'atomic-reducer'

import { types } from './actions'

const playlists = createReducer(
  types.GET_PLAYLISTS_REQUEST,
  types.GET_PLAYLISTS_SUCCESS,
  types.GET_PLAYLISTS_FAILURE,
  types.SET_PLAYLISTS_ORDER,
  types.SET_SELECTED_PLAYLIST
)

const tracks = createReducer(
  types.GET_TRACKS_REQUEST,
  types.GET_TRACKS_SUCCESS,
  types.GET_TRACKS_FAILURE,
  types.SET_TRACKS_ORDER,
  types.SET_SELECTED_TRACK
)

const albums = createReducer({
  success: types.GET_ALBUMS_SUCCESS
})

const artists = createReducer({
  success: types.GET_ARTISTS_SUCCESS
})

export default combineReducers({
  playlists,
  albums,
  tracks,
  artists
})

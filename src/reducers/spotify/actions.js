import { schema, normalize } from 'normalizr'
import api from '../../services/api'

// types
export const types = {
  GET_TRACKS_REQUEST: 'cmd-spotify/spotify/GET_TRACKS_REQUEST',
  GET_TRACKS_SUCCESS: 'cmd-spotify/spotify/GET_TRACKS_SUCCESS',
  GET_TRACKS_FAILURE: 'cmd-spotify/spotify/GET_TRACKS_FAILURE',
  SET_TRACKS_ORDER: 'cmd-spotify/spotify/SET_TRACKS_ORDER',
  SET_SELECTED_TRACK: 'cmd-spotify/spotify/SET_SELECTED_TRACK',
  GET_ALBUMS_SUCCESS: 'cmd-spotify/spotify/GET_ALBUMS_SUCCESS',
  GET_ARTISTS_SUCCESS: 'cmd-spotify/spotify/GET_ARTISTS_SUCCESS',
  GET_PLAYLISTS_REQUEST: 'cmd-spotify/spotify/GET_PLAYLISTS_REQUEST',
  GET_PLAYLISTS_SUCCESS: 'cmd-spotify/spotify/GET_PLAYLISTS_SUCCESS',
  GET_PLAYLISTS_FAILURE: 'cmd-spotify/spotify/GET_PLAYLISTS_FAILURE',
  SET_PLAYLISTS_ORDER: 'cmd-spotify/spotify/SET_PLAYLISTS_ORDER',
  SET_SELECTED_PLAYLIST: 'cmd-spotify/spotify/SET_SELECTED_PLAYLIST',
  PLAYLIST_ADD_REQUEST: 'cmd-spotify/spotify/PLAYLIST_ADD_REQUEST',
  PLAYLIST_ADD_SUCCESS: 'cmd-spotify/spotify/PLAYLIST_ADD_SUCCESS',
  PLAYLIST_ADD_FAILURE: 'cmd-spotify/spotify/PLAYLIST_ADD_FAILURE',
}

// schema
const artist = new schema.Entity('artists')
const album = new schema.Entity('albums')
const track = new schema.Entity('tracks', { album, artists: [artist] })
const playlist = new schema.Entity('playlists')

const getTracksRequest = () => ({ type: types.GET_TRACKS_REQUEST })
const getTracksSuccess = payload => ({ type: types.GET_TRACKS_SUCCESS, payload })
const getTracksFailure = payload => ({ type: types.GET_TRACKS_FAILURE, payload, error: true })
const setTracksOrder = payload => ({ type: types.SET_TRACKS_ORDER, payload })
const setSelectedTrack = payload => ({ type: types.SET_SELECTED_TRACK, payload })

const getAlbumsSuccess = payload => ({ type: types.GET_ALBUMS_SUCCESS, payload })
const getArtistsSuccess = payload => ({ type: types.GET_ARTISTS_SUCCESS, payload })

const getPlaylistsRequest = () => ({ type: types.GET_PLAYLISTS_REQUEST })
const getPlaylistsSuccess = payload => ({ type: types.GET_PLAYLISTS_SUCCESS, payload })
const getPlaylistsFailure = payload => ({ type: types.GET_PLAYLISTS_FAILURE, payload, error: true })
const setPlaylistsOrder = payload => ({ type: types.SET_PLAYLISTS_ORDER, payload })
const setSelectedPlaylist = payload => ({ type: types.SET_SELECTED_PLAYLIST, payload })

const playlistAddRequest = () => ({ type: types.PLAYLIST_ADD_REQUEST })
const playlistAddSuccess = payload => ({ type: types.PLAYLIST_ADD_SUCCESS, payload })
const playlistAddFailure = payload => ({ type: types.PLAYLIST_ADD_FAILURE, payload, error: true })

// actions
const search = (q, type = 'track') => dispatch => {
  dispatch(getTracksRequest())
  return api({
    url: '/v1/search',
    params: { q, type }
  })
    .then(res => normalize(res.data, {
      tracks: {
        items: [ track ]
      }
    }))
    .then(({ result, entities }) => {
      dispatch(getTracksSuccess(entities.tracks))
      dispatch(getAlbumsSuccess(entities.albums))
      dispatch(getArtistsSuccess(entities.artists))
      dispatch(setTracksOrder(result.tracks.items))
      dispatch(setSelectedTrack(result.tracks.items[0]))
    })
    .catch(err => dispatch(getTracksFailure(err)))
}

const getPlaylists = () => (dispatch, getState) => {
  // get user's access token
  const accessToken = getState().profile.accessToken
  // perform request
  dispatch(getPlaylistsRequest())
  return api({
    baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
    url: '/v1/me/playlists',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => normalize(res.data, {
      items: [ playlist ]
    }))
    .then(({ entities, result }) => {
      console.log(entities, result)
      dispatch(getPlaylistsSuccess(entities.playlists))
      dispatch(setPlaylistsOrder(result.items))
      dispatch(setSelectedPlaylist(result.items[0]))
    })
    .catch(err => dispatch(getPlaylistsFailure(err)))
}

const addToPlaylist = (playlistId, trackUri) => (dispatch, getState) => {
  // get user's access token
  const { accessToken, id } = getState().profile
  // perform request
  dispatch(playlistAddRequest())
  return api({
    baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
    url: `/v1/users/${id}/playlists/${playlistId}/tracks`,
    method: 'post',
    params: {
      uris: trackUri
    },
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => dispatch(playlistAddSuccess()))
    .catch(err => dispatch(playlistAddFailure(err)))
}

export const actions = {
  search,
  getPlaylists,
  addToPlaylist,
  setSelectedTrack,
  setSelectedPlaylist,
}

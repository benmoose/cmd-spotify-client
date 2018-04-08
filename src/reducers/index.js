import { combineReducers } from 'redux'
import profile from './profile/reducer'
import spotify from './spotify/reducer'

export default combineReducers({ spotify, profile })

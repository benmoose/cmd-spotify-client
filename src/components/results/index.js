import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from '@blueprintjs/core'

const Col = styled(Card)`
  opacity: ${props => props.disabled ? 0.55 : 1}
`

// some style hacks to get this looking okay
// ... regrets doing this at 4am.
const Item = styled.button`
  width: 100%;
  border-radius: 0;
  text-align: left;
  padding: 8px;
  margin: 0 !important;
  cursor: pointer;
  box-sizing: border-box;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  border-left: 3px solid transparent;
  border-color: ${props => props.selected ? 'rgba(52, 152, 219, 1.0)' : 'transparent'};
  background: ${props => props.selected ? 'rgba(52, 152, 219, 0.16)' : 'white'};
  :hover {
    background: rgba(52, 152, 219, 0.08);
  }
  :disabled {
    opacity: 0.55;
    pointer-events: none;
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

const Results = ({ command, spotify, profile, loading, actions }) => {
  const isAuthenticated = profile.accessToken
  // TODO: this could be optimised
  // at the moment it's being computed even when no playlist search
  // is requested
  const playlists = spotify.playlists.order
    .map(id => spotify.playlists.entities[id])
    .filter(playlist => {
      const playlistName = (playlist && playlist.name) || ''
      const commandPlaylist = (command && command.playlist) || ''
      // only show playlists if `command.playlist` is present
      if (!commandPlaylist) {
        return false
      }
      // return playlists with matching names to the search
      return playlistName.toLowerCase().includes(commandPlaylist.toLowerCase())
    })

  return (
    <div className='row'>
      <div className='col-6'>
        <Col>
          <h6>Tracks</h6>
          {
            spotify.tracks.order.map((id) => {
              const track = spotify.tracks.entities[id]
              const album = spotify.albums.entities[track.album]
              const artists = track.artists.map(id => spotify.artists.entities[id].name)
              return (
                <Item
                  key={id}
                  selected={spotify.tracks.selected === id}
                  className='row'
                  onClick={actions.onSelectTrack(id)}
                >
                  <div className='col-4 col-sm-2 col-md-1' style={{ padding: 0 }}>
                    <Img src={album.images ? album.images[0].url : '#'} />
                  </div>
                  <div className='col-8 col-sm-10 col-md-11'>
                    <h5>{track.name}</h5>
                    <p>{artists.join(', ')}</p>
                  </div>
                </Item>
              )
            })
          }
        </Col>
      </div>
      <div className='col-6'>
        <Col disabled={!isAuthenticated}>
          <h6>Playlists</h6>
          {
            playlists.map((playlist) => {
              return (
                <Item
                  key={playlist.id}
                  selected={spotify.playlists.selected === playlist.id}
                  className='row'
                  disabled={playlist.owner.id !== profile.id}
                  onClick={actions.onSelectPlaylist(playlist.id)}
                >
                  <div className='col-4 col-sm-2 col-md-1' style={{ padding: 0 }}>
                    <Img src={playlist.images ? playlist.images[0].url : '#'} />
                  </div>
                  <div className='col-8 col-sm-10 col-md-11'>
                    <h5>{playlist.name}</h5>
                    <p>{playlist.tracks.total} tracks</p>
                  </div>
                </Item>
              )
            })
          }
        </Col>
      </div>
    </div>
  )
}

Results.propTypes = {
  spotify: PropTypes.shape({
    tracks: PropTypes.shape({
      entities: PropTypes.object,
      order: PropTypes.arrayOf(PropTypes.string),
      selected: PropTypes.string
    })
  }).isRequired,
  actions: PropTypes.shape({
    onSelectTrack: PropTypes.func.isRequired,
    onSelectPlaylist: PropTypes.func.isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired
}

export default Results

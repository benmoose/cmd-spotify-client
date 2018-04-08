import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'
import { Intent } from '@blueprintjs/core'

import Toaster from '../components/toaster'
import CommandInput from '../components/commandInput'
import Results from '../components/results'

import { parseCommand } from '../services/parse'
import { actions as profileActions } from '../reducers/profile/actions'
import { actions as spotifyActions } from '../reducers/spotify/actions'

/**
 * Single container component (very simple app)
 */
class Home extends React.Component {
  constructor (props) {
    super(props)
    const { dispatch } = this.props
    this.actions = {
      spotify: bindActionCreators(spotifyActions, dispatch),
      profile: bindActionCreators(profileActions, dispatch)
    }
  }

  componentDidMount () {
    const { profile } = this.props
    // load user playlists if access token is present
    if (profile.accessToken) {
      this.actions.profile.getProfile()
      this.actions.spotify.getPlaylists()
    }
  }

  state = {
    input: '',
    command: null
  }

  onSubmit = e => {
    e.preventDefault()
    // parse command and perform appropriate action
    const { spotify, profile } = this.props
    const { command } = this.state
    // validation checks
    if (!command) {
      return Toaster.show({ message: 'Unknown command' })
    }
    if (command.requiresAuth && !profile.accessToken) {
      return Toaster.show({
        message: `You need to log in before you can use the ${command.type} command`
      })
    }
    // perform the appropriate action
    switch (command.type) {
      case 'add': {
        // get hydrated track and playlist
        const track = spotify.tracks.entities[spotify.tracks.selected]
        const playlist = spotify.playlists.entities[spotify.playlists.selected]
        // send request
        this.actions.spotify.addToPlaylist(spotify.playlists.selected, track.uri)
          .then(({ error }) => {
            error
            ? Toaster.show({ message: `Error adding '${track.name}' to ${playlist.name}`, intent: Intent.DANGER })
            : Toaster.show({ message: `'${track.name}' added to ${playlist.name}` })
          })
        break
      }
      default: break
    }
  }

  onChange = name => e => {
    this.setState({ [name]: e.target.value }, () => this.handleInput(this.state.input))
  }

  handleInput = (input) => {
    const _search = debounce(this.actions.spotify.search, 1000)
    const command = parseCommand(input)
    this.setState({ command })
    if (!command) return
    switch (command.type) {
      case 'search': {
        _search(command.body)
        break
      }
      case 'add': {
        command.track && _search(command.track)
        break;
      }
      default:
        break
    }
  }

  handleClick = action => id => () => action(id)

  render () {
    const { spotify, profile } = this.props
    const { input, command } = this.state

    return (
      <div className='container-fluid'>
        <CommandInput
          value={input}
          loading={false}
          command={command}
          actions={{
            onSubmit: this.onSubmit,
            onChange: this.onChange('input')
          }}
        />
        <Results
          command={command}
          profile={profile}
          spotify={spotify}
          loading={false}
          actions={{
            onSelectTrack: this.handleClick(this.actions.spotify.setSelectedTrack),
            onSelectPlaylist: this.handleClick(this.actions.spotify.setSelectedPlaylist)
          }}
        />
      </div>
    )
  }
}

export default connect(s => s)(Home)

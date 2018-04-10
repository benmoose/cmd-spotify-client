import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog } from '@blueprintjs/core'

const HelpDialog = ({ open, actions }) => {
  return (
    <Dialog
      isOpen={open}
      onClose={actions.onRequestClose}
      title='Help'
    >
      <div className='pt-dialog-body'>
        <p>Welcome to <strong>CMD Spotify</strong>! A mind-blowing way to control
        Spotify via a simple text box.</p>
        <p>At the moment there are only two commands.</p>
        <table className='pt-html-table'>
          <thead>
            <tr>
              <th>Needs login</th>
              <th>Command</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No</td>
              <td><code>search</code> / <code>s</code></td>
              <td>
                <p>Search for any track on the spotify library!</p>
                <code>search bloodstream</code>
              </td>
            </tr>
            <tr>
              <td>Yes</td>
              <td><code>add</code> / <code>a</code></td>
              <td>
                <p>Add a track to one of your playlists.</p>
                <code>add nevermind to chill 😎</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='pt-dialog-footer'>
        <Button text='close' />
      </div>
    </Dialog>
  )
}

HelpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    onRequestClose: PropTypes.func.isRequired
  }).isRequired
}

export default HelpDialog

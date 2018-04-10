import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Nav from './components/nav'
import HelpDialog from './components/helpDialog'
import Home from './scenes/home'
import Callback from './scenes/callback'

class Routes extends React.Component {
  state = {
    helpDialogOpen: false
  }

  openHelpDialog = () => this.setState({ helpDialogOpen: true })
  closeHelpDialog = () => this.setState({ helpDialogOpen: false })

  render () {
    const { profile } = this.props
    const { helpDialogOpen } = this.state
    return (
    <Router>
      <React.Fragment>
        <Nav
          profile={profile}
          actions={{
            onHelpClick: this.openHelpDialog
          }}  
        />
        <HelpDialog
          open={helpDialogOpen}
          actions={{
            onRequestClose: this.closeHelpDialog
          }}
        />
        <Route exact path='/' component={Home} />
        <Route path='/callback' component={Callback} />
      </React.Fragment>
    </Router>
    )
  }
}

export default connect(({ profile }) => ({ profile }))(Routes)

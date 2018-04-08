import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Nav from './components/nav'
import Home from './scenes/home'
import Callback from './scenes/callback'

const Routes = ({ profile }) => (
  <Router>
    <React.Fragment>
      <Nav profile={profile} />
      <Route exact path='/' component={Home} />
      <Route path='/callback' component={Callback} />
    </React.Fragment>
  </Router>
)

export default connect(({ profile }) => ({ profile }))(Routes)

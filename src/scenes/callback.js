import React from 'react'
import qs from 'qs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../reducers/profile/actions'

class Callback extends React.Component {
  constructor (props) {
    super(props)
    const { dispatch } = this.props
    this.actions = bindActionCreators(actions, dispatch)
  }
  
  componentDidMount () {
    const { location, history } = this.props
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (query.access_token) {
      this.actions.setAccessToken(query.access_token)
      history.replace('/')
    }
  }
  
  render () {
    return <div />
  }
}

export default connect()(Callback)

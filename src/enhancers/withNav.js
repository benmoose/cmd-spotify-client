import React from 'react'
import Nav from '../components/nav'

/**
 * HOC that adds nav to a component.
 */
const withNav = (Component) => (props) => {
  return (
    <React.Fragment>
      <Nav
        actions={{
          onLoginRequest: console.log
        }}
      />
      <Component {...props} />
    </React.Fragment>
  )
}

export default withNav

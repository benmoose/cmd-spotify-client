import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Alignment,
  Navbar,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  AnchorButton,
  Button,
  Classes
} from '@blueprintjs/core'

const NavBarWithMargin = styled(Navbar)`
  margin-bottom: 15px;
`

const NavText = styled.span`
  margin-right: 15px;
  opacity: .65;
`

const Nav = ({ actions, profile }) => {
  return (
    <NavBarWithMargin>
      <NavbarGroup>
        <NavbarHeading>Blokur</NavbarHeading>
        <NavbarDivider />
        <AnchorButton href='#' icon='code' className={Classes.MINIMAL}>Client</AnchorButton>
        <AnchorButton href='#' icon='code' className={Classes.MINIMAL}>Server</AnchorButton>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavText>Login to interact with your playlists</NavText>
        <Button
          icon='log-in'
          onClick={actions.onLoginRequest}
        >
          Login
        </Button>
      </NavbarGroup>
    </NavBarWithMargin>
  )
}

Nav.propTypes = {
  actions: PropTypes.shape({
    onLoginRequest: PropTypes.func.isRequired
  }).isRequired
}

export default Nav

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Alignment,
  Navbar,
  NavbarGroup,
  NavbarDivider,
  NavbarHeading,
  Button,
  AnchorButton,
  Classes,
  Icon
} from '@blueprintjs/core'

const NavBarWithMargin = styled(Navbar)`
  margin-bottom: 15px;
`

const NavText = styled.span`
  margin-right: 15px;
  opacity: .65;
`

const Nav = ({ profile }) => {
  return (
    <NavBarWithMargin>
      <NavbarGroup>
        <NavbarHeading>Blokur</NavbarHeading>
        <NavbarDivider />
        <AnchorButton
          href='https://github.com/benjaminhadfield/cmd-spotify-client'
          icon='code'
          className={Classes.MINIMAL}
        >Client</AnchorButton>
        <AnchorButton
          href='https://github.com/benjaminhadfield/cmd-spotify-server'
          icon='code'
          className={Classes.MINIMAL}
        >Server</AnchorButton>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {
          profile.accessToken
            ? (
              <NavText>{profile.display_name || 'Logged in'}</NavText>
            )
            : (
              <React.Fragment>
                <NavText>Login to interact with your playlists</NavText>
                <AnchorButton
                  icon='log-in'
                  href={`${process.env.REACT_APP_API_URL}/v1/oauth/authorise`}
                >
                  Login
                </AnchorButton>
              </React.Fragment>
            )
        }
        <NavbarDivider />
        <Button icon='help' className={Classes.MINIMAL} />
      </NavbarGroup>
    </NavBarWithMargin>
  )
}

Nav.propTypes = {
  profile: PropTypes.shape({
    accessToken: PropTypes.string
  }).isRequired
}

export default Nav

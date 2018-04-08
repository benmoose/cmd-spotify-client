import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Classes, InputGroup } from '@blueprintjs/core'

/**
 * Helper elements
 */
const Container = styled.form`
  margin-bottom: 15px;
`

const ActionButton = (icon = 'search') => {
  return (
    <Button
      className={Classes.MINIMAL}
      icon={icon}
      type='submit'
    />
  )
}

/**
 * CommandInput
 * Simply a controlled text-input component
 */
const CommandInput = ({ value, loading, command, actions }) => {
  let icon = 'search'
  // update icon based on command type
  if (command) {
    switch (command.type) {
      case 'add': {
        icon = 'plus'
        break
      }
      default: break
    }
  }
  
  return (
    <Container onSubmit={actions.onSubmit}>
      <InputGroup
        className={Classes.LARGE}
        leftIcon='slash'
        rightElement={ActionButton(icon)}
        placeholder='search summer of 69'
        value={value}
        onChange={actions.onChange}
        onSubmit={actions.onSubmit}
      />
    </Container>
  )
}

CommandInput.propTypes = {
  value: PropTypes.string,
  loading: PropTypes.bool,
  actions: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  })
}

export default CommandInput

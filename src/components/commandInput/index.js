import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Classes, InputGroup } from '@blueprintjs/core'

/**
 * Helper elements
 */
const Container = styled.div`
  margin-bottom: 15px;
`

const ActionButton = (icon = 'search') => {
  return (
    <Button
      className={Classes.MINIMAL}
      icon={icon}
    />
  )
}

/**
 * CommandInput
 * Simply a controlled text-input component
 */
const CommandInput = ({ value, loading, actions }) => {
  return (
    <Container>
      <InputGroup
        className={Classes.LARGE}
        leftIcon='slash'
        rightElement={ActionButton('search')}
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

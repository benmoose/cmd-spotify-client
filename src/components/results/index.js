import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@blueprintjs/core'

const Results = ({ entities, order, loading }) => {
  return (
    <Card>
      Results panel
    </Card>
  )
}

Results.propTypes = {
  entities: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  order: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired
}

export default Results

import React, { Component } from 'react'

import withNav from './enhancers/withNav'
import Toaster from './components/toaster'
import CommandInput from './components/commandInput'
import Results from './components/results'

/**
 * Single container component (very simple app)
 */
class App extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <CommandInput
          value='search summer of 69'
          loading={false}
          actions={{
            onSubmit: console.log,
            onChange: console.log
          }}
        />
        <Results
          entities={{}}
          order={[]}
          loading={false}
        />
      </div>
    )
  }
}

export default withNav(App)

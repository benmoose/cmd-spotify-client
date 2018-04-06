import React from 'react'
import ReactDOM from 'react-dom'

import registerServiceWorker from './registerServiceWorker'
import App from './App'

import './styles/bootstrap/bootstrap-reboot.css'
import './styles/bootstrap/bootstrap-grid.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

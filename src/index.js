import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker'
import App from './App'
import createStore from './store'

import './styles/bootstrap/bootstrap-reboot.css'
import './styles/bootstrap/bootstrap-grid.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './styles/index.css'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './muiTheme'
import { Provider } from 'react-redux'
import configureStore from './store'
import Routes from './routes'

const store = configureStore()

ReactDOM.render(
  <MuiThemeProvider theme={theme} >
    <CssBaseline />
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { Provider } from "react-redux"
import { StripeProvider } from "react-stripe-elements"
import theme from "./muiTheme"
import * as serviceWorker from "./serviceWorker"
import store from "./store"
import Routes from "./routes"
import "./i18n"


ReactDOM.render(
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiThemeProvider>
  </StripeProvider>,
  document.getElementById("root")
)

serviceWorker.unregister()

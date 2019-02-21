import React, { lazy } from "react"
import { Route, Switch, Router } from "react-router-dom"
import history from "./history"
import LogIn from "./components/Authentication/LogIn"
import SignUp from "./components/Authentication/SignUp"
import EmailActivation from "./components/Authentication/EmailActivation"
import ForgetPassword from "./components/Authentication/ForgetPassword"
import AppNavigation from "./components/navigation/AppNavigation"
import Channels from "./components/channels/Channels"
import ProtectedRoute from "./ProtectedRoute"
import App from "./App"
import LogInfo from "./components/logs/LogInfo"
import withLazyLoading from "./components/withLazyLoading"

const Channel = lazy(() => import("./components/channels/Channel"))
const AccessLogs = lazy(() => import("./components/logs/AccessLogs"))
const Billing = lazy(() => import("./components/billing/Billing"))
const Settings = lazy(() => import("./components/settings/Settings"))
const SubUsers = lazy(() => import("./components/users/SubUsers"))
const WebhooksRules = lazy(() => import("./components/webhooks/WebhooksRules"))

const WithNavigation = () => (
  <div style={{ display: "flex" }}>
    <ProtectedRoute component={AppNavigation} />
    <ProtectedRoute path="/" exact component={App} />
    <ProtectedRoute path="/channels" exact component={Channels} />
    <ProtectedRoute path="/channels/:id" exact component={withLazyLoading(Channel)} />
    <ProtectedRoute path="/logs" exact component={withLazyLoading(AccessLogs)} />
    <ProtectedRoute path="/logs/:id" exact component={LogInfo} />
    <ProtectedRoute path="/webhooks" exact component={withLazyLoading(WebhooksRules)} />
    <ProtectedRoute path="/billing" exact component={withLazyLoading(Billing)} />
    <ProtectedRoute path="/settings" exact component={withLazyLoading(Settings)} />
    <ProtectedRoute path="/users" exact component={withLazyLoading(SubUsers)} />
  </div>
)

class Routes extends React.Component {
  componentDidMount() {
    // @TO DO - uncoment in production
    // loadReCaptcha("6Ld8qYcUAAAAADWP8M3N4MD7J_hfIHLvfqoY8nIH")
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/password" exact component={ForgetPassword} />
          <Route path="/signup/success" exact component={EmailActivation} />
          <Route component={WithNavigation} />
        </Switch>
      </Router>
    )
  }
}

export default Routes

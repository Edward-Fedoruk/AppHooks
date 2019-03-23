import React, { lazy } from "react"
import { Route, Switch, Router } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import history from "./history"
import LogIn from "./components/Authentication/LogIn"
import SignUp from "./components/Authentication/SignUp"
import EmailActivation from "./components/Authentication/EmailActivation"
import ForgetPassword from "./components/Authentication/ForgetPassword"
import AppNavigation from "./components/navigation/AppNavigation"
import Channels from "./components/channels/Channels"
import App from "./App"
import LogInfo from "./components/logs/LogInfo"
import withLazyLoading from "./components/withLazyLoading"
import { fetchUserSettings } from "./actions/user"
import { fetchUsers } from "./actions/subUsers"
import { startTimer } from "./actions/refreshToken"
import { createLoadingSelector } from "./actions/utils"
import Preloader from "./components/Preloader"

const Channel = lazy(() => import("./components/channels/Channel"))
const Endpoint = lazy(() => import("./components/endpoints/Endpoint"))
const AccessLogs = lazy(() => import("./components/logs/AccessLogs"))
const Billing = lazy(() => import("./components/billing/Billing"))
const Settings = lazy(() => import("./components/settings/Settings"))
const SubUsers = lazy(() => import("./components/users/SubUsers"))
const WebhooksRules = lazy(() => import("./components/webhooks/WebhooksRules"))

const WithNavigation = () => (
  <div style={{ display: "flex" }}>
    <Route component={AppNavigation} />
    <Route path="/" exact component={App} />
    <Route path="/channels" exact component={Channels} />
    <Route path="/channels/:channelId/:stageId" exact component={withLazyLoading(Channel)} />
    <Route path="/channels/:channelId/:stageId/:endpointId" exact component={withLazyLoading(Endpoint)} />
    <Route path="/logs" exact component={withLazyLoading(AccessLogs)} />
    <Route path="/logs/:id" exact component={LogInfo} />
    <Route path="/webhooks" exact component={withLazyLoading(WebhooksRules)} />
    <Route path="/billing" exact component={withLazyLoading(Billing)} />
    <Route path="/settings" exact component={withLazyLoading(Settings)} />
    <Route path="/users" exact component={withLazyLoading(SubUsers)} />
  </div>
)

class Routes extends React.Component {
  static propTypes = {
    fetchUserSettings: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: true,
    isAuthenticated: false,
  }

  componentDidMount() {
    // @TO DO - uncoment in production
    // loadReCaptcha("6Ld8qYcUAAAAADWP8M3N4MD7J_hfIHLvfqoY8nIH")
    this.props.fetchUserSettings()
    this.props.fetchUsers()
    console.log("initial mount")
    startTimer()
  }

  componentDidUpdate() {
    startTimer()
  }

  render() {
    const { isLoading, isAuthenticated } = this.props
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/password" exact component={ForgetPassword} />
          <Route path="/signup/success" exact component={EmailActivation} />
          {isAuthenticated && isLoading ? <Preloader /> : <Route component={WithNavigation} />}
        </Switch>
      </Router>
    )
  }
}

const loadingSelector = createLoadingSelector(["SET_USER_SETTINGS"])

const mapStateToProps = ({ preloader, userSettings }) => ({
  isLoading: loadingSelector(preloader),
  isAuthenticated: userSettings.isAuthenticated,
})

export default connect(mapStateToProps, { fetchUserSettings, fetchUsers })(Routes)

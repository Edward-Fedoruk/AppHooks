import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import LogIn from "./components/Authentication/LogIn"
import SignUp from "./components/Authentication/SignUp"
import EmailActivation from "./components/Authentication/EmailActivation"
import ForgetPassword from "./components/Authentication/ForgetPassword"
import ResetPassword from "./components/Authentication/ResetPassword"
import AppNavigation from "./components/navigation/AppNavigation"
import Channels from "./components/channels/Channels"
import Channel from "./components/channels/Channel"
import AccessLogs from "./components/logs/AccessLogs"
import SubUsers from "./components/users/SubUsers"
import ProtectedRout from "./ProtectedRout"
import App from "./App"
import WebhooksRules from "./components/webhooks/WebhooksRules"
import Billing from "./components/billing/Billing"
import LogInfo from "./components/logs/LogInfo"

const WithNavigation = () => (
  <div style={{ display: "flex" }}>
    <ProtectedRout component={AppNavigation} />
    <ProtectedRout path="/" exact component={App} />
    <ProtectedRout path="/channels" exact component={Channels} />
    <ProtectedRout path="/channels/:id" exact component={Channel} />
    <ProtectedRout path="/logs" exact component={AccessLogs} />
    <ProtectedRout path="/logs/:id" exact component={LogInfo} />
    <ProtectedRout path="/webhooks" exact component={WebhooksRules} />
    <ProtectedRout path="/billing" exact component={Billing} />
    <ProtectedRout path="/users" exact component={SubUsers} />
  </div>
)

class Routes extends React.Component {

  componentDidMount() {
    // @TO DO - uncoment in production
    // loadReCaptcha("6Ld8qYcUAAAAADWP8M3N4MD7J_hfIHLvfqoY8nIH")
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/password" exact component={ForgetPassword} />
          <ProtectedRout path="/resetPassword" exact component={ResetPassword} />
          <Route path="/signup/success" exact component={EmailActivation} />
          <Route component={WithNavigation}/>
        </Switch>   
      </BrowserRouter>
    ) 
  }
}

export default Routes
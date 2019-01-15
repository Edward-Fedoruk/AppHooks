import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import LogIn from './components/Authentication/LogIn'
import SignUp from './components/Authentication/SignUp'
import EmailActivation from './components/Authentication/EmailActivation'
import ForgetPassword from './components/Authentication/ForgetPassword'
import ResetPassword from './components/Authentication/ResetPassword'
import { loadReCaptcha } from 'react-recaptcha-v3'
import ProtectedRout from './ProtectedRout'
import App from './App'
import AppNavigation from "./components/navigation/AppNavigation"
import Channels from "./components/channels/Channels"
import Channel from "./components/channels/Channel"

const WithNavigation = () => (
  <div style={{ display: "flex" }}>
    <ProtectedRout component={AppNavigation} />
    <ProtectedRout path='/' exact component={App} />
    <ProtectedRout path='/channels' exact component={Channels} />
    <ProtectedRout path='/channels/:id' exact component={Channel} />
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
          <Route path='/login' exact component={LogIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/password' exact component={ForgetPassword} />
          <ProtectedRout path='/resetPassword' exact component={ResetPassword} />
          <ProtectedRout path='/signup/success' exact component={EmailActivation} />
          <Route component={WithNavigation}/>
        </Switch>   
      </BrowserRouter>
    ) 
  }
}

export default Routes
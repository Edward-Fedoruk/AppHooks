import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import LogIn from './components/Authentication/LogIn'
import SignUp from './components/Authentication/SignUp'
import EmailActivation from './components/Authentication/EmailActivation'
import ForgetPassword from './components/Authentication/ForgetPassword'
import ResetPassword from './components/Authentication/ResetPassword'
import { loadReCaptcha } from 'react-recaptcha-v3'


class Routes extends React.Component {

  componentDidMount() {
    // @TO DO - install recaptcha with key
    // loadReCaptcha()
  }

  render() {  
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={LogIn} />
          <Route path='/resetPassword' exact component={ResetPassword} />
          <Route path='/password' exact component={ForgetPassword} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/signup/success' exact component={EmailActivation} />
        </Switch>   
      </BrowserRouter>
    ) 
  }
}

export default Routes
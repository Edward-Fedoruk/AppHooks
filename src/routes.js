import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import LogIn from './components/Authentication/LogIn'
import SignUp from './components/Authentication/SignUp'
import { loadReCaptcha } from 'react-recaptcha-v3'

class Routes extends React.Component {

  componentDidMount() {
    // @TO DO - install recaptcha with key
    // loadReCaptcha()
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={LogIn} />
          <Route path='/signup' exact component={SignUp} />
        </Switch>   
      </BrowserRouter>
    ) 
  }
}

export default Routes
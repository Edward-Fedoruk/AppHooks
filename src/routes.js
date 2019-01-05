import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import LogIn from './components/Authentication/LogIn'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={LogIn} />
    </Switch>   
  </BrowserRouter>
)


export default Routes
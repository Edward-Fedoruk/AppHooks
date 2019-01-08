import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'


const ProtectedRoute = ({ component: Comp, isAuthenticated, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        )
      }}
    />
  )
}

const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated
})

export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRoute)
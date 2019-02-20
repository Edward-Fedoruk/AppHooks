import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const ProtectedRoute = ({
  component: Comp, isAuthenticated, path, ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props => (true ? (
      <Comp {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            prevLocation: path,
            error: "You need to login first!",
          },
        }}
      />
    ))}
  />
)

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
}

const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated,
})

export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRoute)

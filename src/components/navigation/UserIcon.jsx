import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import Gravatar  from "react-gravatar"
import IconButton from "@material-ui/core/IconButton"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"

const styles = () => ({
  user: {
    height: "45px",
    borderRadius: "50%",
    width: "45px"
  },
})


const UserIcon = ({ classes, className, history, email }) => {
  const openSettings = () => history.push("/settings")
  return (
    <IconButton onClick={openSettings} className={className}>
      <Gravatar email={email} className={classes.user} />
    </IconButton>
  )
}

UserIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ userSettings }) => ({
  email: userSettings.settings.email
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, null)
)(UserIcon)

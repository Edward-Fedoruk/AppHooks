import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import Gravatar from "react-gravatar"
import IconButton from "@material-ui/core/IconButton"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import classNames from "classnames"

const styles = () => ({
  user: {
    height: "35px",
    borderRadius: "50%",
    width: "35px",
  },

  userIcon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
})


const UserIcon = ({
  classes, className, history, email,
}) => {
  const openSettings = () => history.push("/settings")
  return (
    <IconButton disableRipple onClick={openSettings} className={classNames(className, classes.userIcon)}>
      <Gravatar email={email} default="identicon" className={classes.user} />
    </IconButton>
  )
}

UserIcon.defaultProps = {
  className: "",
  email: "placeholder@gmail.com",
}

UserIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  email: PropTypes.string,
}

const mapStateToProps = ({ userSettings }) => ({
  email: userSettings.settings.email,
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, null)
)(UserIcon)

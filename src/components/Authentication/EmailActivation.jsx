/* eslint-disable react/jsx-one-expression-per-line */
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { paperStyles, titleStyles } from "./formStyles"
import withBackground from "./withBackground"
import { reSendEmail } from "../../actions/auth"


const styles = ({ breakpoints }) => ({
  paper: {
    ...paperStyles,

    [breakpoints.down(500)]: {
      width: "90%",
      padding: "36px 15px",
      alignSelf: "center",
    },
  },

  title: {
    ...titleStyles,
  },

  p: {
    fontWeight: "400",
    fontSize: "16px",
    color: "#5A5B5F",
    lineHeight: "23px",
    marginTop: "15px",
  },

  link: {
    color: "rgb(0, 0, 238)",
    cursor: "pointer",
    textDecoration: "underline",
    "&:active": {
      color: "rgb(255, 0, 0)",
    },
  },

})

export const EmailActivation = ({ classes, location }) => (
  <Paper className={classes.paper}>
    <Typography className={classes.title} variant="h3" align="center">
      Thank you for registration!
    </Typography>
    <Typography className={classes.p}>
      We’ve sent a verification email to
      {" "}
      { location.state.userData.email }.
        Please use the link provided in the email to activate
      and start using your AppHooks account.
    </Typography>
  </Paper>
)


EmailActivation.defaultProps = {
  location: { state: { userData: "your email" } }
}

EmailActivation.propTypes = {
  location: PropTypes.object,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  reSendEmail: email => dispatch(reSendEmail(email)),
})

export default compose(
  withBackground,
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(EmailActivation)

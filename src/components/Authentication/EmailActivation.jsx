import React from 'react'
import withBackground from './withBackground'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const styles = ({ breakpoints }) => ({
  paper: {
    padding: "36px 50px",
    width: "500px",
    height: "fit-content",
    marginTop: "8%",

    [breakpoints.down(500)]: {
      width: "90%",
      padding: "36px 15px",
      alignSelf: "center",  
    }
  },

  title: {
    fontWeight: "500",
    fontSize: "20px",
    color: "#5A5B5F",
    marginBottom: "25px"
  },

  p: {
    fontWeight: "400",
    fontSize: "16px",
    color: "#5A5B5F",
    lineHeight: "23px",
    marginTop: "15px"
  },

  link: {
    color: "rgb(0, 0, 238)",
    cursor: "pointer",
    textDecoration: "underline",
    "&:active": {
      color: "rgb(255, 0, 0)"
    },
  },
  
})

const EmailActivation = ({ classes, email }) => {
  const resend = () => {}
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h3" align="center">
        Thank you for registration!
      </Typography>
      <Typography className={classes.p}>
        We’ve sent a verification email to { email }
        Please use the link provided in the email to activate
        and start using your AppHooks account.
      </Typography>
      <Typography className={classes.p}>
        You can <span className={classes.link} onClick={resend}>re-send a verification mail.</span>
      </Typography>
    </Paper>
  ) 
}

EmailActivation.propTypes = {
  email: PropTypes.string.isRequired
}

export default withBackground(withStyles(styles)(EmailActivation))

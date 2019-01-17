import React from 'react'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

const styles = ({ breakpoints, spacing }) => ({
  snackbar: {
    width: "30%",
    maxWidth: "450px",
    minWidth: "305px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "10px",

    [breakpoints.down(900)]: {
      width: "70%",
    },
    [breakpoints.down(500)]: {
      width: "95%",
    },
  },
  error: {
    backgroundColor: "#F25252"
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const ErrorSnackbar = ({ 
  classes, className, message,
  variant, open
}) => {
  return (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
    >
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
      />
    </Snackbar>
  )
}

export default withStyles(styles)(ErrorSnackbar)
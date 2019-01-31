import React from 'react'
import classNames from 'classnames'
import ErrorIcon from '@material-ui/icons/Error'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { toggleSnackbar } from '../../actions/ui'

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
  error: { backgroundColor: "#F25252" },
  icon: { fontSize: 20 },
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
  toggleSnackbar, snackbar,
}) => {

  return (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={7000}
      open={snackbar}
      onClose={toggleSnackbar}
    >
      <SnackbarContent
        className={classNames(classes.error, className)}
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

const mapStateToProps = ({ view }) => ({
  snackbar: view.snackbar,
})

const mapDispatchToProps = dispatch => ({ 
  toggleSnackbar: () => dispatch(toggleSnackbar())
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ErrorSnackbar)
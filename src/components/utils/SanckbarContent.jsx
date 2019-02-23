import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { withStyles } from "@material-ui/core/styles"

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
}

const styles = ({ spacing }) => ({
  success: { backgroundColor: "#43a047" },
  error: { backgroundColor: "#F25252" },
  icon: { fontSize: 20 },

  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit,
  },

  message: {
    display: "flex",
    alignItems: "center",
  },
})

const MySnackbarContent = (props) => {
  const {
    classes, className, message, variant, ...other
  } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      )}
      {...other}
    />
  )
}

MySnackbarContent.defaultProps = {
  className: "",
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["success", "error"]).isRequired,
}

export default withStyles(styles)(MySnackbarContent)

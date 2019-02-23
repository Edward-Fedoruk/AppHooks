import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Snackbar from "@material-ui/core/Snackbar"
import { compose } from "redux"
import PropTypes from "prop-types"

const styles = ({ breakpoints }) => ({
  snackbar: {
    width: "30%",
    maxWidth: "450px",
    minWidth: "305px",
    position: "fixed",
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
})

const MySnakcbar = ({
  classes, toggleSnackbar, snackbar, children, ...other
}) => (
  <Snackbar
    className={classes.snackbar}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    autoHideDuration={7000}
    open={snackbar}
    onClose={toggleSnackbar}
    {...other}
  >
    { children }
  </Snackbar>
)

MySnakcbar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
  snackbar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default compose(
  withStyles(styles),
)(MySnakcbar)

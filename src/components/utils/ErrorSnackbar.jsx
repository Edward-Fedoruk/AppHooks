import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import PropTypes from "prop-types"
import Snackbar from "./Snackbar"
import { toggleSnackbar } from "../../actions/ui"
import SnackbarContent from "./SnackbarContent"

const ErrorSnackbar = ({
  className, message, toggleSnackbar, snackbar,
}) => (
  <Snackbar
    open={snackbar}
    onClose={toggleSnackbar}
  >
    <SnackbarContent
      className={className}
      variant="error"
      message={message}
    />
  </Snackbar>
)

ErrorSnackbar.defaultProps = {
  className: "",
  message: "something went wrong",
}

ErrorSnackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  toggleSnackbar: PropTypes.func.isRequired,
  snackbar: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ view }) => ({
  snackbar: !view.shortcutPanel && view.snackbar,
})

const mapDispatchToProps = dispatch => ({
  toggleSnackbar: () => dispatch(toggleSnackbar()),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ErrorSnackbar)

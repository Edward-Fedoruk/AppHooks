import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import PropTypes from "prop-types"
import Snackbar from "./Snackbar"
import { toggleSuccessSnackbar } from "../../actions/ui"
import SnackbarContent from "./SanckbarContent"

const SuccessSnackbar = ({
  className, message, toggleSnackbar, snackbar,
}) => (
  <Snackbar
    open={snackbar}
    onClose={toggleSnackbar}
  >
    <SnackbarContent
      className={className}
      variant="success"
      message={message}
    />
  </Snackbar>
)

SuccessSnackbar.defaultProps = {
  className: "",
  message: "Success action",
}

SuccessSnackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  toggleSnackbar: PropTypes.func.isRequired,
  snackbar: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ view }) => ({
  snackbar: view.successSnackbar,
})

const mapDispatchToProps = dispatch => ({
  toggleSnackbar: () => dispatch(toggleSuccessSnackbar("")),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SuccessSnackbar)

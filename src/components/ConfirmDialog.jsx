import React from "react"
import PropTypes from "prop-types"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

export const ConfirmDialog = ({ open, handleClose, handleCloseWithAction }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogActions>
      <Button onClick={handleClose} color="primary">Disagree</Button>
      <Button onClick={handleCloseWithAction} color="primary" autoFocus>Agree</Button>
    </DialogActions>
  </Dialog>
)


ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseWithAction: PropTypes.func.isRequired,
}

export default ConfirmDialog

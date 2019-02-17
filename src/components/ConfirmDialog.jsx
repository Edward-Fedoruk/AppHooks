import React from "react"
import PropTypes from "prop-types"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

export const ConfirmDialog = ({
  open, handleClose, handleCloseWithAction, children,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        { children }
      </DialogContentText>
    </DialogContent>
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
  children: PropTypes.string.isRequired
}

export default ConfirmDialog

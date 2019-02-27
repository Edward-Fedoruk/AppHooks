import React from "react"
import PropTypes from "prop-types"
import Dialog from "@material-ui/core/Dialog"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import WarningIcon from "@material-ui/icons/WarningRounded"

const styles = ({ palette, breakpoints }) => ({
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px 0",
  },

  titleHead: {
    color: "#F25252",
    fontSize: "18px",
    fontWeight: "400",

    [breakpoints.down(768)]: {
      fontSize: "16px",
    },
  },

  warningIcon: {
    color: "#F25252",
    fontSize: "40px",
    fontWidth: "400",

    [breakpoints.down(768)]: {
      fontSize: "30px",
    },
  },

  content: {
    backgroundColor: "#F5F6FC",
    borderTop: "1px solid #D7DEF1",
    paddingTop: "27px",
  },

  delete: {
    background: "#F25252",
    fontWeight: "400",
    color: "#fff",
    texTransform: "capitalize",
  },

  cancel: {
    fontWeight: "400",
    texTransform: "capitalize",
  },

  dialogText: {
    color: palette.primary.main,
    [breakpoints.down(768)]: {
      fontSize: "15px",
    },
  },

  dialog: {
    margin: "0",
  },

  actions: {
    background: "#F5F6FC",
    margin: "0",
    paddingBottom: "27px",
    display: "flex",
    justifyContent: "space-around",
  },
})

export const ConfirmDialog = ({
  open, handleClose, handleCloseWithAction,
  children, classes, title,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle disableTypography className={classes.title}>
      <WarningIcon className={classes.warningIcon} />
      <Typography className={classes.titleHead}>{title}</Typography>
    </DialogTitle>
    <DialogContent className={classes.content}>
      <DialogContentText className={classes.dialogText} id="alert-dialog-description">
        { children }
      </DialogContentText>
    </DialogContent>
    <DialogActions className={classes.actions}>
      <Button onClick={handleClose} className={classes.cancel} autoFocus variant="outlined" color="primary">Cancel</Button>
      <Button onClick={handleCloseWithAction} className={classes.delete} variant="flat" color="primary">Delete</Button>
    </DialogActions>
  </Dialog>
)

ConfirmDialog.defaultProps = {
  children: "Are you sure?",
  title: "Delete this object",
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCloseWithAction: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default withStyles(styles)(ConfirmDialog)

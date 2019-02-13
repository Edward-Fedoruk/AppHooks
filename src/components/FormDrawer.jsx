import React from "react"
import PropTypes from "prop-types"
import Slide from "@material-ui/core/Slide"
import Dialog from "@material-ui/core/Dialog"
import { withStyles } from "@material-ui/core"
import Close from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"

const styles = ({ breakpoints }) => ({
  dialog: {
    minWidth: "calc(100% - 305px)",
    maxWidth: "calc(100% - 250px)",
    width: "77vw",
    left: "unset",
    right: "0px",

    [breakpoints.down(960)]: {
      width: "100%",
      minWidth: "unset",
      maxWidth: "unset",
    },
    [breakpoints.down(600)]: {
      width: "100%",
    },
  },

  close: {
    position: "absolute",
    top: "5px",
    right: "5px",
    display: "none",

    [breakpoints.down(960)]: {
      display: "block",
    },
  },

  formWrap: {
    padding: "20px 13vw",

    [breakpoints.down(768)]: {
      padding: "20px 10vw",
    },
  },
})

function Transition(props) {
  return <Slide direction="left" {...props} />
}

export const FormDrawer = ({
  classes, open, toggleDialog, children,
}) => (
  <Dialog
    fullScreen
    open={open}
    onClose={toggleDialog}
    TransitionComponent={Transition}
    className={classes.dialog}
  >
    <IconButton
      onClick={toggleDialog}
      className={classes.close}
    >
      <Close />
    </IconButton>
    <div className={classes.formWrap}>
      {children}
    </div>
  </Dialog>
)

FormDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(FormDrawer)

import React, { Component } from "react"
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
      display: "block"
    },
  }
})

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

export class FormDrawer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.toggleDialog}
        TransitionComponent={Transition}
        className={classes.dialog}
      >
        <IconButton 
          onClick={this.props.toggleDialog} 
          className={classes.close}
        >
          <Close/>
        </IconButton>
        {this.props.children}
      </Dialog>
    )
  }
}

export default withStyles(styles)(FormDrawer)
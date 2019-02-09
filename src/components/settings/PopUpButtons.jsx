import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Grow from "@material-ui/core/Grow"
import { withStyles } from "@material-ui/core"
import MainButton from "../MainButton"

const styles = ({ breakpoints }) => ({
  btnGroup: {
    position: "absolute",
    bottom: "-60px",

    [breakpoints.down(425)]: {
      paddingLeft: "15px",
      height: "60px",
      width: "100%",
      backgroundColor: "#fff",
    },
  },

  cancel: {
    textTransform: "capitalize",
    marginRight: "15px",
  },
})

const PopUpButtons = ({ classes, show, toggleForm }) => (
  <div style={{ display: !show && "none" }} className={classes.btnGroup}>
    <Grow
      in={show}
      style={{ transformOrigin: "0 0 0" }}
    >
      <Button
        variant="outlined"
        color="secondary"
        size="medium"
        className={classes.cancel}
        onClick={toggleForm}
      >
          cancel
      </Button>
    </Grow>
    <Grow
      in={show}
      style={{ transformOrigin: "0 0 0" }}
      {...(show ? { timeout: 1000 } : {})}
    >
      <MainButton type="submit" size="medium">Confirm</MainButton>
    </Grow>
  </div>
)

PopUpButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  toggleForm: PropTypes.func.isRequired,
}

export default withStyles(styles)(PopUpButtons)

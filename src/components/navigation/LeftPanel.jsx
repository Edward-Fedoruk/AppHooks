import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AddCircle from "@material-ui/icons/AddCircle"
import IconButton from "@material-ui/core/IconButton"
import { Scrollbars } from "react-custom-scrollbars"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import Help from "@material-ui/icons/Help"
import { ReactComponent as LogoIcon } from "../../assets/LogoIcon.svg"
import UserIcon from "./UserIcon"

const iconsGroup = {
  alignSelf: "flex-start",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}

const styles = () => ({
  paper: {
    background: "#192B81",
    width: "55px",
    height: "100vh",
    paddingTop: "3px",
    zIndex: "1300",
    position: "fixed",

  },

  iconsWrap: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "center",
  },

  addCircleWrap: {
    marginTop: "15px",
    color: "#d1d5e6",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  bottomIcons: {
    ...iconsGroup,
    alignSelf: "flex-end",
    marginTop: "25px",
  },

  questionMarkWrap: {
    marginBottom: "0px",
    color: "#d1d5e6",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  topIcons: iconsGroup,
  logoIcon: { width: "100%" },
  addCircle: { fontSize: "30px" },
  questionMark: { fontSize: "25px" },
  userWrap: { marginBottom: "15px" },

})

const LeftPanel = ({ classes }) => (
  <div className={classes.paper}>
    <Scrollbars>
      <div className={classes.iconsWrap}>
        <div className={classes.topIcons}>
          <LogoIcon className={classes.logoIcon} />

          <IconButton disableRipple className={classes.addCircleWrap}>
            <AddCircle className={classes.addCircle} />
          </IconButton>
        </div>
        <div className={classes.bottomIcons}>
          <IconButton disableRipple className={classes.questionMarkWrap}>
            <Help className={classes.questionMark} />
          </IconButton>

          <UserIcon className={classes.userWrap} />
        </div>
      </div>
    </Scrollbars>
  </div>
)

LeftPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  withRouter,
)(LeftPanel)

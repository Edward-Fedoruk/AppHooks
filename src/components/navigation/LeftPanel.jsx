import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AddCircle from "@material-ui/icons/AddCircle"
import IconButton from "@material-ui/core/IconButton"
import { Scrollbars } from "react-custom-scrollbars"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { ReactComponent as QuestionMark } from "../../assets/QuestionMark.svg"
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
    minWidth: "73px",
    maxWidth: "88px",
    width: "6%",
    height: "100vh",
    paddingTop: "9px",
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
    marginTop: "45px",
    color: "#d1d5e6",
  },

  bottomIcons: {
    ...iconsGroup,
    alignSelf: "flex-end",
    marginTop: "25px",
  },

  topIcons: iconsGroup,
  logoIcon: { width: "100%" },
  addCircle: { fontSize: "35px" },
  questionMarkWrap: { marginBottom: "20px" },
  questionMark: { height: "35px" },
  userWrap: { marginBottom: "33px" },

})

const LeftPanel = ({ classes }) => (
  <div className={classes.paper}>
    <Scrollbars>
      <div className={classes.iconsWrap}>
        <div className={classes.topIcons}>
          <LogoIcon className={classes.logoIcon} />

          <IconButton className={classes.addCircleWrap}>
            <AddCircle className={classes.addCircle} />
          </IconButton>
        </div>
        <div className={classes.bottomIcons}>
          <IconButton className={classes.questionMarkWrap}>
            <QuestionMark className={classes.questionMark} />
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

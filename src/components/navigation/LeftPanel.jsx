import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import AddCircle from "@material-ui/icons/AddCircle"
import IconButton from "@material-ui/core/IconButton"
import { Scrollbars } from "react-custom-scrollbars"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import Gravatar from "react-gravatar"
import { ReactComponent as QuestionMark } from "../../assets/QuestionMark.svg"
import { ReactComponent as LogoIcon } from "../../assets/LogoIcon.svg"
import UserIcon from "./UserIcon"

const iconsGroup = {
  alignSelf: "flex-start",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}

const styles = ({ breakpoints }) => ({
  paper: {
    background: "#192B81",
    minWidth: "73px",
    maxWidth: "88px",
    width: "7%",
    height: "100vh",
    paddingTop: "13px",
    zIndex: "1300",
    position: "fixed",

  },

  iconsWrap: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "center",
  },

  topIcons: iconsGroup,

  logoIcon: {
    width: "100%",
  },

  addCircleWrap: {
    marginTop: "45px",
    color: "#d1d5e6",
  },

  addCircle: {
    fontSize: "35px",
  },

  bottomIcons: {
    ...iconsGroup,
    alignSelf: "flex-end",
    marginTop: "25px",
  },

  questionMarkWrap: {
    marginBottom: "20px",
  },

  questionMark: {
    height: "35px",
  },

  userWrap: {
    marginBottom: "33px",
  },
})

export class LeftPanel extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  openSettings = () => this.props.history.push("/settings")

  render() {
    const { classes } = this.props
    return (
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
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LeftPanel)

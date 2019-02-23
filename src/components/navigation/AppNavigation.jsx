import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import withWidth from "@material-ui/core/withWidth"
import { compose } from "redux"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { toggleNavBar } from "../../actions/ui"
import { fetchUserSettings } from "../../actions/user"

const styles = ({ breakpoints }) => ({
  drawerPaper: {
    background: "#192B81",
    display: "flex",
    flexWrap: "wrap",
    width: "250px",
    // maxWidth: "306px",
    // minWidth: "270px",
    overflow: "hidden",


    [breakpoints.down(600)]: {
      minWidth: "220px",
    },
  },

  drawer: {
    color: "rgba(255, 255, 255, 0.7)",
    // width: "23vw",
    maxWidth: "306px",
    minWidth: "250px",

    [breakpoints.down(960)]: {
      zIndex: "0",
    },
  },


})

class AppNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    toggleNavBar: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    fetchUserSettings: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUserSettings()
  }

  render() {
    const {
      classes, open, toggleNavBar, width,
    } = this.props
    const downMd = width === "sm" || width === "xs"
    return (
      <Fragment>
        {width !== "xs" && <LeftPanel />}
        <Drawer
          variant={downMd ? "temporary" : "permanent"}
          className={classes.drawer}
          open={open}
          onClose={toggleNavBar}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <RightPanel />
        </Drawer>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ view }) => ({
  open: view.open,
})

const mapDispatchToProps = {
  toggleNavBar,
  fetchUserSettings,
}

export default compose(
  withWidth(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AppNavigation)

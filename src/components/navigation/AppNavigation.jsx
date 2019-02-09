import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import withWidth from "@material-ui/core/withWidth"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import { toggleNavBar } from "../../actions/ui"
import { fetchUserSettings } from "../../actions/user"

const styles = ({ transitions, breakpoints }) => ({
  drawerPaper: {
    background: "#192B81",
    display: "flex",
    flexWrap: "wrap",
    width: "23vw",
    maxWidth: "306px",
    minWidth: "250px",
    overflow: "hidden",


    [breakpoints.down(600)]: {
      minWidth: "200px",
    },
  },

  drawer: {
    color: "rgba(255, 255, 255, 0.7)",
    width: "23vw",
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
  }

  componentDidMount() {
    this.props.fetchUserSettings()
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const {
      classes, open, toggleNavBar, width,
    } = this.props
    console.log(width)
    const downMd = width === "sm" || width === "xs"
    return (
      <div>
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
      </div>
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

export default withWidth()(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppNavigation)))

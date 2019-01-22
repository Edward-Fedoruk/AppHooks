import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { toggleNavBar } from '../../actions/ui'
import withWidth from '@material-ui/core/withWidth'

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
      // position: "absolute",
      // width: "100%",
      // height: "100%",
      // background: "rgba(0, 0, 0, 0.25)"
    },
    // width: "23vw",
    // transition: transitions.create('margin', {
    //   easing: transitions.easing.easeOut,
    //   duration: transitions.duration.enteringScreen,
    // })
  },


})

class AppNavigation extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { classes, open, toggleNavBar, width } = this.props
    console.log(width)
    const downMd = width === "sm" || width === "xs"
    return (
      <div>
        {width !== "xs" && <LeftPanel />}
        <Drawer
          variant={ downMd ? "temporary" : "permanent" }
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
  toggleNavBar
}

export default withWidth()(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppNavigation)))

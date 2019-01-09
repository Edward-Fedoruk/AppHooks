import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const styles = () => ({
  drawerPaper: {
    background: "#192B81",
    display: "flex",
    flexWrap: "wrap",
    width: "306px",
    overflow: "hidden",
  },

  drawer: {
    color: "rgba(255, 255, 255, 0.7)",
    display: "flex"
  },


})

class AppNavigation extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left" 
        >

          <LeftPanel />

          <RightPanel />

        </Drawer>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppNavigation))

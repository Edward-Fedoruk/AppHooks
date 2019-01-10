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
    width: "23vw",
    maxWidth: "306px",
    minWidth: "250px",
    overflow: "hidden",
  },

  drawer: {
    color: "rgba(255, 255, 255, 0.7)",
    display: "flex"
  },


})

class AppNavigation extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

  render() {
    const { classes, theme } = this.props
    return (
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
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(AppNavigation))

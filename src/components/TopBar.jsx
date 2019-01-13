import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import Title from './Title'
import { withWidth } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { connect } from 'react-redux'
import { compose }  from "redux"
import { toggleNavBar } from '../actions/ui'

const styles = () => ({
  title: {
    flexGrow: 1,
    fontSize: "25px",
    fontFamily: "Lato",
    textTransform: "capitalize",
    color: "#192B7F",
    fontWeight: "bold"
  },  
  
  channel: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px",
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },
  },

  appBar: {
    background: "#fff",
    height: "80px",
    display: "flex",
    justifyContent: "center"
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "#192B81"
  },
})

export class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object,
    history: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    button: PropTypes.bool.isRequired,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func
  }

  render() {
    const { classes, title, buttonText, button, onButtonClick, width, toggleMenu } = this.props
    const downMd = width === "sm" || width === "xs"
    return (
      <AppBar 
        position="static" 
        className={classes.appBar} 
        elevation={0}
      >
        <Toolbar>
          {downMd && 
            <IconButton 
              onClick={toggleMenu} 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>}

          <Title 
            variant="h2" 
            color="primary" 
            title={title}
          />
          
          {button &&
            <Button 
              size={"large"}
              color="primary" 
              variant="text" 
              className={classes.channel}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>}

        </Toolbar>
      </AppBar>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleNavBar())
})

export default compose(
  withWidth(),
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(TopBar)

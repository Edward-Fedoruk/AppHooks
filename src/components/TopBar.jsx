import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

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
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
    },
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px"
  },

  appBar: {
    background: "#fff",
    height: "80px",
    display: "flex",
    justifyContent: "center"
  }
})

export class TopBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    button: PropTypes.bool.isRequired,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func
  }

  render() {
    const { classes, title, buttonText, button, onButtonClick } = this.props
    return (
      <AppBar 
        position="static" 
        className={classes.appBar} 
        elevation={0}
      >
        <Toolbar>
          <Typography 
            variant="h2" 
            color="primary" 
            className={classes.title}
          >
            {title}
          </Typography>
          
          {button &&
            <Button 
              size={"large"}
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

export default  withStyles(styles)(withRouter(TopBar))

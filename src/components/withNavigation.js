import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withWidth } from '@material-ui/core/'
import { Scrollbars } from 'react-custom-scrollbars'
import Toolbar from '@material-ui/core/Toolbar'
import AddCircle from '@material-ui/icons/AddCircle'
import { ReactComponent as User} from '../assets/User.svg'
import { ReactComponent as QuestionMark} from '../assets/QuestionMark.svg'
import IconButton from '@material-ui/core/IconButton'

const styles = ({ breakpoints }) => ({
  background: {
    backgroundColor: "#F4F8FB",
    minWidth: "calc(100% - 305px)", 
    maxWidth: "calc(100% - 250px)",
    marginLeft: "auto",
    minHeight: "100vh",
    width: "77vw",
    
    [breakpoints.down(960)]: {
      width: "100%",
      marginLeft: "75px",
      minWidth: "unset", 
      maxWidth: "unset",
    },
    [breakpoints.down(600)]: {
      width: "100%",
      marginLeft: "0",
      paddingBottom: "60px"
    },
  },

  test: {
    position: "fixed",
    width: "100vw",
    height: "60px",
    bottom: "0",
    background: "#192B81",
    dispalay: "flex",
    justifyContent: "space-around"
  },

  icon: {
    height: "35px",
    fontSize: "35px",
    color: "#d1d5e6"
  }

})

export default (WrappedComponent) => {
  const hocComponent = ({ width, classes, ...props}) => {
    return(
      <div className={classes.background}>
        <Scrollbars style={{ height: "100vh" }}>
          <WrappedComponent {...props} />
        </Scrollbars>
        {width === "xs" 
          && <Toolbar className={classes.test}>
            <IconButton>
              <QuestionMark className={classes.icon}/>
            </IconButton>
            <IconButton>
              <AddCircle className={classes.icon} />
            </IconButton>
            <IconButton >
              <User className={classes.icon}/>
            </IconButton>
          </Toolbar>}
      </div>
    )
  }

  hocComponent.propTypes = {
  }

  return withWidth()(withStyles(styles)(hocComponent))
}

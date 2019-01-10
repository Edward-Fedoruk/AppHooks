import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'

const styles = () => ({
  background: {
    backgroundColor: "#F4F8FB",
    width: "77vw",
    minWidth: "calc(100% - 305px)", 
    maxWidth: "calc(100% - 250px)",
    marginLeft: "auto",
    minHeight: "100vh"
  }
})

export default (WrappedComponent) => {
  const hocComponent = ({ classes, ...props }) => (
    <div className={classes.background}>
      <Scrollbars style={{ height: "100vh" }}>
        <WrappedComponent {...props} />
      </Scrollbars>
    </div>
  )

  hocComponent.propTypes = {
  }

  return withStyles(styles)(hocComponent)
}

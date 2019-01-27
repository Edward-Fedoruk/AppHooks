import React from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"

const styles = () => ({
  settingsWrap: {
    display: "flex",
    flexDirection: "column"
  },

  header: {
    fontSize: "18px",
    fontWeight: "900",
    marginRight: "5px"
  },

  headerWrap: {
    display: "flex",
    alignItems: "center"
  },

  field: {
    color: "rgba(25, 43, 127, 0.7)",
    fontSize: "14px"
  },

  fieldWrap: {
    marginRight: "80px"
  },

  contentWrap: { marginBottom: "40px" }

})

const ConnectedAccounts = ({ classes }) => {
  return (
    <div className={classes.contentWrap}>
      <div className={classes.headerWrap}>
        <Typography className={classes.header} variant="h2" color="primary">
          Connected accounts
        </Typography>
      </div>
      <div className={classes.settingsWrap}>
        <Typography className={classes.field} variant="body2">Connected accounts to your AppHooks account if you want to log in to your AppHooks dashboard using them.</Typography> 
        <div>
          
        </div>
      </div>
    </div>
  )
}

ConnectedAccounts.propTypes = {

}

export default withStyles(styles)(ConnectedAccounts)

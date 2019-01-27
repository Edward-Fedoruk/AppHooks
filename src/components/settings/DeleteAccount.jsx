import React from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Cancel from "@material-ui/icons/Cancel"

const styles = () => ({
  settingsWrap: {
    display: "flex",
    flexDirection: "column"
  },

  delete: {
    color: "#F96565",
    textDecoration: "underline",
    fontSize: "14px"
  },

  header: {
    fontSize: "18px",
    fontWeight: "900",
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

  deleteIcon: {
    color: "#F96565"
  }
})

const DeleteAccount = ({ classes }) => {
  return (
    <div>
      <div className={classes.headerWrap}>
        <Typography className={classes.header} variant="h2" color="primary">
          Danger Zone
        </Typography>
      </div>
      <div className={classes.settingsWrap}>
        <Typography className={classes.field} variant="body2">Connected accounts to your AppHooks account if you want to log in to your AppHooks dashboard using them.</Typography> 
        <div className={classes.headerWrap}>
          <IconButton><Cancel className={classes.deleteIcon} /></IconButton>
          <Typography className={classes.delete} variant="h2" color="primary">
            Delete account
          </Typography>
        </div>
      </div>
    </div>
  )
}

DeleteAccount.propTypes = {

}

export default withStyles(styles)(DeleteAccount)

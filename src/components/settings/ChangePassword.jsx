import React from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Create from "@material-ui/icons/CreateOutlined"

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
    fontSize: "14px"
  },

  fieldWrap: {
    marginRight: "80px"
  },

  contentWrap: { marginBottom: "70px" }
})

const ChangePassword = ({ classes }) => {
  return (
    <div className={classes.contentWrap}>
      <div className={classes.headerWrap}>
        <Typography className={classes.header} variant="h2" color="primary">
          Change password
        </Typography>
        <IconButton><Create /></IconButton>
      </div>
      <div className={classes.settingsWrap}>

      </div>
    </div>
  )
}

ChangePassword.propTypes = {

}

export default withStyles(styles)(ChangePassword)

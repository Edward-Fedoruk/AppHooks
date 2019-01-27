import React from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Create from "@material-ui/icons/CreateOutlined"

const styles = () => ({
  settingsWrap: {
    display: "flex"
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

  aboveField: {
    color: "rgba(25, 43, 127, 0.7)",
    fontSize: "14px"
  },

  contentWrap: { marginBottom: "80px" }
})

const GeneralSettings = ({ classes }) => {
  const fileds = [
    ["Name", "Jonathan Smith"], 
    ["Email", "ed.fedorukk@gmail.com"], 
    ["Phone number", "+380992378587"]
  ]
  return (
    <div className={classes.contentWrap}>
      <div className={classes.headerWrap}>
        <Typography className={classes.header} variant="h2" color="primary">
          General settings
        </Typography>
        <IconButton>
          <Create />
        </IconButton>
      </div>
      <div className={classes.settingsWrap}>
        {fileds.map(field => (
          <div className={classes.fieldWrap}>
            <Typography className={classes.aboveField} gutterBottom variant="caption">
              {field[0]}
            </Typography>          
            <Typography className={classes.field} variant="subtitle2" color="primary">
              {field[1]}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

GeneralSettings.propTypes = {

}

export default withStyles(styles)(GeneralSettings)

import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"

const styles = ({ breakpoints }) => ({
  settingsWrap: {
    display: "flex",
    flexDirection: "column",

    [breakpoints.down(425)]: {
      backgroundColor: "#fff",
      padding: "5%",
    },
  },

  header: {
    fontSize: "18px",
    fontWeight: "500",
    marginRight: "5px",

    [breakpoints.down(425)]: {
      paddingLeft: "24px",
    },
  },

  headerWrap: {
    display: "flex",
    alignItems: "center",

    [breakpoints.down(425)]: {
      padding: "12px 0",
    },
  },

  field: {
    color: "rgba(25, 43, 127, 0.7)",
    fontSize: "14px",
  },

  fieldWrap: {
    marginRight: "80px",
  },

  contentWrap: { marginBottom: "40px" },

})

const ConnectedAccounts = ({ classes }) => (
  <div className={classes.contentWrap}>
    <div className={classes.headerWrap}>
      <Typography className={classes.header} variant="h2" color="primary">Connected accounts</Typography>
    </div>
    <div className={classes.settingsWrap}>
      <Typography className={classes.field} variant="body2">Connected accounts to your AppHooks account if you want to log in to your AppHooks dashboard using them.</Typography>
      <div />
    </div>
  </div>
)

ConnectedAccounts.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConnectedAccounts)

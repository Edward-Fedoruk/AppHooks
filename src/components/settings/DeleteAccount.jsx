import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import Cancel from "@material-ui/icons/Cancel"
import { compose } from "redux"
import { connect } from "react-redux"
import { changeUserPassword } from "../../actions/user"

const styles = ({ breakpoints }) => ({
  settingsWrap: {
    display: "flex",
    flexDirection: "column",

    [breakpoints.down(425)]: {
      backgroundColor: "#fff",
      padding: "5%",
    },
  },

  delete: {
    color: "#F96565",
    textDecoration: "underline",
    fontSize: "14px",
  },

  header: {
    fontSize: "18px",
    fontWeight: "900",
  },

  headerWrap: {
    display: "flex",
    alignItems: "center",

    [breakpoints.down(425)]: {
      padding: "15px 25px",
    },
  },

  delWrap: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    cursor: "pointer",

    [breakpoints.down(600)]: {
      paddingBottom: "20px",
    },
  },

  field: {
    color: "rgba(25, 43, 127, 0.7)",
    fontSize: "14px",
  },

  fieldWrap: {
    marginRight: "80px",
  },

  deleteIcon: {
    color: "#F96565",
    fontSize: "16px",
  },
})

const DeleteAccount = ({ classes, openDialog }) => (
  <div>
    <div className={classes.headerWrap}>
      <Typography className={classes.header} variant="h2" color="primary">
          Danger Zone
      </Typography>
    </div>
    <div onClick={openDialog} className={classes.settingsWrap}>
      <Typography className={classes.field} variant="body2">This is a permanent action and cant’t be undone.</Typography>
      <div className={classes.delWrap}>
        <Cancel className={classes.deleteIcon} />
        <Typography className={classes.delete} variant="h2" color="primary">
            Delete account
        </Typography>
      </div>
    </div>
  </div>
)

DeleteAccount.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles)
)(DeleteAccount)

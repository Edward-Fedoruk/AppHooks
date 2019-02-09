import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import Search from "@material-ui/icons/Search"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"
import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import Reply from "@material-ui/icons/Reply"
import { connect } from "react-redux"
import { deleteLogs } from "../../actions/requestLogs"
import ConfirmDialog from "../ConfirmDialog"

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
    minWidth: "max-content",
  },
  title: {
    flex: "0 0 auto",
  },
})

const EnhancedTableToolbar = ({
  selected, classes, deleteLogs, openDialog, toggleDialog, handleCloseWithAction,
}) => (
  <Toolbar
    className={classNames(classes.root, {
      [classes.highlight]: selected.length > 0,
    })}
  >
    <ConfirmDialog
      open={openDialog}
      handleClose={toggleDialog}
      handleCloseWithAction={() => handleCloseWithAction(selected)}
    />
    <div className={classes.title}>
      {selected.length > 0
        && (
        <Typography color="inherit" variant="subtitle1">
          {selected.length}
          {" "}
selected
        </Typography>
        )}
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      {selected.length > 0 ? (
        <Fragment>
          <Tooltip title="Export to CVS">
            <IconButton aria-label="Export to CVS">
              <Reply />
            </IconButton>
          </Tooltip>
          <Tooltip onClick={toggleDialog} title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <div>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item><Search /></Grid>
            <Grid item>
              <Input
                defaultValue="endpoint #1"
                className={classes.input}
                inputProps={{ "aria-label": "Description" }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  </Toolbar>
)


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
}

const mapDispatchToProps = dispatch => ({
  deleteLogs: ids => dispatch(deleteLogs(ids)),
})

export default connect(null, mapDispatchToProps)(withStyles(toolbarStyles)(EnhancedTableToolbar))

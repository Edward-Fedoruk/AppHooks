import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import Search from "@material-ui/icons/Search"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"
import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import PresentToAll from "@material-ui/icons/PresentToAll"

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
    minWidth: "max-content"
  },
  title: {
    flex: "0 0 auto",
  },
})

let EnhancedTableToolbar = ({ numSelected, classes }) => (
<Toolbar
  className={classNames(classes.root, {
    [classes.highlight]: numSelected > 0,
  })}
>
  <div className={classes.title}>
    {numSelected > 0 &&
      <Typography color="inherit" variant="subtitle1">
        {numSelected} selected
      </Typography>}
  </div>
  <div className={classes.spacer} />
  <div className={classes.actions}>
    {numSelected > 0 ? (
      <Tooltip title="Delete">
        {/* <PresentToAll /> */}
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <div>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item><Search /></Grid>
          <Grid item>
            <Input
              defaultValue="endpoint #1"
              className={classes.input}
              inputProps={{"aria-label": "Description"}}
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
  numSelected: PropTypes.number.isRequired,
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar)

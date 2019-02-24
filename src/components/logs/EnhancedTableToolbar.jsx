/* eslint-disable react/jsx-one-expression-per-line */
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import Search from "@material-ui/icons/Search"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"
import React, { Fragment, Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import Reply from "@material-ui/icons/Reply"
import { connect } from "react-redux"
import { deleteLogs, setSearchText } from "../../actions/requestLogs"
import ConfirmDialog from "../ConfirmDialog"

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    overflow: "hidden",
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
  search: {
    transition: ".5s transform, color",
    transform: "translateX(175px)",
    cursor: "pointer",

    "&:hover": { color: theme.palette.primary.dark },
    [theme.breakpoints.down(600)]: {
      transform: "translateX(165px)",
    },
  },
  input: {
    transition: ".5s transform",
    transform: "translateX(200px)",
  },
  translateSearch: { transform: "translateX(0)" },
  translateInput: { transform: "translateX(0)" },
})

class EnhancedTableToolbar extends Component {
  state = {
    searchActive: false,
  }

  toggleSearch = () => this.setState(({ searchActive }) => ({ searchActive: !searchActive }))

  render() {
    const {
      selected, classes, openDialog,
      toggleDialog, handleCloseWithAction,
      setSearchText,
    } = this.props
    const { searchActive } = this.state

    const searchClass = classNames(classes.search, { [classes.translateSearch]: searchActive })
    const inputClass = classNames(classes.input, { [classes.translateInput]: searchActive })

    return (
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
                <Grid onClick={this.toggleSearch} item>
                  <Search className={searchClass} />
                </Grid>
                <Grid item>
                  <Input
                    defaultValue=""
                    className={inputClass}
                    inputProps={{ "aria-label": "Description" }}
                    onChange={setSearchText}
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Toolbar>
    )
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  openDialog: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  handleCloseWithAction: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  deleteLogs: ids => dispatch(deleteLogs(ids)),
  setSearchText: e => dispatch(setSearchText(e.target.value)),
})

export default connect(null, mapDispatchToProps)(withStyles(toolbarStyles)(EnhancedTableToolbar))

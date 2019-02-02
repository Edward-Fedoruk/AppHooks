import React, { Component } from "react"
import { withStyles } from "@material-ui/core"
import { deleteLogs } from "../../actions/requestLogs"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import Menu from "@material-ui/core/Menu"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Typography from "@material-ui/core/Typography"
import ListAlt from "@material-ui/icons/ListAlt"
import MenuItem from "@material-ui/core/MenuItem"
import DeleteIcon from "@material-ui/icons/Delete"
import ConfirmDialog from "../ConfirmDialog"

const styles = () => ({
  menu: {
    width: "300px",
  },

  select: {
    marginRight: "20px"
  },

  deleteIcon: {
    fontSize: "19px",
    color: "#F96565",
  },

  delete: {
    color: "#F96565",
    alignItems: "flex-start",
    cursor: "pointer",
  },

  cancel: {color: "#A6AFD5"},
  check: {color: "#35C1CE"}
}) 


class LogMenu extends Component { 
  state = {
    openDialog: false,
    open: -1,
    anchorEl: null,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    deleteLogs: PropTypes.object.isRequired
  }

  toggleDialog = () => 
    this.setState(state => ({ openDialog: !state.openDialog }))
  

  handleCloseWithAction = () => {
    this.toggleDialog()
    this.props.deleteLogs([this.props.id])
  }

  handleMenuClick = event => {
    this.setState({ 
      open: event.currentTarget.id,
      anchorEl: event.currentTarget
    })
  }
  
  handleClose = () => {
    this.setState({ open: -1, anchorEl: null })
  }

  openDetails = () => this.props.history.push(`/logs/${this.props.id}`)
  
  render() {
    const { classes, id } = this.props
    const { openDialog, open, anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-owns="simple-menu"
          aria-haspopup="true"
          onClick={this.handleMenuClick}
          id={id}
        >
          <MoreVertIcon />
        </IconButton>

        <ConfirmDialog 
          open={openDialog}
          handleClose={this.toggleDialog}
          handleCloseWithAction={this.handleCloseWithAction}
        />

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={`${id}` === open}
          onClose={this.handleClose}
          className={classes.menu}
          elevation={1}
        >
          <MenuItem onClick={this.openDetails}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <Typography noWrap color="primary">
              Details
            </Typography>
          </MenuItem>

          <MenuItem onClick={this.toggleDialog}>
            <ListItemIcon>
              <DeleteIcon className={classes.deleteIcon} />
            </ListItemIcon>
            <Typography className={classes.delete} noWrap>
              Delete
            </Typography>
          </MenuItem>

        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteLogs: id => dispatch(deleteLogs(id)),
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(LogMenu)

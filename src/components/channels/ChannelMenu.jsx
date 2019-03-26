/* eslint-disable react/jsx-one-expression-per-line */
import React from "react"
import PropTypes from "prop-types"
import Menu from "@material-ui/core/Menu"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Typography from "@material-ui/core/Typography"
import AddCircle from "@material-ui/icons/AddCircle"
import Edit from "@material-ui/icons/Edit"
import Add from "@material-ui/icons/Add"
import { withStyles } from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { toggleCreateStageForm, toggleEditStageForm, toggleCreateEndpointForm } from "../../actions/ui"

const styles = () => ({
  menu: {
    width: "300px",
  },

  select: {
    marginRight: "20px",
  },

  deleteIcon: {
    transform: "rotate(45deg)",
    fontSize: "19px",
    color: "#F96565",
  },

  delete: {
    color: "#F96565",
    alignItems: "flex-start",
    cursor: "pointer",
  },
})


const ChannelMenu = ({
  classes, anchorEl, handleClick,
  handleClose, currentChannel,
  openDialog, toggleCreateStageForm, toggleEditStageForm,
  toggleCreateEndpointForm, showDelete,
}) => (
  <div>
    <IconButton
      aria-owns={anchorEl ? "simple-menu" : undefined}
      aria-haspopup="true"
      onClick={handleClick}
    >
      <MoreVertIcon />
    </IconButton>

    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={classes.menu}
      elevation={4}
    >

      <MenuItem onClick={toggleCreateStageForm}>
        <ListItemIcon><Add /></ListItemIcon>
        <Typography noWrap variant="inherit" color="primary">Add stage</Typography>
      </MenuItem>

      <MenuItem onClick={toggleCreateEndpointForm}>
        <ListItemIcon><Add /></ListItemIcon>
        <Typography noWrap variant="inherit" color="primary">Add endpoint</Typography>
      </MenuItem>

      <MenuItem onClick={toggleEditStageForm}>
        <ListItemIcon><Edit /></ListItemIcon>
        <Typography noWrap variant="inherit" color="primary">Edit stage name</Typography>
      </MenuItem>

      {showDelete
        && (
          <MenuItem onClick={openDialog("stageDialog")}>
            <ListItemIcon><AddCircle className={classes.deleteIcon} /></ListItemIcon>
            <Typography className={classes.delete} noWrap variant="inherit">Delete current stage</Typography>
          </MenuItem>
        )}

      <MenuItem onClick={openDialog("channelDialog")}>
        <ListItemIcon><AddCircle className={classes.deleteIcon} /></ListItemIcon>
        <Typography className={classes.delete} noWrap variant="inherit">Delete {` ${currentChannel.name} `} Channel</Typography>
      </MenuItem>

    </Menu>
  </div>
)

ChannelMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.node,
  toggleCreateStageForm: PropTypes.func.isRequired,
  toggleCreateEndpointForm: PropTypes.func.isRequired,
  toggleEditStageForm: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
  currentChannel: PropTypes.object,
  openDialog: PropTypes.func,
}

ChannelMenu.defaultProps = {
  handleClick: () => {},
  handleClose: () => {},
  openDialog: () => {},
  currentChannel: { name: "this" },
  anchorEl: null,
}

const mapDispatchToProps = dispatch => ({
  toggleCreateStageForm: () => dispatch(toggleCreateStageForm()),
  toggleEditStageForm: () => dispatch(toggleEditStageForm()),
  toggleCreateEndpointForm: () => dispatch(toggleCreateEndpointForm()),
})


export default compose(
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(ChannelMenu)

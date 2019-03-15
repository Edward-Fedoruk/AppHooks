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
import { toggleCreateStageForm } from "../../actions/ui"
import { deleteStage } from "../../actions/stage"

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
  handleClose, currentStage, currentChannel,
  deleteChannelAction, toggleCreateStageForm, deleteStage,
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
      <MenuItem onClick={handleClose}>
        <ListItemIcon><Edit /></ListItemIcon>
        <Typography noWrap variant="inherit" color="primary">Edit stage name</Typography>
      </MenuItem>

      <MenuItem onClick={toggleCreateStageForm}>
        <ListItemIcon><Add /></ListItemIcon>
        <Typography noWrap variant="inherit" color="primary">Add new stage</Typography>
      </MenuItem>

      <MenuItem onClick={() => deleteStage(currentChannel.id, currentStage.id)}>
        <ListItemIcon><AddCircle className={classes.deleteIcon} /></ListItemIcon>
        <Typography className={classes.delete} noWrap variant="inherit">Delete {` ${currentStage.name} `} stage</Typography>
      </MenuItem>

      <MenuItem onClick={deleteChannelAction}>
        <ListItemIcon><AddCircle className={classes.deleteIcon} /></ListItemIcon>
        <Typography className={classes.delete} noWrap variant="inherit">Delete {` ${currentChannel.name} `} Channel App</Typography>
      </MenuItem>

    </Menu>
  </div>
)

ChannelMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  toggleCreateStageForm: PropTypes.func.isRequired,
  deleteStage: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
  currentStage: PropTypes.object,
  currentChannel: PropTypes.string,
  deleteChannelAction: PropTypes.func,
}

ChannelMenu.defaultProps = {
  handleClick: () => {},
  handleClose: () => {},
  deleteChannelAction: () => {},
  currentStage: { name: "this" },
  currentChannel: "this",
}

const mapDispatchToProps = dispatch => ({
  toggleCreateStageForm: () => dispatch(toggleCreateStageForm()),
  deleteStage: (channelId, stageId) => dispatch(deleteStage(channelId, stageId)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(ChannelMenu)

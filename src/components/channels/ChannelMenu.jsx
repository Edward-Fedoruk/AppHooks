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
  handleClose, currentStageName, currentChannel,
  deleteChannel,
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
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <Typography
          noWrap
          variant="inherit"
          color="primary"
        >
            Edit stage name
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <Typography
          noWrap
          variant="inherit"
          color="primary"
        >
            Add new stage
        </Typography>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <AddCircle className={classes.deleteIcon} />
        </ListItemIcon>
        <Typography
          className={classes.delete}
          noWrap
          variant="inherit"
        >
            Delete
          {" "}
          {currentStageName}
          {" "}
stage
        </Typography>
      </MenuItem>

      <MenuItem onClick={deleteChannel}>
        <ListItemIcon>
          <AddCircle className={classes.deleteIcon} />
        </ListItemIcon>
        <Typography
          className={classes.delete}
          noWrap
          variant="inherit"
        >
            Delete
          {" "}
          {currentChannel}
          {" "}
Channel App
        </Typography>
      </MenuItem>

    </Menu>
  </div>
)

ChannelMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
  currentStageName: PropTypes.string,
  currentChannel: PropTypes.string,
  deleteChannel: PropTypes.func,
}

export default withStyles(styles)(ChannelMenu)

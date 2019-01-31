import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Menu from "@material-ui/core/Menu"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Typography from "@material-ui/core/Typography"
import Cancel from "@material-ui/icons/Cancel"
import CheckCircle from "@material-ui/icons/CheckCircleOutlined"
import Edit from "@material-ui/icons/Edit"
import { withStyles } from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import DeleteIcon from "@material-ui/icons/Delete"

const styles = () => ({
  menu: {
    width: "300px",
  },

  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap"
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


const ChannelMenu = ({ 
  classes, id, handleClick, 
  handleClose, open, anchorEl,
  handleEdit, selected, confirmChange
}) => {
  return (
    <div className={classes.root}>
      {selected !== `${id}` 
        ? <IconButton
            aria-owns="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            id={id}
          >
            <MoreVertIcon />
          </IconButton>
        : <Fragment> 
            <IconButton
              className={classes.cancel}
              aria-owns="simple-menu"
              aria-haspopup="true"
              onClick={handleClose}
              id={id}
            >
              <Cancel />
            </IconButton>
            <IconButton
              className={classes.check}
              aria-owns="simple-menu"
              aria-haspopup="true"
              onClick={confirmChange}
              id={id}
            >
              <CheckCircle />
            </IconButton>
          </Fragment>}
      
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={`${id}` === open}
        onClose={handleClose}
        className={classes.menu}
        elevation={1}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <Typography 
            noWrap 
            color="primary"
          >
            Edit
          </Typography>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <DeleteIcon className={classes.deleteIcon} />
          </ListItemIcon>
          <Typography 
            className={classes.delete} 
            noWrap 
          >
            Delete
          </Typography>
        </MenuItem>

      </Menu>
    </div>
  )
}

ChannelMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
}

export default withStyles(styles)(ChannelMenu)

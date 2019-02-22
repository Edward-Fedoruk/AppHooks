/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react"
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
import { connect } from "react-redux"
import { compose } from "redux"
import Fade from "@material-ui/core/Fade"
import { deleteUser } from "../../actions/subUsers"
import ConfirmDialog from "../ConfirmDialog"

const styles = ({ palette }) => ({
  menu: {
    width: "300px",
  },

  select: {
    marginRight: "20px",
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

  formControl: {
    position: "absolute",
    right: "18px",
    top: "0",
    display: "flex",
  },

  cancel: { color: "#A6AFD5" },
  check: { color: "#35C1CE" },
  vertIcon: { color: palette.primary.dark },
})


class ChannelMenu extends Component {
  state = {
    openDialog: false,
  }

  toggleDialog = () => this.setState(({ openDialog }) => ({ openDialog: !openDialog }))

  handleCloseWithAction = () => {
    console.log("s")
    const { deleteUser, id } = this.props
    deleteUser(id)
  }

  render() {
    const {
      classes, id, handleClick,
      handleClose, open, anchorEl,
      handleEdit, selected, confirmChange,
    } = this.props
    return (
      <div>
        {selected !== `${id}`
          ? (
            <Fade timeout={1000} in={selected !== `${id}`}>
              <IconButton
                aria-owns="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                id={id}
              >
                <MoreVertIcon className={classes.vertIcon} />
              </IconButton>
            </Fade>
          )
          : (
            <div className={classes.formControl}>
              <Fade timeout={1000} in={selected === `${id}`}>
                <IconButton
                  className={classes.cancel}
                  aria-owns="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClose}
                  id={id}
                >
                  <Cancel />
                </IconButton>
              </Fade>
              <Fade timeout={1500} in={selected === `${id}`}>
                <IconButton
                  className={classes.check}
                  aria-owns="simple-menu"
                  aria-haspopup="true"
                  onClick={confirmChange}
                  id={id}
                >
                  <CheckCircle />
                </IconButton>
              </Fade>
            </div>
          )}

        <ConfirmDialog
          open={this.state.openDialog}
          handleClose={this.toggleDialog}
          handleCloseWithAction={this.handleCloseWithAction}
        >
          Are you shure that you want to delete this rule
        </ConfirmDialog>

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
            <Typography noWrap color="primary">Edit</Typography>
          </MenuItem>

          <MenuItem onClick={this.toggleDialog}>
            <ListItemIcon>
              <DeleteIcon className={classes.deleteIcon} />
            </ListItemIcon>
            <Typography noWrap className={classes.delete}>Delete</Typography>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

ChannelMenu.defaultProps = {
  anchorEl: {},
}

ChannelMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  anchorEl: PropTypes.object,
  handleEdit: PropTypes.func.isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  confirmChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

const mapDispatchToProps = dispatch => ({
  deleteUser: id => dispatch(deleteUser(id)),
})

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ChannelMenu)

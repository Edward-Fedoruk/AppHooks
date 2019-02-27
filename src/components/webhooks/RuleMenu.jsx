/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react"
import PropTypes from "prop-types"
import Menu from "@material-ui/core/Menu"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Typography from "@material-ui/core/Typography"
import ListAlt from "@material-ui/icons/ListAlt"
import MenuItem from "@material-ui/core/MenuItem"
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from "@material-ui/core"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { fetchRule, deleteRule } from "../../actions/rules"
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

  cancel: { color: "#A6AFD5" },
  check: { color: "#35C1CE" },
  vertIcon: { color: palette.primary.dark },
})


class RuleMenu extends Component {
  state = {
    openDialog: false,
    open: -1,
    anchorEl: null,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    fetchRule: PropTypes.func.isRequired,
    deleteRule: PropTypes.func.isRequired,
  }

  toggleDialog = () => this.setState(state => ({ openDialog: !state.openDialog }), this.handleClose)

  handleCloseWithAction = () => {
    const { id, deleteRule } = this.props
    this.toggleDialog()
    deleteRule(id)
  }

  handleMenuClick = (event) => {
    this.setState({
      open: event.currentTarget.id,
      anchorEl: event.currentTarget,
    })
  }

  fetchRule = () => {
    const { id, fetchRule } = this.props
    fetchRule(id)
  }

  handleClose = () => {
    this.setState({ open: -1, anchorEl: null })
  }

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
          <MoreVertIcon className={classes.vertIcon} />
        </IconButton>

        <ConfirmDialog
          open={openDialog}
          handleClose={this.toggleDialog}
          handleCloseWithAction={this.handleCloseWithAction}
          titile="Delete rule"
        >
          Are you shure that you want to delete this rule
        </ConfirmDialog>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={`${id}` === open}
          onClose={this.handleClose}
          className={classes.menu}
          elevation={1}
        >
          <MenuItem onClick={this.fetchRule}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <Typography noWrap color="primary">edit</Typography>
          </MenuItem>

          <MenuItem onClick={this.toggleDialog}>
            <ListItemIcon>
              <DeleteIcon className={classes.deleteIcon} />
            </ListItemIcon>
            <Typography className={classes.delete} noWrap>Delete</Typography>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRule: id => dispatch(fetchRule(id)),
  deleteRule: id => dispatch(deleteRule(id)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(RuleMenu)

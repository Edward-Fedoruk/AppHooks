import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import AddCircleOutline from "@material-ui/icons/AddCircleOutline"
import { withStyles } from "@material-ui/core"
import Gravatar from "react-gravatar"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import { addCollaborator } from "../../actions/channel"

const styles = ({ palette }) => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
  },

  userIcon: {
    width: "27px",
    height: "auto",
    borderRadius: "50%",
    marginRight: "10px",
  },

  addIcon: {
    color: "#828CB8",
    cursor: "pointer",
    transition: "color .3s",

    "&:hover": { color: palette.primary.main },
  },
})

export class AddSubuser extends Component {
  state = {
    anchorEl: null,
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    showAddButton: PropTypes.bool.isRequired,
    addCollaborator: PropTypes.func.isRequired,
    collaborators: PropTypes.array,
    channelId: PropTypes.number.isRequired,
  }

  static defaultProps = {
    collaborators: [],
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: true })
  }

  handleClose = () => {
    this.setState({ anchorEl: null, open: false })
  }

  addCollaborator = user => () => {
    const { addCollaborator, channelId } = this.props
    addCollaborator(channelId, user)
    if (this.props.collaborators.length === 1) this.setState({ open: false })
  }

  render() {
    const { collaborators, showAddButton, classes } = this.props
    const { open, anchorEl } = this.state

    if (showAddButton) {
      return (
        <Fragment>
          <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
            {collaborators.map(user => (
              <MenuItem onClick={this.addCollaborator(user)} className={classes.menuItem} key={user.id}>
                <Gravatar className={classes.userIcon} email={user.email} default="identicon" />
                <Typography>{user.email}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <AddCircleOutline className={classes.addIcon} onClick={this.handleClick} />
        </Fragment>
      )
    }
    return null
  }
}

const mapStateToProps = ({ users, channelsEntities }, { channelId }) => {
  const addedCollaboratorsIds = channelsEntities.entities.channels[channelId].collaborators.map(user => user.id)
  const collaborators = users.users.filter(user => !addedCollaboratorsIds.includes(user.id))
  return {
    collaborators,
    showAddButton: Boolean(collaborators.length),
  }
}

const mapDispatchToProps = {
  addCollaborator,
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddSubuser)

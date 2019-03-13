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

const styles = () => ({
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
})

export class AddSubuser extends Component {
  state = {
    anchorEl: null,
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    allCollaborators: PropTypes.array,
    showAddButton: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    allCollaborators: [],
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: true })
  }

  handleClose = () => {
    this.setState({ anchorEl: null, open: false })
  }

  render() {
    const { allCollaborators, showAddButton, classes } = this.props
    const { open, anchorEl } = this.state
    if (showAddButton) {
      return (
        <Fragment>
          <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
            {allCollaborators.map(({ email, id }) => (
              <MenuItem className={classes.menuItem} key={id}>
                <Gravatar className={classes.userIcon} email={email} default="identicon" />
                <Typography>{email}</Typography>
              </MenuItem>
            ))}
          </Menu>

          <AddCircleOutline onClick={this.handleClick} />
        </Fragment>
      )
    }
    return null
  }
}

const mapStateToProps = ({ users }) => ({
  allCollaborators: users.users,
  showAddButton: Boolean(users.users.length),
})

const mapDispatchToProps = {

}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddSubuser)

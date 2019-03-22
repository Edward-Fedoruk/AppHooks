import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import Menu from "@material-ui/core/Menu"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Typography from "@material-ui/core/Typography"
import AddCircle from "@material-ui/icons/AddCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Edit from "@material-ui/icons/Edit"
import { toggleEditEndpointForm, toggleEndpointDeleteDialog } from "../../actions/ui"

const styles = () => ({
  endpointMenu: {
    marginLeft: "auto",
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

export class EndpointCardMenu extends Component {
  state = {
    anchorEl: null,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    endpointInfo: PropTypes.object.isRequired,
    toggleEndpointDeleteDialog: PropTypes.func.isRequired,
    toggleEditEndpointForm: PropTypes.func.isRequired,
  }

  handleClick = event => this.setState({ anchorEl: event.currentTarget })

  handleClose = () => this.setState({ anchorEl: null })

  render() {
    const {
      classes, toggleEndpointDeleteDialog,
      endpointInfo, toggleEditEndpointForm,
    } = this.props
    const { anchorEl } = this.state
    return (
      <div className={classes.endpointMenu}>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.endpointMenu}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.menu}
          elevation={4}
        >
          <MenuItem onClick={() => toggleEditEndpointForm(endpointInfo)}>
            <ListItemIcon><Edit /></ListItemIcon>
            <Typography noWrap variant="inherit" color="primary">Edit endpoint name</Typography>
          </MenuItem>

          <MenuItem onClick={() => toggleEndpointDeleteDialog(endpointInfo)}>
            <ListItemIcon><AddCircle className={classes.deleteIcon} /></ListItemIcon>
            <Typography className={classes.delete} noWrap variant="inherit" color="primary">Delete Endpoint</Typography>
          </MenuItem>
        </Menu>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleEndpointDeleteDialog: endpoint => dispatch(toggleEndpointDeleteDialog(endpoint)),
  toggleEditEndpointForm: endpoint => dispatch(toggleEditEndpointForm(endpoint)),
})

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(EndpointCardMenu)

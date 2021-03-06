import React from "react"
import PropTypes from "prop-types"
import Menu from "@material-ui/core/Menu"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Typography from "@material-ui/core/Typography"
import AddCircle from "@material-ui/icons/AddCircle"
import Add from "@material-ui/icons/Add"
import { withStyles } from "@material-ui/core"
import MenuItem from "@material-ui/core/MenuItem"
import { connect } from "react-redux"
import { compose } from "redux"
import { toggleCreateDestinationForm } from "../../actions/ui"

const styles = () => ({
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

const EndpointMenu = ({
  // eslint-disable-next-line react/prop-types
  openMenu, anchorEl, handleMenuClose,
  classes, toggleCreateDestinationForm, toggleDialog,
}) => (
  <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    open={openMenu}
    onClose={handleMenuClose}
    className={classes.menu}
    elevation={4}
  >

    <MenuItem onClick={toggleCreateDestinationForm}>
      <ListItemIcon><Add /></ListItemIcon>
      <Typography noWrap variant="inherit" color="primary">Add Destination</Typography>
    </MenuItem>

    <MenuItem onClick={toggleDialog("deleteEndpointDialog")}>
      <ListItemIcon><AddCircle className={classes.deleteIcon} /></ListItemIcon>
      <Typography className={classes.delete} noWrap variant="inherit">Delete Endpoint</Typography>
    </MenuItem>

  </Menu>
)

EndpointMenu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  toggleCreateDestinationForm: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  toggleCreateDestinationForm,
}

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(EndpointMenu)

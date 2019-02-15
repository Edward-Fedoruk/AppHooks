import React from "react"
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { matchPath } from "react-router-dom"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { toggleNavBar } from "../../actions/ui"

const itemTextStyles = {
  color: "rgba(255, 255, 255, 0.7)",
  paddingLeft: "5px",

}

const styles = () => ({
  itemText: itemTextStyles,

  activeTab: {
    ...itemTextStyles,
    color: "#fff",
  },

  itemIcon: {
    color: "rgba(255, 255, 255, 0.7)",
    margin: "0",
  },

  item: {
    paddingLeft: "21px",
    paddingRight: "0",
  },
})

const NavListItem = ({
  path, Icon, classes, itemText, exact, location, toggleNavBar,
}) => {
  const match = matchPath(location.pathname, { path, exact, strict: false })

  return (
    <ListItem
      className={classes.item}
      component={Link}
      to={path}
      selected={match !== null}
      onClick={toggleNavBar}
      button
    >
      <ListItemIcon
        className={classes.itemIcon}
        style={{ color: match !== null && "#fff" }}
      >
        <Icon />
      </ListItemIcon>

      <ListItemText
        classes={{ root: classes.itemText }}
        primaryTypographyProps={{
          className: match !== null
            ? classes.activeTab : classes.itemText,
        }}
        primary={itemText}
      />
    </ListItem>
  )
}

NavListItem.defaultProps = {
  exact: false,
}

NavListItem.propTypes = {
  path: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  exact: PropTypes.bool,
  itemText: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  Icon: PropTypes.node.isRequired,
  toggleNavBar: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  toggleNavBar,
}

export default compose(
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(NavListItem)

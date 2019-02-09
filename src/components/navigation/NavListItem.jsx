import React from "react"
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { matchPath } from "react-router"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core"

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
  path, currentPath, Icon, classes, itemText, exact,
}) => {
  const match = matchPath(currentPath, { path, exact, strict: false })

  return (
    <ListItem
      className={classes.item}
      component={Link}
      to={path}
      selected={match !== null}
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

NavListItem.propTypes = {
  path: PropTypes.string,
  currentPath: PropTypes.string,
  classes: PropTypes.object,
  exact: PropTypes.bool,
}

export default withStyles(styles)(NavListItem)

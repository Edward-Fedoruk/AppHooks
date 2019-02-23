import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { withRouter } from "react-router-dom"
import { withWidth } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { connect } from "react-redux"
import { compose } from "redux"
import Title from "./Title"
import { toggleNavBar } from "../../actions/ui"

const styles = ({ breakpoints }) => ({
  title: {
    flexGrow: 1,
    fontSize: "25px",

    textTransform: "capitalize",
    color: "#192B7F",
    fontWeight: "bold",
  },

  channel: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px",
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },
  },

  appBar: {
    background: "#fff",
    height: "60px",
    display: "flex",
    justifyContent: "center",
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "#192B81",

    [breakpoints.down(425)]: {
      fontSize: "16px",
      marginRight: "0",
    },
  },
})

export const TopBar = ({
  classes, title, width, toggleMenu, children,
}) => {
  const downMd = width === "sm" || width === "xs"
  return (
    <AppBar
      position="static"
      className={classes.appBar}
      elevation={0}
    >
      <Toolbar>
        {downMd
          && (
          <IconButton
            onClick={toggleMenu}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          )}

        <Title>{title}</Title>

        {children}

      </Toolbar>
    </AppBar>
  )
}

TopBar.defaultProps = {
  children: "",
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  children: PropTypes.node,
  width: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleNavBar()),
})

export default compose(
  withWidth(),
  withStyles(styles),
  withRouter,
  connect(null, mapDispatchToProps)
)(TopBar)

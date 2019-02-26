import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import { Scrollbars } from "react-custom-scrollbars"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Drawer from "@material-ui/core/Drawer"
import withWidth from "@material-ui/core/withWidth"
import NavListItem from "./NavListItem"
import { toggleNavBar } from "../../actions/ui"

const itemTextStyles = {
  color: "rgba(255, 255, 255, 0.7)",
  paddingLeft: "5px",

}

const styles = ({ transitions, breakpoints }) => ({
  navigation: {
    width: "100%",
    background: "linear-gradient(180deg, #192B81 0%, #344DBC 100%)",
    padding: "10% 0 20% 0",
    overflow: "auto",
    height: "100%",
  },

  navWrap: {
    height: "100%",
    width: "78%",
    position: "absolute",
    right: "0",
    transition: transitions.create("right", {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),

    [breakpoints.down(600)]: {
      width: "100%",
    },
  },

  appName: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "300",

    paddingBottom: "10px",
    background: "#192B81",
    paddingLeft: "21px",
    paddingTop: "12px",
  },

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

  drawer: {
    color: "rgba(255, 255, 255, 0.7)",
    maxWidth: "306px",
    minWidth: "250px",

    [breakpoints.down(960)]: {
      zIndex: "0",
    },
  },

  drawerPaper: {
    background: "#192B81",
    display: "flex",
    flexWrap: "wrap",
    width: "250px",
    overflow: "hidden",


    [breakpoints.down(600)]: {
      minWidth: "220px",
    },
  },

})

const RightPanel = ({
  classes, toggleNavBar, open, width,
}) => (
  <Drawer
    variant={width === "sm" || width === "xs" ? "temporary" : "permanent"}
    className={classes.drawer}
    open={open}
    onClose={toggleNavBar}
    classes={{ paper: classes.drawerPaper }}
    anchor="left"
  >
    <div className={classes.navWrap}>
      <Typography align="left" component="h1" className={classes.appName}>Apphooks</Typography>
      <div className={classes.navigation}>
        <Scrollbars>
          <List>
            <NavListItem path="/" Icon={<i className="icon-dashboard" />} itemText="Dashboard" exact />
            <NavListItem path="/channels" Icon={<i className="icon-channels" />} itemText="Channels" />
            <NavListItem path="/webhooks" Icon={<i className="icon-rules" />} itemText="Webhooks Rules" />
            <NavListItem path="/users" Icon={<i className="icon-sub-user" />} itemText="Sub-Users" />
            <NavListItem path="/logs" Icon={<i className="icon-logs" />} itemText="Access Logs" />
            <NavListItem path="/billing" Icon={<i className="icon-billing" />} itemText="Billing" />
          </List>
        </Scrollbars>
      </div>
    </div>
  </Drawer>
)

RightPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleNavBar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
}

const mapStateToProps = ({ view }) => ({
  open: view.open,
})

const mapDispatchToProps = {
  toggleNavBar,
}

export default compose(
  withWidth(),
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(RightPanel)

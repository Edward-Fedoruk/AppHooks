import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Dashboard from "@material-ui/icons/Dashboard"
import ExitToApp from "@material-ui/icons/ExitToApp"
import GroupAdd from "@material-ui/icons/GroupAdd"
import DateRange from "@material-ui/icons/DateRangeOutlined"
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWalletOutlined"
import NewReleases from "@material-ui/icons/NewReleasesOutlined"
import { Scrollbars } from "react-custom-scrollbars"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import NavListItem from "./NavListItem"

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
    width: "74%",
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
    paddingTop: "20px",
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

})

const RightPanel = ({ classes }) => (
  <div className={classes.navWrap}>
    <Typography align="left" component="h1" className={classes.appName}>Apphooks</Typography>
    <div className={classes.navigation}>
      <Scrollbars>
        <List className={classes.listItems}>
          <NavListItem path="/" Icon={Dashboard} itemText="Dashboard" exact />
          <NavListItem path="/channels" Icon={ExitToApp} itemText="Channels" />
          <NavListItem path="/webhooks" Icon={NewReleases} itemText="Webhooks Rules" />
          <NavListItem path="/users" Icon={GroupAdd} itemText="Sub-Users" />
          <NavListItem path="/logs" Icon={DateRange} itemText="Access Logs" />
          <NavListItem path="/billing" Icon={AccountBalanceWallet} itemText="Billing" />
        </List>
      </Scrollbars>
    </div>
  </div>
)

RightPanel.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ view }) => ({
  open: view.open,
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(RightPanel)

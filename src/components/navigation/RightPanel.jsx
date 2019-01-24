import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Dashboard from "@material-ui/icons/Dashboard"
import ExitToApp from "@material-ui/icons/ExitToApp"
import DateRange from "@material-ui/icons/DateRangeOutlined"
import NewReleases from "@material-ui/icons/NewReleasesOutlined"
import { Scrollbars } from "react-custom-scrollbars"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import NavListItem from "./NavListItem"

const itemTextStyles = {
  color: "rgba(255, 255, 255, 0.7)",
  paddingLeft: "5px",
  fontFamily: "Lato",
}

const styles = ({ transitions, breakpoints }) => ({
  navigation: {
    width: "100%",
    background: "linear-gradient(180deg, #192B81 0%, #344DBC 100%)",
    padding: "10% 0 20% 0",
    overflow: "auto",
    height: "100%"
  },

  navWrap: {
    height: "100%",
    width: "71%",
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
    fontFamily: "Lato",
    paddingBottom: "10px",
    background: "#192B81",
    paddingLeft: "21px",
    paddingTop: "20px"
  },

  itemText: itemTextStyles,

  activeTab: {
    ...itemTextStyles,
    color: "#fff"
  },

  itemIcon: {
    color: "rgba(255, 255, 255, 0.7)",
    margin: "0"
  },

  item: {
    paddingLeft: "21px",
    paddingRight: "0"
  }
  
})

export class RightPanel extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { classes, location } = this.props
    
    return (
      <div className={classes.navWrap}>
        <Typography 
          align={"left"}
          component={"h1"}
          className={classes.appName}
        >
          Apphooks 
        </Typography>  
        <div className={classes.navigation}>
        <Scrollbars >

          <List className={classes.listItems}>
            <NavListItem 
              path="/"
              currentPath={location.pathname}
              Icon={Dashboard}
              itemText="Dashboard"
              exact={true}
            />

            <NavListItem 
              path="/channels"
              currentPath={location.pathname}
              Icon={ExitToApp}
              itemText="Channels"
              exact={false}
            />

            <NavListItem 
              path="/logs"
              currentPath={location.pathname}
              Icon={DateRange}
              itemText="Access Logs"
              exact={false}
            />

            <NavListItem 
              path="/webhooks"
              currentPath={location.pathname}
              Icon={NewReleases}
              itemText="Webhooks Rules"
              exact={false}
            />
          </List>
          
        </Scrollbars>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ view }) => ({
  open: view.open, 
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(RightPanel)

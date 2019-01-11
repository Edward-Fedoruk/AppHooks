import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Dashboard from '@material-ui/icons/Dashboard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { Link, withRouter }from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { compose } from 'redux'


const itemTextStyles = {
  color: "rgba(255, 255, 255, 0.7)",
  paddingLeft: "5px",
  fontFamily: "Lato",
}

const styles = () => ({
  navigation: {
    width: "100%",
    background: "linear-gradient(180deg, #192B81 0%, #344DBC 100%)",
    padding: "10% 0 20% 0",
    overflow: "auto",
    height: "100%"
  },

  navWrap: {
    height: "100%",
    paddingTop: "20px",
    width: "71%"
  },

  appName: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "300",
    fontFamily: "Lato",
    paddingBottom: "10px",
    background: "#192B81",
    paddingLeft: "21px"
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
    const active = location.pathname

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
            <ListItem 
              className={classes.item}
              component={Link} 
              to={"/"}
              selected={active === "/"}
              button 
            >
              <ListItemIcon 
                className={classes.itemIcon}
                style={{color: active === "/" && "#fff" }}
              >
                <Dashboard />
              </ListItemIcon>

              <ListItemText 
                classes={{root: classes.itemText}}
                primaryTypographyProps={{
                  className: active === "/" 
                    ? classes.activeTab : classes.itemText 
                }} 
                primary={"Dashboard"} 
              />
            </ListItem>

            <ListItem 
              className={classes.item} 
              component={Link} 
              to={"/channels"}
              // onClick={this.changeTab("1")}
              selected={active === "/channels"}
              button
            >
              <ListItemIcon 
                className={classes.itemIcon}
                style={{color: active === "/channels" && "#fff" }}
              >
                <ExitToApp />
              </ListItemIcon>
              
              <ListItemText 
                classes={{root: classes.itemText}}
                primaryTypographyProps={{
                  className: active === "/channels" 
                    ? classes.activeTab : classes.itemText 
                }} 
                primary={"Channels Apps"} 
              />
            </ListItem>
          </List>
          
        </Scrollbars>
        </div>
      </div>
    )
  }
}


export default compose(
  withStyles(styles),
  withRouter,
)(RightPanel)

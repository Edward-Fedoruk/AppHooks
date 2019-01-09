import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Dashboard from '@material-ui/icons/Dashboard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { ReactComponent as LogoIcon} from "../assets/LogoIcon.svg"

const styles = () => ({
  drawerPaper: {
    background: "#192B81",
    display: "flex",
    flexWrap: "wrap",
    width: "306px",
    overflow: "hidden",
  },

  drawer: {
    color: "rgba(255, 255, 255, 0.7)",
    display: "flex"
  },

  paper: {
    background: "#192B81",
    width: "88px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "13px"
  },

  navigation: {
    width: "217px",
    background: "linear-gradient(180deg, #192B81 0%, #344DBC 100%)",
    padding: "10% 0 50% 0",
    overflow: "auto",
    height: "100%"
  },

  navWrap: {
    height: "100%"
  },

  appName: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "300",
    fontFamily: "Lato",
    marginTop: "20px",
    paddingBottom: "10px",
    background: "#192B81"
  },

  itemText: {
    color: "rgba(255, 255, 255, 0.7)",
    paddingLeft: "5px"
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

class AppNavigation extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >

          <div className={classes.paper}>
            <LogoIcon />
          </div>

          <div className={classes.navWrap}>
            <Typography 
              align={"left"}
              component={"h1"}
              className={classes.appName}
            >
              Apphooks
            </Typography>  
            <div className={classes.navigation}>

              <List className={classes.listItems}>
                <ListItem className={classes.item} button>
                  <ListItemIcon className={classes.itemIcon}><Dashboard /></ListItemIcon>
                  <ListItemText 
                    classes={{root: classes.itemText}}
                    primaryTypographyProps={{className: classes.itemText}} 
                    primary={"Dashboard"} 
                  />
                </ListItem>

                <ListItem className={classes.item} button>
                  <ListItemIcon className={classes.itemIcon}><ExitToApp /></ListItemIcon>
                  <ListItemText 
                    classes={{root: classes.itemText}}
                    primaryTypographyProps={{className: classes.itemText}} 
                    primary={"Channels Apps"} 
                  />
                </ListItem>
              </List>
              
            </div>
          </div>
      </Drawer>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AppNavigation))

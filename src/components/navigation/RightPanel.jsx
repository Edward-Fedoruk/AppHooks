import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Dashboard from '@material-ui/icons/Dashboard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { Link }from "react-router-dom"
import { Scrollbars } from 'react-custom-scrollbars'


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
  state = {
    activeTab: "0"
  }

  changeTab = tab => () => this.setState({activeTab: tab})

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    const { activeTab } = this.state
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
              onClick={this.changeTab("0")}
              selected={activeTab === "0"}
              button 
            >
              <ListItemIcon 
                className={classes.itemIcon}
                style={{color: activeTab === "0" && "#fff" }}
              >
                <Dashboard />
              </ListItemIcon>

              <ListItemText 
                classes={{root: classes.itemText}}
                primaryTypographyProps={{
                  className: activeTab === "0" 
                    ? classes.activeTab : classes.itemText 
                }} 
                primary={"Dashboard"} 
              />
            </ListItem>

            <ListItem 
              className={classes.item} 
              component={Link} 
              to={"/channels"}
              onClick={this.changeTab("1")}
              selected={activeTab === "1"}
              button
            >
              <ListItemIcon 
                className={classes.itemIcon}
                style={{color: activeTab === "1" && "#fff" }}
              >
                <ExitToApp />
              </ListItemIcon>
              
              <ListItemText 
                classes={{root: classes.itemText}}
                primaryTypographyProps={{
                  className: activeTab === "1" 
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RightPanel))

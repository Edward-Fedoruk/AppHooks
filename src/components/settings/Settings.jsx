import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import withNavigation from "../withNavigation"
import { withStyles } from "@material-ui/core"
import TopBar from "../TopBar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import GeneralSettings from "./GeneralSettings"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "27px 26px 20px 48px",
  },
})

export class Settings extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <TopBar title="Account Settings" />
        <div className={classes.contentWrap}>
          <GeneralSettings/>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Settings)

import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import withNavigation from "../withNavigation"
import { withStyles } from "@material-ui/core"

const styles = () => ({
  contentWrap: { padding: "25px 35px" },
})

export class AccessLogs extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.contentWrap}>
      
        sfd
      </div>  
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
)(AccessLogs)

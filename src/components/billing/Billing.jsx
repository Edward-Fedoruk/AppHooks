import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BillingTable from "./BillingTable"
import withNavigation from "../withNavigation"
import { withStyles } from "@material-ui/core"
import TopBar from "../TopBar"

const styles = ({ breakpoints }) => ({
  placeholder: {
    margin: "auto",
    marginTop: "170px"
  },

  contentWrap: {
    padding: "20px 26px 20px 13px",

    [breakpoints.down(600)]: {
      padding: "10px 0",
    },
  },
})

export class Billing extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <TopBar title="Plan & Billing" />
        <div className={classes.contentWrap}>
          <BillingTable />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withNavigation( withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Billing)))

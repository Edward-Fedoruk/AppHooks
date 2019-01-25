import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Slider from "react-slick"
import BillingTableMenu from "./BillingTableMenu"
import BillingTablePlan from "./BillingTablePlan"
import slickSettings from "./slickSettings"
import PropTypes from "prop-types"

const styles = () => ({
  tableWrap: {
    padding: "21px 0px 41px 0px",
    display: "flex",
    width: "100%",
    maxWidth: "924px",
    overflow: "hidden",
    margin: "auto"
  },
})

export class BillingTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.tableWrap}>
        <BillingTableMenu />
        <Slider {...slickSettings}>
          <BillingTablePlan 
            planName="Basic"
            price={0}
            concurrent={100}
            messages="200 000"
            support="Limited"
            monitoring={false}
            ssl
            channels
          />
          <BillingTablePlan 
            planName="Basic"
            price={0}
            concurrent={100}
            messages="200 000"
            support="Limited"
            monitoring={false}
            ssl
            channels 
          />
          <BillingTablePlan 
            planName="Basic"
            price={0}
            concurrent={100}
            messages="200 000"
            support="Limited"
            monitoring={false}
            ssl
            channels
          />
          <BillingTablePlan 
            planName="Basic"
            price={0}
            concurrent={100}
            messages="200 000"
            support="Limited"
            monitoring={false}
            ssl
            channels
          />
        </Slider>
      </Paper>
    )
  }
}

export default withStyles(styles)(BillingTable)

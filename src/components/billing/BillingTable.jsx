import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Slider from "react-slick"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import BillingTableMenu from "./BillingTableMenu"
import BillingTablePlan from "./BillingTablePlan"
import slickSettings from "./slickSettings"

const styles = () => ({
  tableWrap: {
    padding: "6px 0px 41px 0px",
    display: "flex",
    width: "100%",
    // maxWidth: "81vw",
    overflow: "hidden",
  },
})

export class BillingTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    userPackage: PropTypes.string.isRequired,
  }

  checkActive = plan => plan.toLowerCase() === this.props.userPackage.toLowerCase()

  render() {
    const { classes } = this.props
    return (
      <Paper elevation={0} className={classes.tableWrap}>
        <BillingTableMenu />
        <Slider {...slickSettings}>

          <BillingTablePlan
            planName="Sandbox"
            price={0}
            concurrent={100}
            messages="200 000"
            support="Limited"
            monitoring={false}
            ssl={false}
            channels
            active={this.checkActive("sandbox")}
          />
          <BillingTablePlan
            planName="Startup"
            price={49}
            concurrent={200}
            messages="4 000 000"
            support="Limited"
            monitoring={false}
            ssl={false}
            channels
            active={this.checkActive("Startup")}
          />
          <BillingTablePlan
            planName="Pro"
            price={100}
            concurrent={500}
            messages="200 000 000"
            support="Standard"
            monitoring
            ssl
            channels
            active={this.checkActive("pro")}
          />
          <BillingTablePlan
            planName="Business"
            price={200}
            concurrent={800}
            messages="400 000 000"
            support="Standard"
            monitoring
            ssl
            channels
            active={this.checkActive("Business")}
          />
          <BillingTablePlan
            planName="Enterpirse"
            price={300}
            concurrent={1000}
            messages="800 000 000"
            support="Standard"
            monitoring
            ssl
            channels
            active={this.checkActive("Enterpirse")}
          />
        </Slider>
      </Paper>
    )
  }
}

const mapStateToProps = ({ userSettings }) => ({
  userPackage: userSettings.settings.package,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null)
)(BillingTable)

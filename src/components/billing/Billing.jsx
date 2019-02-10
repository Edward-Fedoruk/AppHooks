import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import BillingTable from "./BillingTable"
import withNavigation from "../withNavigation"
import TopBar from "../TopBar"

const styles = ({ breakpoints }) => ({
  placeholder: {
    margin: "auto",
    marginTop: "170px",
  },

  contentWrap: {
    padding: "20px 26px 20px 13px",

    [breakpoints.down(600)]: {
      padding: "10px 0",
    },
  },
})

const Billing = ({ classes }) => (
  <Fragment>
    <TopBar title="Plan & Billing" />
    <div className={classes.contentWrap}>
      <BillingTable />
    </div>
  </Fragment>
)

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withNavigation(withStyles(styles)(Billing))

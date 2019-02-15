import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { Elements } from "react-stripe-elements"
import { connect } from "react-redux"
import { compose } from "redux"
import BillingTable from "./BillingTable"
import withNavigation from "../withNavigation"
import TopBar from "../TopBar"
import FormDrawer from "../FormDrawer"
import FormTitle from "../FormTitle"
import BillingFrom from "./BillingFrom"
import { toggleBillingForm } from "../../actions/ui"

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

const Billing = ({ classes, openBilling, toggleBillingForm }) => (
  <Fragment>
    <TopBar title="Plan & Billing" />
    <FormDrawer toggleDialog={toggleBillingForm} open={openBilling}>
      <FormTitle
        title="Quick payment"
        paragraph="For convenient and quick payment, fill in fields below."
      />
      <Elements>
        <BillingFrom />
      </Elements>
    </FormDrawer>
    <div className={classes.contentWrap}>
      <BillingTable />
    </div>
  </Fragment>
)

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
  openBilling: PropTypes.bool.isRequired,
  toggleBillingForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({ view }) => ({
  openBilling: view.billingForm,
})

const mapDispatchToProps = dispatch => ({
  toggleBillingForm: () => dispatch(toggleBillingForm(0)),
})

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Billing)

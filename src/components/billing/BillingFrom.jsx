/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { injectStripe, CardElement } from "react-stripe-elements"
import { withStyles } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import FormHelperText from "@material-ui/core/FormHelperText"
import { connect } from "react-redux"
import { compose } from "redux"
import MainButton from "../utils/MainButton"

const styles = () => ({
  field: {
    width: "100%",
    maxWidth: "1061px",
    margin: "33px auto",
    display: "flex",
  },

  btn: { margin: "20px auto", display: "flex" },

  card: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    padding: "18.5px 14px",

    "&:hover": {
      border: "1px solid rgba(0, 0, 0, 0.87)",
    },
  },

  helperText: {
    margin: "8px 12px 0",
  },
})

const createOptions = fontSize => ({
  style: {
    base: {
      fontSize,
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
})

export class BillingFrom extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
  }

  state = {
    name: "",
    email: "",
    city: "",
    errorMessage: "",
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  changeCard = ({ error }) => this.setState({ errorMessage: error ? error.message : "" })

  submit = (e) => {
    e.preventDefault()
  }

  render() {
    const {
      name, city, email, errorMessage,
    } = this.state
    const { classes, price } = this.props
    return (
      <ValidatorForm onSubmit={this.submit}>
        <TextValidator
          variant="outlined"
          label="Enter your name"
          name="name"
          placeholder="e.g., carl@cloud.ci"
          onChange={this.onChange("name")}
          value={name}
          className={classes.field}
          margin="normal"
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <TextValidator
          variant="outlined"
          label="Enter your email"
          name="email"
          placeholder="e.g., carl@cloud.ci"
          onChange={this.onChange("email")}
          value={email}
          className={classes.field}
          margin="normal"
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <TextValidator
          variant="outlined"
          label="Enter your city"
          name="city"
          placeholder="e.g., San Francisco"
          onChange={this.onChange("city")}
          value={city}
          margin="normal"
          className={classes.field}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <div>
          <CardElement
            onChange={this.changeCard}
            className={classes.card}
            {...createOptions("16px")}
          />
          <FormHelperText error className={classes.helperText}>{errorMessage}</FormHelperText>
        </div>
        <MainButton type="submit" className={classes.btn}>
          <Fragment>Pay ${price}</Fragment>
        </MainButton>
      </ValidatorForm>
    )
  }
}

const mapStateToProps = ({ view }) => ({
  price: view.billingPrice,
})

export default compose(
  injectStripe,
  withStyles(styles),
  connect(mapStateToProps),
)(BillingFrom)

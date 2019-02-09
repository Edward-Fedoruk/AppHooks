import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router"
import { paperStyles, titleStyles } from "./formStyles"
import SubmitButton from "./SubmitButton"
import { reSendEmail } from "../../actions/auth"
import ErrorSnackbar from "./ErrorSnackbar"
import withBackground from "./withBackground"

const styles = ({ breakpoints }) => ({
  paper: {
    ...paperStyles,
    paddingRigth: "70px",
    paddingLeft: "70px",
    paddingBottom: "80px",

    [breakpoints.down(500)]: {
      width: "90%",
      padding: "36px 15px",
      alignSelf: "center",
    },
  },

  title: {
    ...titleStyles,
  },

  p: {
    fontSize: "12px",
    color: "#7C7D81",
  },

  textField: {
    width: "100%",
    marginTop: "40px",
  },

})

class ForgetPassword extends React.Component {
  state = {
    email: "",
  }

  static propTypes = {
    reSendEmail: PropTypes.func.isRequired,
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  handleBlur = event => this.refs[event.target.name].validate(event.target.value)

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.props, this.props.history)
    this.props.reSendEmail(this.state, this.props.history)
  }

  render() {
    const { classes, resendError, resendErrorMessage } = this.props
    return (
      <Paper className={classes.paper}>
        <ErrorSnackbar
          variant="error"
          message={resendErrorMessage}
        />

        <Typography className={classes.title} variant="h3" align="center">
          Forgot your password?
        </Typography>
        <Typography className={classes.p} align="left">
          We’ve got you covered
        </Typography>

        <ValidatorForm onSubmit={this.onSubmit} instantValidate={false}>
          <TextValidator
            error={resendError}
            variant="outlined"
            label="Enter your email"
            name="email"
            ref="email"
            autoFocus
            placeholder="e.g., carl@cloud.ci"
            onChange={this.onChange("email")}
            onBlur={this.handleBlur}
            className={classes.textField}
            value={this.state.email}
            margin="normal"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />

          <SubmitButton
            text="Send reset instructions"
          />
        </ValidatorForm>
      </Paper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  reSendEmail: (email, routeHistory) => dispatch(reSendEmail(email, routeHistory)),
})

const mapStateToProps = ({ authentication }) => ({
  resendError: authentication.resendError,
  resendErrorMessage: authentication.resendErrorMessage,
})

export default compose(
  withBackground,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ForgetPassword)

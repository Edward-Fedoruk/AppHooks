import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import SocialAuthentication from "./SocialAuthentication"
import FormTitle from "./FormTitle"
import SubmitButton from "./SubmitButton"
import { logIn } from "../../actions/auth"
import withBackground from "./withBackground"
import ErrorSnackbar from "./ErrorSnackbar"

const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const styles = ({ breakpoints }) => ({
  paper: {
    width: "30%",
    height: "min-content",
    minWidth: "405px",
    maxWidth: "450px",
    padding: "34px 34px 27px 34px",
    marginTop: "7%",

    [breakpoints.down(500)]: {
      width: "100%",
      minWidth: "100%",
      height: "100%",
      paddingTop: "10px",
      marginTop: "20%",
    },
  },

  flexCenter,

  textField: {
    width: "100%",
    marginTop: "20px",
  },

  remindLink: {
    textAlign: "right",
    marginTop: "10px",
  },

  signLink: {
    textAlign: "center",
    marginTop: "34px",
    color: "#7C7D81",
  },
})

class LogIn extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    logInError: PropTypes.bool.isRequired,
    logInErrorMessage: PropTypes.string.isRequired,
    logIn: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    email: "",
    password: "",
  }

  email = React.createRef()

  password = React.createRef()

  onSuccess = response => console.log(response)

  onFailure = response => console.error(response)

  onSubmit = (e) => {
    e.preventDefault()
    const { logIn, history } = this.props
    logIn(this.state, history)
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  handleBlur = event => this[event.target.name].current.validate(event.target.value)

  handleFocus = event => this[event.target.name].current.makeValid()

  render() {
    const { classes, logInError, logInErrorMessage } = this.props
    return (
      <Paper elevation={0} className={classes.paper}>

        <ErrorSnackbar
          variant="error"
          message={logInErrorMessage}
        />

        <SocialAuthentication
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          text="Log in"
        />

        <FormTitle
          text="or login with email"
        />

        <ValidatorForm onSubmit={this.onSubmit} instantValidate={false}>
          <TextValidator
            error={logInError}
            variant="outlined"
            label="Enter your email"
            name="email"
            ref={this.email}
            placeholder="e.g., carl@cloud.ci"
            onChange={this.onChange("email")}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            className={classes.textField}
            value={this.state.email}
            margin="normal"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />

          <TextValidator
            variant="outlined"
            error={logInError}
            label="Your password"
            type="password"
            placeholder="e.g., *******"
            onChange={this.onChange("password")}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            className={classes.textField}
            value={this.state.password}
            margin="normal"
            name="password"
            ref={this.password}
            validators={["required", "minStringLength:6", "maxStringLength:16"]}
            errorMessages={["this field is required", "password must contain at least 6 characters", "password must contain no more then 16 characters"]}
          />

          <Typography className={classes.remindLink}>
            <Link style={{ color: "#4285F4" }} to="/password">Forgot password?</Link>
          </Typography>

          <SubmitButton text="Log in" />

          <Typography className={classes.signLink}>
            <span>Don`t have an account? </span>
            <Link style={{ color: "#4285F4" }} to="/signup">Sign Up</Link>
          </Typography>
        </ValidatorForm>
      </Paper>
    )
  }
}


const mapStateToProps = ({ authentication }) => ({
  logInError: authentication.logInError,
  logInErrorMessage: authentication.logInErrorMessage,
})

const mapDispatchToProps = dispatch => ({
  logIn: (userData, routeHistory) => dispatch(logIn(userData, routeHistory)),
})


export default compose(
  withBackground,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LogIn)

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withBackground from "./withBackground"
import SocialAuthentication from "./SocialAuthentication"
import FromTitle from "./FormTitle"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Link } from "react-router-dom"
import SubmitButton from "./SubmitButton"
import { createUser } from '../../actions/auth'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from "prop-types"
import { withRouter } from "react-router"
import { ReCaptcha } from 'react-recaptcha-v3'


const styles = ({ breakpoints }) => ({
  paper: {
    width: "30%",
    height: "min-content",
    minWidth: "405px",
    maxWidth: "450px",
    padding: "34px 34px 27px 34px",
    marginTop: "6%",
    boxShadow: "2px 4px 50px rgba(0, 0, 0, 0.25)",
    
    [breakpoints.down(500)]: {
      width: "100%",
      minWidth: "100%",
      minHeight: "90vh",
      paddingTop: "10px",
      marginTop: "20%",
    },
  },

  textField: {
    width: '100%',
    marginTop: "10px"
  },

  privacy: {
    fontSize: "11px",
    textAlign: "center",
    marginTop: "18px",
    color: "#7C7D81"
  },

  signLink: {
    textAlign: "center",
    marginTop: "20px",
    color: "#7C7D81"
  },
})

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    phone: ""
  }

  static propTypes = {
    createUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  onSubmit = e => {
    e.preventDefault() 
    this.props.createUser(this.state, this.props.history)

  }

  onSuccess = response => console.log(response)
  onFailure = response => console.error(response)

  verifyCallback = recaptchaToken => {
    console.log(recaptchaToken)
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  componentDidMount() {
    ValidatorForm.addValidationRule('isPhoneValid', phone => {
      const phoneRe = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/
      if (phoneRe.test(phone)) return true
      else return false
    })
  }

  render() {
    const { classes, errors } = this.props
    // console.log(errors)
    
    return (
      <Paper className={classes.paper}>
        <SocialAuthentication 
          text={"sign up"}
          onSuccess={this.onFailure}
          onFailure={this.onSuccess}
        />
        <FromTitle 
          text={"or sign up with email"}
        />
        <ValidatorForm onSubmit={this.onSubmit}>

          <TextValidator
            variant="outlined"
            error={"email" in errors}
            helperText={"email" in errors && <span>{errors.email[0]}</span>}    
            FormHelperTextProps={{error: true}}        
            label="Enter your email"
            name="email"
            autoFocus
            placeholder="e.g., carl@cloud.ci"
            onChange={this.onChange('email')}
            className={classes.textField}
            value={this.state.email}
            margin="normal"
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
          />

          <TextValidator
            variant="outlined"
            error={"phone" in errors}
            helperText={"phone" in errors && <span>{errors.phone[0]}</span>} 
            FormHelperTextProps={{error: true}}           
            label="+(41 20)-123-4567"
            name="phone"
            placeholder="phone number"
            onChange={this.onChange('phone')}
            className={classes.textField}
            value={this.state.phone}
            margin="normal"
            validators={['required', 'isPhoneValid']}
            errorMessages={['this field is required', 'phone is not valid']}
          /> 

          <TextValidator 
            variant="outlined"
            error={"password" in errors}
            helperText={"password" in errors && <span>{errors.password[0]}</span>} 
            FormHelperTextProps={{error: true}}     
            label="Your password"
            type="password"
            placeholder="e.g., *******"
            onChange={this.onChange('password')}
            className={classes.textField}
            value={this.state.password}
            margin="normal"
            name="password"
            validators={['required', 'minStringLength:6', 'maxStringLength:16']}
            errorMessages={['this field is required', 'password must contain at least 6 characters', 'password must contain no more then 16 characters']}
          />

          <SubmitButton 
            text={"Create an account"}
            path={"/signup"}
          />

          {/* uncoment in production */}
          {/* <ReCaptcha
            sitekey="6Ld8qYcUAAAAADWP8M3N4MD7J_hfIHLvfqoY8nIH"
            action='action_name'
            verifyCallback={this.verifyCallback}
          /> */}

          <Typography className={classes.privacy}>
            You agree to the AppHooks Terms of Servise and Privacy Policy
          </Typography>

          <Typography className={classes.signLink}>
            Already have an account?             
            <span> </span>
            <Link to="/login">
              Login
            </Link>
          </Typography>
        </ValidatorForm>
      </Paper>
    )
  }
}



const mapDispatchToProps = dispatch => ({
  createUser: (userData, routeHistory) => dispatch(createUser(userData, routeHistory))
})

const mapStateToProps = ({ authentication }) => ({
  errors: authentication.errors, 
})

export default compose(
  withBackground,
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp)
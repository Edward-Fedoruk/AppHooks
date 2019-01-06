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

const styles = ({ breakpoints }) => ({
  paper: {
    width: "30%",
    height: "min-content",
    minWidth: "405px",
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

  onSubmit = e => {
    e.prevetDefault()
  }

  onSuccess = response => console.log(response)
  onFailure = response => console.error(response)

  onChange = input => e => this.setState({ [input]: e.target.value })

  componentDidMount() {
    ValidatorForm.addValidationRule('isPhoneValid', phone => {
      const phoneRe = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/

      if (phoneRe.test(phone)) return true
      else return false
    })
  }

  render() {
    const { classes } = this.props
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
            label="+(41 20)-123-4567"
            name="phone"
            placeholder="e.g., +(41 20)..."
            onChange={this.onChange('phone')}
            className={classes.textField}
            value={this.state.phone}
            margin="normal"
            validators={['required', 'isPhoneValid']}
            errorMessages={['this field is required', 'phone is not valid']}
          />

          <TextValidator
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
          {/* @TO DO - install recaptcha with key */}

          <Typography className={classes.privacy}>
            You agree to the AppHooks Terms of Servise and Privacy Policy
          </Typography>

          <Typography className={classes.signLink}>
            Already have an account?             
            <span> </span>
            <Link to="/">
              Login
            </Link>
          </Typography>
        </ValidatorForm>
      </Paper>
    )
  }
}

export default withBackground(withStyles(styles)(SignUp))
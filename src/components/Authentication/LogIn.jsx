import React, { Component } from 'react'
import withBackground from './withBackground' 
import { withStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"
import { compose } from 'redux'
import SocialAuthentication from './SocialAuthentication'
import FormTitle from './FormTitle'
import SubmitButton from './SubmitButton'

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
    padding: "34px",
    marginTop: "6%",
    boxShadow: "2px 4px 50px rgba(0, 0, 0, 0.25)",
    
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
    width: '100%',
    marginTop: "20px"
  },

  remindLink: {
    textAlign: "right",
    marginTop: "10px"
  },

  signLink: {
    textAlign: "center",
    marginTop: "34px"
  },
})

class LogIn extends Component {
  state = {
    email: "",
    password: ""
  }

  onSuccess = response => console.log(response)
  onFailure = response => console.error(response)

  onSubmit = e => {
    e.prevetDefault()
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <SocialAuthentication 
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
        
        <FormTitle 
          text={"or login with email"}
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

          <Typography className={classes.remindLink}>
            <Link to="/">
              Forgot password?
            </Link>
          </Typography>

          <SubmitButton 
            text={"Log in"}
            path={"/"}
          />

          <Typography className={classes.signLink}>
            Don't have an account? 
            <span> </span>
            <Link to="/signUp">
              Sign Up
            </Link>
          </Typography>
        </ValidatorForm>
      </Paper>
    )
  }
}

export default compose(
  withBackground,
  withStyles(styles)
)(LogIn)
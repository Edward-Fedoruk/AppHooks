import React, { Component } from 'react'
import withBackground from './withBackground'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { paperStyles, titleStyles } from './formStyles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'


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
    }
  },

  title: {
    ...titleStyles
  },

  textField: {
    width: "100%"
  },

  p: {
    fontSize: "12px",
    color: "#7C7D81"
  }

})

class ResetPassword extends Component {
  state = {
    currentPassword: "",
    newPassword: ""
  }

  
  onSubmit = e => {
    e.prevetDefault()
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h3" align="center">
          Create a new password
        </Typography>

        <Typography className={classes.p} align="left">
          We’ve got you covered
        </Typography>

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="New Password"
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

          <TextValidator
            label="Confirm Password"
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
            text={"Change Password"}
            path={"/password"}
          />
        </ValidatorForm>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}


export default withBackground(withStyles(styles)(connect()(ResetPassword)))
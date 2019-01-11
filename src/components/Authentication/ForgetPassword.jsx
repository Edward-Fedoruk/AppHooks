import React from 'react'
import PropTypes from 'prop-types'
import withBackground from './withBackground'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { paperStyles, titleStyles } from './formStyles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import SubmitButton from './SubmitButton'
import { connect } from 'react-redux'
import { reSendEmail } from '../../actions/auth'

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

  p: {
    fontSize: "12px",
    color: "#7C7D81"
  },

  textField: {
    width: "100%",
    marginTop: "40px"
  }

})

class ForgetPassword extends React.Component {
  state = {
    email: ""
  }

  static propTypes = {
    reSendEmail: PropTypes.func.isRequired
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    this.props.reSendEmail(this.state.email)
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h3" align="center">
          Forgot your password?
        </Typography>
        <Typography className={classes.p} align="left">
          We’ve got you covered
        </Typography>

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

          <SubmitButton
            text={"Send reset instructions"}
            path={"/password"}
          />
        </ValidatorForm>
      </Paper>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  reSendEmail: email => dispatch(reSendEmail(email))
})


export default withBackground(withStyles(styles)(connect(null, mapDispatchToProps)(ForgetPassword)))
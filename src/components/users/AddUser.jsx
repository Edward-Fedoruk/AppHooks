import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { inviteUser } from "../../actions/subUsers"
import ErrorSnackbar from "../Authentication/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"

const styles = ({ breakpoints }) => ({
  form: {
    display: "flex",
    alignItems: "stretch",
    margin: "22px auto 10px 10px",

    [breakpoints.down(375)]: {
      margin: "22px 0 0 0",
    },

  },

  add: {
    marginLeft: "16px",
    width: "120px",
    height: "56px",
  },
})

export class AddUser extends Component {
  state = {
    email: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    inviteUser: PropTypes.func.isRequired,
    inviteError: PropTypes.string.isRequired,
  }

  email = React.createRef()

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.inviteUser(this.state)
    this.setState({ email: "" })
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, inviteError } = this.props
    return (
      <div>
        <ErrorSnackbar
          message={inviteError}
        />
        <ValidatorForm onSubmit={this.onSubmit} className={classes.form}>
          <TextValidator
            variant="outlined"
            label="Add new sub-user"
            name="email"
            ref={this.email}
            margin="none"
            placeholder="e.g., carl@cloud.ci"
            onChange={this.onChange("email")}
            className={classes.textField}
            value={this.state.email}
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
          <Button type="submit" className={classes.add} variant="outlined" color="primary" size="large">Add</Button>
        </ValidatorForm>
      </div>
    )
  }
}

const errorSelector = createErrorMessageSelector(["INVITE_ERROR"])

const mapStateToProps = ({ errorHandler }) => ({
  inviteError: errorSelector(errorHandler),
})

const mapDispatchToProps = dispatch => ({
  inviteUser: email => dispatch(inviteUser(email)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddUser)

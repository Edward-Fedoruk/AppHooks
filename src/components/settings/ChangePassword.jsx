import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import { connect } from "react-redux"
import PopUpButtons from "./PopUpButtons"
import FormTitle from "./FormTitle"
import { changeUserPassword } from "../../actions/user"

const styles = ({ palette, breakpoints }) => ({
  settingsWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",

    [breakpoints.down(425)]: {
      backgroundColor: "#fff",
      padding: "20px 0 20px 20px",
      flexDirection: "column",
    },
  },

  field: {
    fontSize: "14px",
  },

  fieldWrap: {
    marginRight: "80px",

    [breakpoints.down(600)]: {
      marginTop: "20px",
    },
  },

  contentWrap: {
    marginBottom: "20px",
    transition: ".25s margin linear",
    position: "relative",
  },
  underline: { "&::before, &::after": { display: "none" } },
  disabled: { color: palette.primary.main },
})

class ChangePassword extends Component {
  state = {
    show: false,
    currentPassword: "******",
    newPassword: "******",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  toggleForm = () => this.setState(
    ({ show }) => ({
      show: !show,
      currentPassword: "******",
      newPassword: "******",
    }),
    () => {
      this.refs.newPassword.validate("******")
      this.refs.currentPassword.validate("******")
    }
  )


  onSubmit = (e) => {
    e.preventDefault()
    this.props.changeUserPassword({
      current_password: this.state.currentPassword,
      password: this.state.newPassword,
    })
    this.toggleForm()
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  handleBlur = event => this.refs[event.target.name].validate(event.target.value)

  render() {
    const { classes } = this.props
    const { show } = this.state
    const showInput = !show ? {
      classes: {
        underline: classes.underline,
        disabled: classes.disabled,
      },
    } : {}
    return (
      <div style={{ marginBottom: show && "70px" }} className={classes.contentWrap}>
        <FormTitle toggleForm={this.toggleForm}>Change password</FormTitle>
        <ValidatorForm onSubmit={this.onSubmit} instantValidate={false}>
          <div className={classes.settingsWrap}>
            <div className={classes.fieldWrap}>
              <TextValidator
                label="Password"
                name="currentPassword"
                ref="currentPassword"
                placeholder="e.g., secret"
                disabled={!show}
                onBlur={this.handleBlur}
                onChange={this.onChange("currentPassword")}
                value={this.state.currentPassword}
                InputProps={showInput}
                validators={["required", "minStringLength:6", "maxStringLength:16"]}
                errorMessages={["this field is required", "password must contain at least 6 characters", "password must contain no more then 16 characters"]}
              />
            </div>

            <div className={classes.fieldWrap}>
              <TextValidator
                label="New Password"
                name="newPassword"
                ref="newPassword"
                placeholder="e.g., newSecret"
                disabled={!show}
                InputProps={showInput}
                value={this.state.newPassword}
                onChange={this.onChange("newPassword")}
                validators={["required", "minStringLength:6", "maxStringLength:16"]}
                errorMessages={["this field is required", "password must contain at least 6 characters", "password must contain no more then 16 characters"]}
              />
            </div>
          </div>
          <PopUpButtons
            show={show}
            toggleForm={this.toggleForm}
          />
        </ValidatorForm>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeUserPassword: data => dispatch(changeUserPassword(data)),
})

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(ChangePassword)

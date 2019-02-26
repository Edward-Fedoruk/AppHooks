import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { inviteUser } from "../../actions/subUsers"

const styles = ({ breakpoints }) => ({
  form: {
    display: "flex",
    alignItems: "flex-end",
    margin: "22px auto 10px 10px",

    [breakpoints.down(375)]: {
      margin: "22px 0 0 0",
    },

  },

  add: {
    marginLeft: "16px",
    width: "170px",
    height: "16px",
    textTransform: "capitalize",
  },
})

export class AddUser extends Component {
  state = {
    email: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    inviteUser: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: "",
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
    const { classes, className } = this.props
    return (
      <div className={className}>
        <ValidatorForm onSubmit={this.onSubmit} className={classes.form}>
          <TextValidator
            label="Email address"
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
          <Button type="submit" className={classes.add} variant="outlined" color="primary" size="small">Add new Sub-User</Button>
        </ValidatorForm>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  inviteUser: email => dispatch(inviteUser(email)),
})

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(AddUser)

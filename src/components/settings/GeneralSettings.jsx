/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { connect } from "react-redux"
import { compose } from "redux"
import { changeUserSettings } from "../../actions/user"
import PopUpButtons from "./PopUpButtons"
import FormTitle from "./FormTitle"

const styles = ({ palette, breakpoints }) => ({
  settingsWrap: {
    display: "flex",
    flexWrap: "wrap",

    [breakpoints.down(425)]: {
      backgroundColor: "#fff",
      display: "block",
      padding: "20px 0 20px 20px",
    },
  },

  field: { fontSize: "14px" },

  fieldWrap: {
    marginRight: "80px",

    [breakpoints.down(600)]: {
      marginTop: "20px",
    },
  },

  underline: { "&::before, &::after": { display: "none" } },
  disabled: { color: palette.primary.main },
  contentWrap: {
    marginBottom: "20px",
    transition: ".25s margin linear",
    position: "relative",
  },
})

class GeneralSettings extends Component {
  state = {
    show: false,
    name: "-",
    company: "-",
    phone: "-",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    changeUserSettings: PropTypes.isRequired,
    name: PropTypes.string,
    company: PropTypes.string,
    phone: PropTypes.string,
  }

  static defaultProps = {
    name: "",
    company: "",
    phone: "",
  }


  componentDidMount() {
    this.setState(this.setToProps())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name
      || prevProps.company !== this.props.company
      || prevProps.phone !== this.props.phone) { this.setState(this.setToProps()) }
  }

  toggleForm = () => this.setState(({ show }) => ({
    show: !show,
    ...this.setToProps(),
  }))


  onSubmit = (e) => {
    e.preventDefault()
    const { name, company, phone } = this.state
    this.props.changeUserSettings({
      name, company, phone,
    })
    this.setState(({ show }) => ({ show: !show }))
  }

  setToProps = () => ({
    name: this.props.name === null ? "-" : this.props.name,
    phone: this.props.phone === null ? "-" : this.props.phone,
    company: this.props.company === null ? "-" : this.props.company,
  })

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
        <FormTitle toggleForm={this.toggleForm}>General settings</FormTitle>
        <ValidatorForm onSubmit={this.onSubmit} instantValidate={false}>
          <div className={classes.settingsWrap}>
            <div className={classes.fieldWrap}>
              <TextValidator
                label="Name"
                name="name"
                ref="name"
                placeholder="e.g., carl@cloud.ci"
                disabled={!show}
                onBlur={this.handleBlur}
                onChange={this.onChange("name")}
                value={this.state.name}
                InputProps={showInput}
              />
            </div>

            <div className={classes.fieldWrap}>
              <TextValidator
                label="Company"
                name="company"
                ref="company"
                placeholder="e.g., carl@cloud.ci"
                disabled={!show}
                InputProps={showInput}
                value={this.state.company}
                onChange={this.onChange("company")}
              />
            </div>

            <div className={classes.fieldWrap}>
              <TextValidator
                label="Phone number"
                name="phone"
                ref="phone"
                placeholder="e.g., carl@cloud.ci"
                disabled={!show}
                InputProps={showInput}
                value={this.state.phone}
                onChange={this.onChange("phone")}
                validators={["required"]}
                errorMessages={["this field is required"]}
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
  changeUserSettings: data => dispatch(changeUserSettings(data)),
})

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(GeneralSettings)

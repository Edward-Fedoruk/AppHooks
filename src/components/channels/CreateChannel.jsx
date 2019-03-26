import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import SelectInput from "../utils/SelectInput"
import FormTitle from "../utils/FormTitle"
import { createChannel } from "../../actions/channel"
import MainButton from "../utils/MainButton"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"

const styles = () => ({
  formWrap: {
    width: "60%",
    margin: "auto",
    marginTop: "50px",
  },

  textField: {
    width: "100%",
    marginTop: "70px",
  },

  submitButton: {
    margin: "25px auto",
    display: "flex",
  },

  title: {
    fontWeight: "500",
    fontSize: "25px",
    color: "#5A5B5F",
    marginBottom: "25px",
  },

  p: {
    fontSize: "16px",
    color: "#7C7D81",
  },

})

export class CreateChannel extends Component {
  state = {
    name: "",
    region: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    createChannel: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    errorMessage: "Something went wrong",
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { region, name } = this.state
    const { history, createChannel } = this.props

    createChannel({ name, region }, history)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, errorMessage } = this.props
    const { name, region } = this.state
    const options = [
      "us-east-1",
      "us-west-1",
      "ap-northeast-1",
      "eu-central-1",
      "sa-east-1",
    ]
    return (
      <Fragment>
        <ErrorSnackbar message={errorMessage} />
        <FormTitle
          paragraph="Create a Channels app to generate your unique credentials. You can create as manyapps as you need."
          title="Create Channel"
        />

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="Name your app (required)"
            name="name"
            autoFocus
            variant="outlined"
            placeholder="MyApp"
            onChange={this.onChange("name")}
            className={classes.textField}
            value={name}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <SelectInput
            name="region"
            option={region}
            options={options}
            handleChange={this.handleChange}
            styles={{ width: "100%", marginTop: "35px" }}
          />

          <MainButton className={classes.submitButton} type="submit">Create Application</MainButton>

        </ValidatorForm>
      </Fragment>
    )
  }
}

const errorSelector = createErrorMessageSelector(["CREATE_CHANNEL"])

const mapStateToProps = ({ errorHandler }) => ({
  errorMessage: errorSelector(errorHandler),
})

const mapDispatchToProps = dispatch => ({
  createChannel: (channelData, routeHistory) => dispatch(createChannel(channelData, routeHistory)),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreateChannel)

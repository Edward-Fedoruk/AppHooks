/* eslint-disable camelcase */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import classNames from "classnames"
import Grow from "@material-ui/core/Grow"
import { withRouter } from "react-router-dom"
import SelectInput from "../utils/SelectInput"
import FormTitle from "../utils/FormTitle"
import { toggleCreateDestinationForm } from "../../actions/ui"
import { createDestination } from "../../actions/destination"
import MainButton from "../utils/MainButton"
import FormDrawer from "../FormDrawer"

const styles = () => ({
  formWrap: {
    width: "60%",
    margin: "auto",
    marginTop: "50px",
  },

  textField: {
    width: "100%",
    marginTop: "35px",
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

  selectAuth: {
    marginBottom: "0px",
    transition: "margin .3s",
  },

  select: { width: "100%", marginTop: "35px" },

  makeOffset: {
    marginBottom: "50px",
  },

  fieldsContainer: {
    position: "relative",
    height: "0px",
    visibility: "hidden",
    transition: "height .5s",
  },

  subFields: {
    position: "absolute",
    left: "55%",
    transform: "translateX(-50%)",
    width: "90%",
  },
  showTokenFields: { height: `${95 * 3}px`, visibility: "visible" },
  showBasicFields: { height: `${95 * 2}px`, visibility: "visible" },
  showLinearFields: { height: `${95 * 2}px`, visibility: "visible" },
})

export class CreateDestination extends Component {
  state = {
    name: "",
    url: "",
    retryPolicy: "No auto retries",
    retryInterval: "",
    retryAttempts: "",
    authType: "No Authentication",
    contentType: "text/plain; charset=utf-8;",
    tokenLocation: "Header",
    tokenVar: "",
    tokenValue: "",
    username: "",
    password: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createDestinationForm: PropTypes.bool.isRequired,
    toggleCreateDestinationForm: PropTypes.func.isRequired,
    createDestination: PropTypes.func.isRequired,
  }

  authTypes = ["No Authentication", "Basic Authentication", "Token"]

  retryPolicies = ["No auto retries", "Linear", "Exponential Backoff"]

  tokenLocations = ["Header", "Form Field", "Body", "Query String"]

  onSubmit = (e) => {
    e.preventDefault()
    // Map names from local state to request fields
    const {
      name,
      url,
      authType: auth_type,
      contentType: response_content_type,
      tokenLocation: token_location,
      tokenVar: token_variable,
      tokenValue: token_value,
      username,
      password,
    } = this.state
    const { createDestination, match } = this.props

    let auth_settings = {}

    if (auth_type === this.authTypes[1]) {
      auth_settings = { username, password }
    } else if (auth_type === this.authTypes[2]) {
      const location = this.tokenLocations.indexOf(token_location) + 1
      auth_settings = { token_location: location, token_variable, token_value }
    } else auth_settings = null

    const destinationData = {
      response_content_type,
      auth_settings,
      auth_type,
      name,
      url,
    }

    createDestination(match.params.endpointId, destinationData)
  }

  handleChange = field => (event) => {
    this.setState({ [field]: event.target.value })
  }

  render() {
    const { classes, createDestinationForm, toggleCreateDestinationForm } = this.props
    const {
      name, authType, contentType, url, retryPolicy,
      tokenLocation, username, password, tokenVar, tokenValue,
      retryAttempts, retryInterval,
    } = this.state

    const showTokenFields = authType === this.authTypes[2]
    const showBasicFields = authType === this.authTypes[1]
    const showLinearFields = retryPolicy === this.retryPolicies[1]

    const tokenFields = classNames(classes.fieldsContainer, {
      [classes.showTokenFields]: showTokenFields,
    })
    const basicFields = classNames(classes.fieldsContainer, {
      [classes.showBasicFields]: showBasicFields,
    })
    const linearFields = classNames(classes.fieldsContainer, {
      [classes.showLinearFields]: showLinearFields,
    })

    return (
      <FormDrawer open={createDestinationForm} toggleDialog={toggleCreateDestinationForm}>
        <FormTitle
          paragraph="Full out the details to setup a new destination for the input specified."
          title="Create Destination"
        />

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="destination name"
            name="name"
            autoFocus
            variant="outlined"
            placeholder="#001 destination"
            onChange={this.handleChange("name")}
            className={classes.textField}
            value={name}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <TextValidator
            label="destination url"
            name="url"
            variant="outlined"
            placeholder="http://apphookss"
            onChange={this.handleChange("url")}
            className={classes.textField}
            value={url}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <SelectInput
            name="authType"
            option={authType}
            options={this.authTypes}
            handleChange={this.handleChange("authType")}
            className={classNames(classes.selectAuth, classes.select)}
          />

          <div className={basicFields}>
            <div className={classes.subFields}>
              <Grow
                in={showBasicFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showBasicFields ? { timeout: 500 } : {})}
              >
                <TextValidator
                  label="Username"
                  name="username"
                  variant="outlined"
                  placeholder="#001 Endpoint"
                  onChange={this.handleChange("username")}
                  className={classes.textField}
                  value={username}
                  margin="normal"
                />
              </Grow>

              <Grow
                in={showBasicFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showBasicFields ? { timeout: 1000 } : {})}
              >
                <TextValidator
                  label="Password"
                  name="password"
                  variant="outlined"
                  placeholder="MyApp"
                  onChange={this.handleChange("password")}
                  className={classes.textField}
                  value={password}
                  margin="normal"
                />
              </Grow>
            </div>
          </div>

          <div className={tokenFields}>
            <div className={classes.subFields}>
              <Grow
                in={showTokenFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showTokenFields ? { timeout: 500 } : {})}
              >
                <div style={{ width: "100%" }}>
                  <SelectInput
                    name="tokenLocation"
                    option={tokenLocation}
                    options={this.tokenLocations}
                    handleChange={this.handleChange("tokenLocation")}
                    className={classes.select}
                  />
                </div>
              </Grow>

              <Grow
                in={showTokenFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showTokenFields ? { timeout: 1000 } : {})}
              >
                <TextValidator
                  label="Token Variable"
                  name="tokenVar"
                  variant="outlined"
                  placeholder="your token var"
                  onChange={this.handleChange("tokenVar")}
                  className={classes.textField}
                  value={tokenVar}
                  margin="normal"
                />
              </Grow>

              <Grow
                in={showTokenFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showTokenFields ? { timeout: 1500 } : {})}
              >
                <TextValidator
                  label="Token Value"
                  name="tokenValue"
                  variant="outlined"
                  placeholder="ASDFAS12#32"
                  onChange={this.handleChange("tokenValue")}
                  className={classes.textField}
                  value={tokenValue}
                  margin="normal"
                />
              </Grow>
            </div>
          </div>

          <SelectInput
            name="RetryPolicy"
            option={retryPolicy}
            options={this.retryPolicies}
            handleChange={this.handleChange("retryPolicy")}
            className={classNames(classes.selectAuth, classes.select)}
          />

          <div className={linearFields}>
            <div className={classes.subFields}>
              <Grow
                in={showLinearFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showLinearFields ? { timeout: 500 } : {})}
              >
                <TextValidator
                  label="Retry Attempts"
                  name="Retry Attempts"
                  variant="outlined"
                  placeholder="#001 Endpoint"
                  onChange={this.handleChange("retryAttempts")}
                  className={classes.textField}
                  value={retryAttempts}
                  margin="normal"
                />
              </Grow>

              <Grow
                in={showLinearFields}
                style={{ transformOrigin: "0 0 0" }}
                {...(showLinearFields ? { timeout: 1000 } : {})}
              >
                <TextValidator
                  label="Password"
                  name="Retry Interval"
                  variant="outlined"
                  placeholder="MyApp"
                  onChange={this.handleChange("retryInterval")}
                  className={classes.textField}
                  value={retryInterval}
                  margin="normal"
                />
              </Grow>
            </div>
          </div>

          <TextValidator
            label="Response Content Type"
            name="contentType"
            variant="outlined"
            placeholder="charset=utf-8;"
            onChange={this.handleChange("contentType")}
            className={classes.textField}
            value={contentType}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <MainButton className={classes.submitButton} type="submit">Create Destination</MainButton>

        </ValidatorForm>
      </FormDrawer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createDestination: (endpointId, formData) => dispatch(createDestination(endpointId, formData)),
  toggleCreateDestinationForm: () => dispatch(toggleCreateDestinationForm()),
})

const mapStateToProps = ({ view }) => ({
  createDestinationForm: view.createDestinationForm,
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreateDestination)

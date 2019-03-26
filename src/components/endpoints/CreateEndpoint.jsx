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
import { toggleCreateEndpointForm } from "../../actions/ui"
import { createEndpoint } from "../../actions/endpoint"
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
    visability: "hidden",
    transition: "height .5s",
  },

  tokenFields: {
    position: "absolute",
    left: "55%",
    transform: "translateX(-50%)",
    width: "90%",
  },
  showTokenFields: { height: "280px" },
  showBasicFields: { height: "190px" },
})

export class CreateEndpoint extends Component {
  state = {
    name: "",
    authType: "No Authentication",
    code: "",
    contentType: "text/plain; charset=utf-8;",
    responseContent: "Message Received",
    tokenLocation: "Header",
    tokenVar: "",
    tokenValue: "",
    username: "",
    password: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createEndpointForm: PropTypes.bool.isRequired,
    toggleCreateEndpointForm: PropTypes.func.isRequired,
    createEndpoint: PropTypes.func.isRequired,
  }

  authTypes = ["No Authentication", "Basic Authentication", "Token"]

  codes = ["200", "404", "500"]

  tokenLocations = ["Header", "Form Field", "Body", "Query String"]

  onSubmit = (e) => {
    e.preventDefault()
    // Map names from local state to request fields
    const {
      name, authType: auth_type,
      code: response_code,
      contentType: response_content_type,
      responseContent: response_message,
      tokenLocation: token_location,
      tokenVar: token_variable,
      tokenValue: token_value,
      username,
      password,
    } = this.state
    const { createEndpoint, match } = this.props

    let auth_settings = {}

    if (auth_type === this.authTypes[1]) {
      auth_settings = { username, password }
    } else if (auth_type === this.authTypes[2]) {
      const location = this.tokenLocations.indexOf(token_location) + 1
      auth_settings = { token_location: location, token_variable, token_value }
    } else auth_settings = null

    const endpointData = {
      response_content_type,
      response_message,
      response_code,
      auth_settings,
      auth_type,
      name,
    }

    createEndpoint(match.params.channelId, match.params.stageId, endpointData)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, createEndpointForm, toggleCreateEndpointForm } = this.props
    const {
      name, authType, code, contentType, responseContent,
      tokenLocation, username, password, tokenVar, tokenValue,
    } = this.state

    const showTokenFields = authType === this.authTypes[2]
    const showBasicFields = authType === this.authTypes[1]

    const tokenFields = classNames(classes.fieldsContainer, {
      [classes.showTokenFields]: showTokenFields,
    })
    const basicFields = classNames(classes.fieldsContainer, {
      [classes.showBasicFields]: showBasicFields,
    })

    return (
      <FormDrawer open={createEndpointForm} toggleDialog={toggleCreateEndpointForm}>
        <FormTitle
          paragraph="Use the below to create a new input destination for you webhooks. Once completed, you will be given an endpoint URL for your webhook provider."
          title="Create Endpoint"
        />

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="Endpoint name"
            name="name"
            autoFocus
            variant="outlined"
            placeholder="#001 Endpoint"
            onChange={this.onChange("name")}
            className={classes.textField}
            value={name}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <SelectInput
            name="authType"
            option={authType}
            options={this.authTypes}
            handleChange={this.handleChange}
            className={classNames(classes.selectAuth, classes.select)}
          />

          <div className={basicFields}>
            <div className={classes.tokenFields}>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  className={classes.textField}
                  value={password}
                  margin="normal"
                />
              </Grow>
            </div>
          </div>

          <div className={tokenFields}>
            <div className={classes.tokenFields}>
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
                    handleChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  className={classes.textField}
                  value={tokenValue}
                  margin="normal"
                />
              </Grow>
            </div>
          </div>

          <SelectInput
            name="code"
            option={code}
            options={this.codes}
            handleChange={this.handleChange}
            className={classes.select}
          />

          <TextValidator
            label="Response Content Type"
            name="contentType"
            variant="outlined"
            placeholder="charset=utf-8;"
            onChange={this.handleChange}
            className={classes.textField}
            value={contentType}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <TextValidator
            label="Response Content"
            name="responseContent"
            variant="outlined"
            placeholder="action was successful"
            onChange={this.handleChange}
            className={classes.textField}
            value={responseContent}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
            rows={3}
            multiline
          />

          <MainButton className={classes.submitButton} type="submit">Create Endpoint</MainButton>

        </ValidatorForm>
      </FormDrawer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createEndpoint: (channelId, stageId, formData) => dispatch(createEndpoint(channelId, stageId, formData)),
  toggleCreateEndpointForm: () => dispatch(toggleCreateEndpointForm()),
})

const mapStateToProps = ({ view }) => ({
  createEndpointForm: view.createEndpointForm,
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreateEndpoint)

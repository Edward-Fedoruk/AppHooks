import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { compose } from 'redux'
import SubmitButton from '../Authentication/SubmitButton'
import SelectInput from "./SelectInput"
import { CountryRegionData } from "react-country-region-selector"
import FormTitle from '../FormTitle'
import { createChannel } from '../../actions/channel'
import { withRouter } from 'react-router'
import TopBar from '../TopBar'

const styles = () => ({
  formWrap: {
    width: "60%",
    margin: "auto",
    marginTop: "50px",
  },

  textField: {
    width: "100%",
    marginTop: "70px"
  },

  title: {
    fontWeight: "500",
    fontSize: "25px",
    color: "#5A5B5F",
    marginBottom: "25px"
  },

  p: {
    fontSize: "16px",
    color: "#7C7D81"
  }
  
})

export class CreateChannel extends Component {
  state = {
    name: "", 
    region: ""
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired
  }

  onSubmit = e => {
    e.preventDefault()
    if(!this.state.region) this.setState({ error: true })
    console.log({name: this.state.name, region: this.state.region[0]})

    this.props.createChannel({name: this.state.name, region: this.state.region[0]}, this.props.history)
  }
  
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, errorMessage, error } = this.props
    const { name, region } = this.state
    return (
      <Fragment>
        <TopBar 
          buttonText="Create New App"
          title="Your Channels Apps"
        />
        <div className={classes.formWrap} >
          <FormTitle 
            paragraph={"Create a Channels app to generate your unique credentials. You can create as many apps as you need."}
            title={"Create your Channels App"}
          />
          
          <ValidatorForm onSubmit={this.onSubmit}>
            <TextValidator
              error={error}
              label="Name your app (required)"
              name="name"
              autoFocus
              variant="outlined"
              placeholder="MyApp"
              onChange={this.onChange('name')}
              className={classes.textField}
              value={name}
              margin="normal"
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <SelectInput 
              options={CountryRegionData}
              name="region"
              option={region}
              handleChange={this.handleChange}
              styles={{width: "100%", marginTop: "35px"}}
              error={this.state.error || error}
              errText={error ? "" : "required field"}
            />

            <SubmitButton 
              text={"Create Application"}
              styles={{width: "250px", display: "block", margin: "84px auto 20px auto"}}
            />
          </ValidatorForm>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ channels }) => ({
  error: channels.error,
  errorMessage: channels.errorMessage
})

const mapDispatchToProps = dispatch => ({
  createChannel: (channelData, routeHistory) => 
    dispatch(createChannel(channelData, routeHistory))
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreateChannel)

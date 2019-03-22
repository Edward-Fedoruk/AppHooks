import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import FormTitle from "../utils/FormTitle"
import { editEndpointName } from "../../actions/endpoint"
import MainButton from "../utils/MainButton"
import FormDrawer from "../FormDrawer"
import { toggleEditEndpointForm } from "../../actions/ui"

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

export class EditEndpoint extends Component {
  state = {
    name: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    editEndpointName: PropTypes.func.isRequired,
    toggleEditEndpointForm: PropTypes.func.isRequired,
    editEndpointForm: PropTypes.bool.isRequired,
    currentEndpoint: PropTypes.object,
  }

  static defaultProps = {
    currentEndpoint: {},
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      editEndpointName,
      toggleEditEndpointForm,
      currentEndpoint: {
        id: endpointId,
        application_id: channelId,
        application_stage_id: stageId,
      },
    } = this.props

    editEndpointName(channelId, stageId, endpointId, this.state)
    toggleEditEndpointForm()
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, editEndpointForm, toggleEditEndpointForm } = this.props
    const { name } = this.state
    return (
      <FormDrawer open={editEndpointForm} toggleDialog={toggleEditEndpointForm}>
        <FormTitle title="Edit Endpoint" />

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="Endpoint name"
            name="name"
            autoFocus
            variant="outlined"
            placeholder="MyNewEndpoint"
            onChange={this.onChange("name")}
            className={classes.textField}
            value={name}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <MainButton className={classes.submitButton} type="submit">Confirm</MainButton>

        </ValidatorForm>
      </FormDrawer>
    )
  }
}

const mapStateToProps = ({ view }) => ({
  currentEndpoint: view.endpointInfo,
  editEndpointForm: view.editEndpointForm,
})


const mapDispatchToProps = dispatch => ({
  editEndpointName: (channelId, stageId, endpointId, endpointData) => {
    dispatch(editEndpointName(channelId, stageId, endpointId, endpointData))
  },
  toggleEditEndpointForm: () => dispatch(toggleEditEndpointForm({})),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EditEndpoint)

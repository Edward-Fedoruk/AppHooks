import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import FormTitle from "../utils/FormTitle"
import { editDestination } from "../../actions/destination"
import MainButton from "../utils/MainButton"
import FormDrawer from "../FormDrawer"
import { toggleEditDestinationForm } from "../../actions/ui"


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
    match: PropTypes.object.isRequired,
    editDestination: PropTypes.func.isRequired,
    toggleEditDestinationForm: PropTypes.func.isRequired,
    editDestinationForm: PropTypes.bool.isRequired,
    currentDestination: PropTypes.object,
  }

  static defaultProps = {
    currentDestination: {},
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      editDestination, toggleEditDestinationForm, currentDestination, match,
    } = this.props

    editDestination(match.params.endpointId, currentDestination.id, this.state)
    toggleEditDestinationForm()
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, editDestinationForm, toggleEditDestinationForm } = this.props
    const { name } = this.state
    return (
      <FormDrawer open={editDestinationForm} toggleDialog={toggleEditDestinationForm}>
        <FormTitle title="Edit Destination" />

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="Destination name"
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
  currentDestination: view.destinationInfo,
  editDestinationForm: view.editDestinationForm,
})


const mapDispatchToProps = dispatch => ({
  editDestination: (endpointId, destinationData) => {
    dispatch(editDestination(endpointId, destinationData))
  },
  toggleEditDestinationForm: () => dispatch(toggleEditDestinationForm({})),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EditEndpoint)

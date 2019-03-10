import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import FormTitle from "../utils/FormTitle"
import { createStage } from "../../actions/stage"
import MainButton from "../utils/MainButton"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"
import history from "../../history"

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

export class CreateStage extends Component {
  state = {
    name: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    createStage: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    errorMessage: "Something went wrong",
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { createStage } = this.props
    const channelId = history.location.pathname.split("/").reverse()[0]

    createStage(channelId, this.state)
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })


  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes, errorMessage } = this.props
    const { name } = this.state
    return (
      <Fragment>
        <ErrorSnackbar message={errorMessage} />
        <FormTitle
          paragraph="Use the below to create a new input destination for you webhooks. Once completed, you will be given an endpoint URL for your webhook provider."
          title="Create Stage"
        />

        <ValidatorForm onSubmit={this.onSubmit}>
          <TextValidator
            label="Stage name"
            name="name"
            autoFocus
            variant="outlined"
            placeholder="MyStage"
            onChange={this.onChange("name")}
            className={classes.textField}
            value={name}
            margin="normal"
            validators={["required"]}
            errorMessages={["this field is required"]}
          />

          <MainButton className={classes.submitButton} type="submit">Create Stage</MainButton>

        </ValidatorForm>
      </Fragment>
    )
  }
}

const errorSelector = createErrorMessageSelector(["CREATE_ENDPOINT"])

const mapStateToProps = ({ errorHandler }) => ({
  errorMessage: errorSelector(errorHandler),
})

const mapDispatchToProps = dispatch => ({
  createStage: (id, stageData) => dispatch(createStage(id, stageData)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateStage)

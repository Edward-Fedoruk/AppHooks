import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { compose } from "redux"
import FormTitle from "../utils/FormTitle"
import { editStageName } from "../../actions/stage"
import MainButton from "../utils/MainButton"
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
    editStageName: PropTypes.func.isRequired,
    currentStage: PropTypes.number.isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { editStageName, currentStage } = this.props
    const channelId = history.location.pathname.split("/").reverse()[0]

    editStageName(channelId, currentStage, this.state.name)
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  onChange = input => e => this.setState({ [input]: e.target.value })

  render() {
    const { classes } = this.props
    const { name } = this.state
    return (
      <Fragment>
        <FormTitle title="Edit Stage" />

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

          <MainButton className={classes.submitButton} type="submit">Confirm</MainButton>

        </ValidatorForm>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ channels, channelsEntities: { entities }, view }) => {
  const stages = channels.currentChannel.stageIds.map(id => entities.stages[id])

  return {
    currentStage: stages[view.currentStage].id || 0,
  }
}
const mapDispatchToProps = dispatch => ({
  editStageName: (channelId, stageId, newName) => dispatch(editStageName(channelId, stageId, newName)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateStage)

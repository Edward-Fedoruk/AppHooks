import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ValidatorForm } from "react-material-ui-form-validator"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import FormAce from "./FormAce"
import FormRuleName from "./FormRuleName"
import MainButton from "../MainButton"
import { fetchRule, editRule } from "../../actions/rules"

const styles = ({ breakpoints }) => ({
  newRule: {
    display: "flex",
    margin: "20px auto",
  },

  inputWrap: {
    display: "flex",
    height: "25vw",
    width: "100%",
    maxWidth: "1061px",
    margin: "33px auto",
    justifyContent: "space-between",

    [breakpoints.down(768)]: {
      flexDirection: "column",
      height: "100%",
    },
  },
})

export class EditRuleForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    editRule: PropTypes.func.isRequired,
    currentRecipe: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const { currentRecipe } = this.props
    this.state = {
      code: currentRecipe.code === null ? "" : currentRecipe.code,
      input: currentRecipe.input === null ? "" : currentRecipe.input,
      name: currentRecipe.name === null ? "" : currentRecipe.name,
    }
  }

  codeChange = code => this.setState({ code })

  nameChange = e => this.setState({ name: e.target.value })

  submit = () => {
    const { editRule, currentRecipe } = this.props
    const {
      name, description, input, code,
    } = this.state

    editRule(currentRecipe.id, {
      name,
      description,
      input_type: "plain",
      input,
      code,
    })
  }

  render() {
    const { classes, currentRecipe } = this.props
    const { code, input, name } = this.state
    console.log(currentRecipe)
    return (
      <ValidatorForm onSubmit={this.submit}>
        <FormRuleName onChange={this.nameChange} value={name} />
        <div className={classes.inputWrap}>
          <FormAce
            onChange={this.codeChange}
            code={code}
            caption="Transformation code"
          />
          <FormAce
            onChange={this.inputCodeChange}
            code={input}
            caption="input data"
          />
        </div>
        <MainButton className={classes.newRule} type="submit">Edit</MainButton>
      </ValidatorForm>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRule: data => dispatch(fetchRule(data)),
  editRule: (id, data) => dispatch(editRule(id, data)),

})

const mapStateToProps = ({ rules }) => ({
  currentRecipe: rules.currentRecipe,
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EditRuleForm)

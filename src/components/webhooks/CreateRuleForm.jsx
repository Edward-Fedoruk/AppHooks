import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ValidatorForm } from "react-material-ui-form-validator"
import { withStyles } from "@material-ui/core"
import FormAce from "./FormAce"
import FormRuleName from "./FormRuleName"
import MainButton from "../MainButton"
import { createRule } from "../../actions/rules"

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

export class CreateRuleForm extends Component {
  state = {
    code: "",
    inputCode: "",
    name: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    createRule: PropTypes.func.isRequired,
  }

  submit = () => {
    this.props.createRule({
      name: this.state.name,
      description: "",
      input_type: "plain",
      input: this.state.inputCode,
      code: this.state.code,
    })
  }

  codeChange = code => this.setState({ code })

  inputCodeChange = inputCode => this.setState({ inputCode })

  nameChange = e => this.setState({ name: e.target.value })

  render() {
    const { classes } = this.props
    const { code, inputCode, name } = this.state

    return (
      <ValidatorForm onSubmit={this.submit}>
        <FormRuleName onChange={this.nameChange} value={name} />
        <div className={classes.inputWrap}>
          <FormAce onChange={this.codeChange} code={code} caption="Transformation code" />
          <FormAce onChange={this.inputCodeChange} code={inputCode} caption="input data" />
        </div>
        <MainButton className={classes.newRule} type="submit">Create New Rule</MainButton>
      </ValidatorForm>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createRule: data => dispatch(createRule(data)),
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(CreateRuleForm))

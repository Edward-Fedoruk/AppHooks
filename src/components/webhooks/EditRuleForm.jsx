import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ValidatorForm } from "react-material-ui-form-validator"
import FormAce from "./FormAce"
import FormRuleName from "./FormRuleName"
import MainButton from "../MainButton"
import { withStyles } from "@material-ui/core"
import { fetchRule, editRule } from "../../actions/rules"
import { compose } from "redux"
import { withRouter } from "react-router-dom"

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
      height: "100%"
    },
  },
})

export class EditRuleForm extends Component {
  state = {
    code: this.props.currentRecipe.code === null ? "" : this.props.currentRecipe.code,
    input: this.props.currentRecipe.input === null ? "" : this.props.currentRecipe.input,
    name: this.props.currentRecipe.name === null ? "" : this.props.currentRecipe.name,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }


  codeChange = code => this.setState({ code })
  inputCodeChange = inputCode => this.setState({ inputCode })
  nameChange = e => this.setState({ name: e.target.value })

  submit = () => this.props.editRule(this.props.currentRecipe.id, {
    name: this.state.name,
    description: this.state.description,
    input_type: "plain",
    input: this.state.input,
    code: this.state.code    
  })

  render() {
    const { classes, currentRecipe,  } = this.props
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
        <MainButton className={classes.newRule} type="submit" >
          Edit
        </MainButton>
      </ValidatorForm>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRule: data => dispatch(fetchRule(data)),
  editRule: (id, data) => dispatch(editRule(id, data)),

})

const mapStateToProps = ({ rules }) => ({
  currentRecipe: rules.currentRecipe
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EditRuleForm)

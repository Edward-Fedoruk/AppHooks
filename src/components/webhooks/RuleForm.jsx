import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ValidatorForm } from "react-material-ui-form-validator"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import FormHeader from "./FormHeader"
import FormAce from "./FormAce"
import FormRuleName from "./FormRuleName"
import MainButton from "../MainButton"

const styles = ({ breakpoints }) => ({
  root: {
    padding: "20px 13vw",

    [breakpoints.down(768)]: {
      padding: "20px 10vw",
    },
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

  newRule: {
    display: "flex",
    margin: "20px auto",
  },
})

export class RuleForm extends Component {
  state = {
    code: "",
    inputCode: "",
    name: ""
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  submit = () => {
    console.log(this.state)
  }

  codeChange = code => this.setState({ code })
  inputCodeChange = inputCode => this.setState({ inputCode })
  nameChange = e => this.setState({ name: e.target.value })

  render() {
    const { classes } = this.props
    const { code, inputCode, name } = this.state
    return (
      <div className={classes.root}>
        <FormHeader 
          header="Create WebHook Rule"
          subHeader="Create a WebHook Rule. You can create as many rules as you need."
        />
        <ValidatorForm onSubmit={this.submit}>
          <FormRuleName onChange={this.nameChange} value={name} />
          <div className={classes.inputWrap}>
            <FormAce onChange={this.codeChange} code={code} caption="Transformation code" />
            <FormAce onChange={this.inputCodeChange} code={inputCode} caption="input data" /> 
          </div>
          <MainButton
            className={classes.newRule}
            type="submit"
          >
            Create New Rule
          </MainButton>
        </ValidatorForm>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(RuleForm)

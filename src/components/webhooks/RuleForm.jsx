import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import AceEditor from "react-ace"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

export class RuleForm extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <ValidatorForm>
          <TextValidator
            variant="outlined"
            label="Enter your email"
            name="email"
            ref="email"
            autoFocus
            placeholder="e.g., carl@cloud.ci"
            margin="normal"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
        </ValidatorForm>
        <AceEditor
          mode="javascript"
          theme="github"
          name="blah2"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={`function onLoad(editor) {
          console.log("i"ve loaded");
        }`}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleForm)

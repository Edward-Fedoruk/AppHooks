import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import AceEditor from "react-ace"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { compose } from "redux"
import brace from "brace"
import "brace/mode/javascript"  
import "brace/theme/xcode"

const styles = () => ({
  root: {
    padding: "20px 13vw"
  },

  textWrap: {
    margin: "auto",
    maxWidth: "610px"
  },

  area: {
    width: "47%"
  },

  header: {
    color: "#5A5B5F",
    fontSize: "25px",
    fontWeight: "500"
  },

  subHead: {
    color: "#5A5B5F",
    fontSize: "16px",
    fontWeight: "normal"
  },

  nameField: {
    width: "100%",
    maxWidth: "610px",
    margin: "33px auto",
    display: "flex"
  },

  inputWrap: {
    display: "flex",
    height: "25vw",
    width: "100%",
    maxWidth: "610px",
    margin: "33px auto",
    justifyContent: "space-between"
  },

  editor: {
    border: "1px solid #c4c4c4",
    borderRadius: "3px"
  }
})

export class RuleForm extends Component {
  state = {
    code: ``
  }

  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.textWrap}>
          <Typography className={classes.header} variant="h1">
            Create WebHook Rule
          </Typography>
          <Typography className={classes.subHead} variant="subheading">
            Create a WebHook Rule. You can create as many rules as you need.
          </Typography>
        </div>
        <ValidatorForm>
          <TextValidator
            className={classes.nameField}
            variant="outlined"
            label="Rule Name"
            name="name"
            ref="name"
            autoFocus
            placeholder="e.g., Awesome rule"
            margin="normal"
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
          <div className={classes.inputWrap}>
            <AceEditor
              className={classes.editor}
              mode="javascript"
              theme="xcode"
              name="blah2"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              width="47%"
              height="100%"
              highlightActiveLine={true}
              value={this.state.code}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
            <TextValidator
              className={classes.area}
              variant="outlined"
              label="inputData"
              name="name"
              ref="name"
              rows="15"
              rowsMax="15"
              placeholder="e.g., data: {}"
              margin="none"
              multiline
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>

          <Button>Create Rule</Button>
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

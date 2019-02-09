/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import PropTypes from "prop-types"
import "brace/mode/javascript"
import "brace/theme/xcode"
import AceEditor from "react-ace"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"

const styles = ({ breakpoints }) => ({
  area: {
    width: "49%",
    height: "100%",

    [breakpoints.down(768)]: {
      width: "100%",
      marginBottom: "40px",
      height: "50vw",
    },
  },

  editor: {
    border: "1px solid #c4c4c4",
    borderRadius: "3px",
  },

})

const FormAce = ({
  classes, caption, code, onChange,
}) => (
  <div className={classes.area}>
    <Typography variant="caption">{caption}</Typography>
    <AceEditor
      className={classes.editor}
      mode="javascript"
      theme="xcode"
      name="blah2"
      fontSize={14}
      showPrintMargin
      showGutter
      width="100%"
      height="100%"
      onChange={onChange}
      highlightActiveLine
      value={code}
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

FormAce.defaultProps = {
  caption: "",
  code: "",
}

FormAce.propTypes = {
  classes: PropTypes.object.isRequired,
  caption: PropTypes.string,
  code: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FormAce)

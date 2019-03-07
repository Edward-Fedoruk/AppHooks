/* eslint-disable react/no-find-dom-node */
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import FormHelperText from "@material-ui/core/FormHelperText"

const styles = () => ({
  formControl: {
    minWidth: "300px",
  },
})

class SelectInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    option: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    errText: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  state = {
    labelWidth: 0,
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    })
  }

  render() {
    const {
      classes, name,
      styles, handleChange, option,
      error, errText,
    } = this.props

    const regions = [
      "us-east-1",
      "us-west-1",
      "ap-northeast-1",
      "eu-central-1",
      "sa-east-1",
    ]

    return (
      <FormControl
        variant="outlined"
        className={classes.formControl}
        style={styles}
        error={error}
      >
        <InputLabel
          ref={(ref) => {
            this.InputLabelRef = ref
          }}
          htmlFor={`outlined-${name}`}
        >
          {name}
        </InputLabel>
        <Select
          value={option}
          onChange={handleChange}
          input={(
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={name}
              id={`outlined-${name}`}
            />
          )}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {regions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {error
          && <FormHelperText>{ errText }</FormHelperText>}
      </FormControl>
    )
  }
}

export default withStyles(styles)(SelectInput)

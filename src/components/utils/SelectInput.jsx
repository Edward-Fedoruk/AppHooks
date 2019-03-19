/* eslint-disable react/no-find-dom-node */
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import FormHelperText from "@material-ui/core/FormHelperText"

class SelectInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    option: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    error: PropTypes.bool,
    errText: PropTypes.string,
  }

  static defaultProps = {
    error: false,
    errText: "field is required",
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
      name, styles, options,
      handleChange, option,
      error, errText,
    } = this.props

    return (
      <FormControl variant="outlined" style={styles} error={error}>
        <InputLabel
          ref={(ref) => { this.InputLabelRef = ref }}
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
          {options.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
        {error
          && <FormHelperText>{ errText }</FormHelperText>}
      </FormControl>
    )
  }
}

export default SelectInput

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

const styles = theme => ({
  formControl: {
    minWidth: "300px",
  },

})

class SelectInput extends React.Component {
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
      classes, options, name,
      styles, handleChange, option,
      error, errText,
    } = this.props

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
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option[0]}
            </MenuItem>
          ))}
        </Select>
        {error
          && <FormHelperText>{ errText }</FormHelperText>}
      </FormControl>
    )
  }
}

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  options: PropTypes.array,
}

export default withStyles(styles)(SelectInput)

import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const styles = (theme) => ({
  menu: {
    width: 200,
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: "30px",
    marginTop: "0",
    marginBottom: "0",
    width: "190px"
  },

  button: {
    height: "20px"
  },
 

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "50px"
  }
})

const data = [
  {id: 1, value: "export"},
  {id: 2, value: "delete"},
]

const ExportButton = ({ classes }) => {
  return (
    <div className={classes.actions}>
      <TextField
        select
        className={classes.textField}
        value={data[0].value}
        onChange={() => {}}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
        variant="outlined"
      >
        {data.map(option => (
          <MenuItem key={option.id} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="outlined" size="small" color="primary" className={classes.button}>
        Primary
      </Button>
    </div>
  )
}

ExportButton.propTypes = {

}

export default withStyles(styles)(ExportButton)

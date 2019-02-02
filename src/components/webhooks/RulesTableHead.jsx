import React from "react"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import PropTypes from "prop-types"

const styles = () => ({
  colName: {
    fontWeight: "bold",
    fontSize: "16px"
  }
})

const RulesTableHead = ({ classes }) => (
  <TableHead>
    <TableRow>
      <TableCell>
        <Typography 
          className={classes.colName} 
          color="primary"
        >
          Name
        </Typography>
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  </TableHead>
)

RulesTableHead.propTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(RulesTableHead)

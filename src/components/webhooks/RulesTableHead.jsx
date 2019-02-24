import React from "react"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core"
import PropTypes from "prop-types"
import TableCell from "../TableCell"

const styles = () => ({
  colName: {
    fontWeight: "500",
    fontSize: "16px",
  },
})

const RulesTableHead = ({ classes }) => (
  <TableHead>
    <TableRow>
      <TableCell>
        <Typography className={classes.colName} color="primary">Name</Typography>
      </TableCell>
      <TableCell />
    </TableRow>
  </TableHead>
)

RulesTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(RulesTableHead)

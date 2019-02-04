import React from "react"
import PropTypes from "prop-types"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import RuleMenu from "../webhooks/RuleMenu"
import { withStyles } from "@material-ui/core"

const styles = () => ({
  rulName: {
    width: "100%",
    color: "#192B7F",
    fontSize: "16px"
  },
})

const RulesTableBody = ({ page, data, rowsPerPage, classes, emptyRows }) => {
  return (
    <TableBody>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(rule => (
        <TableRow hover key={rule.id}>
          <TableCell className={classes.rulName} >
            {rule.name}
          </TableCell>
          <TableCell align="right" padding="none">
            <RuleMenu id={rule.id} />
          </TableCell>
        </TableRow>
      ))}
      
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}

RulesTableBody.propTypes = {
  page: PropTypes.number,
  data: PropTypes.array,
  rowsPerPage: PropTypes.number,
  classes: PropTypes.object,
  emptyRows: PropTypes.number
}

export default withStyles(styles)(RulesTableBody)

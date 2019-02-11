import React from "react"
import PropTypes from "prop-types"
import TableBody from "@material-ui/core/TableBody"
import { withStyles } from "@material-ui/core"
import TableRow from "../TableRow"
import TableCell from "../TableCell"
import RuleMenu from "./RuleMenu"

const styles = () => ({
  rulName: {
    width: "100%",
    color: "#192B7F",
    fontSize: "16px",
  },
})

const RulesTableBody = ({
  page, data, rowsPerPage, classes, emptyRows,
}) => (
  <TableBody>
    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(rule => (
      <TableRow hover key={rule.id}>
        <TableCell className={classes.rulName}>
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

RulesTableBody.defaultProps = {
  emptyRows: 0,
}

RulesTableBody.propTypes = {
  page: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  emptyRows: PropTypes.number,
}

export default withStyles(styles)(RulesTableBody)

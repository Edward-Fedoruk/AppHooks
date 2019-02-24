import React from "react"
import TableHead from "@material-ui/core/TableHead"
import Checkbox from "@material-ui/core/Checkbox"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import TableRow from "../TableRow"
import TableCell from "../TableCell"

const rows = [
  {
    id: "attempt", numeric: false, disablePadding: true, label: "Sent/Last Attempt",
  },
  {
    id: "application", numeric: false, disablePadding: true, label: "Application",
  },
  {
    id: "endpoint", numeric: false, disablePadding: true, label: "Endpoint",
  },
  {
    id: "destination", numeric: false, disablePadding: true, label: "Destination",
  },
  {
    id: "status", numeric: false, disablePadding: true, label: "Status/Attempts",
  },
  {
    id: "code", numeric: false, disablePadding: true, label: "Response Code",
  },
]

const styles = () => ({
  headerCell: {
    color: "#192B7F",
    fontSize: "16px",
  },
})

const EnhancedTableHead = ({
  onSelectAllClick, numSelected, rowCount, classes,
}) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      {rows.map(
        row => (
          <TableCell
            key={row.id}
            padding={row.disablePadding ? "none" : "default"}
            className={classes.headerCell}
          >
            {row.label}
          </TableCell>
        )
      )}
      <TableCell />
    </TableRow>
  </TableHead>
)

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EnhancedTableHead)

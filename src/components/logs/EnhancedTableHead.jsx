import React from "react"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import TableHead from "@material-ui/core/TableHead"
import Tooltip from "@material-ui/core/Tooltip"
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
    id: "application", numeric: false, disablePadding: false, label: "Application",
  },
  {
    id: "endpoint", numeric: false, disablePadding: false, label: "Endpoint",
  },
  {
    id: "destination", numeric: false, disablePadding: false, label: "Destination",
  },
  {
    id: "status", numeric: false, disablePadding: false, label: "Status/Attempts",
  },
  {
    id: "code", numeric: false, disablePadding: false, label: "Response Code",
  },
]

const styles = () => ({
  headerCell: {
    color: "#192B7F",
    fontWeight: "bold",
    fontSize: "16px",
  },
})

class EnhancedTableHead extends React.Component {
  createSortHandler = property => (event) => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      onSelectAllClick, order, orderBy, numSelected, rowCount, classes,
    } = this.props

    return (
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
            (row, i) => (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
                className={classes.headerCell}
                style={{ paddingRight: i === 0 && "150px" }}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          )}
          <TableCell />
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EnhancedTableHead)

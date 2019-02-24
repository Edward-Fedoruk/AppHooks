import React, { Component } from "react"
import PropTypes from "prop-types"
import TableBody from "@material-ui/core/TableBody"
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/core"
import TableCell from "../TableCell"
import TableRow from "../TableRow"
import LogMenu from "./LogMenu"

const styles = ({ palette }) => ({
  cell: {
    color: palette.primary.main,
    fontSize: "16px",
  },
})


class AccessTableBody extends Component {
  handleRowClick = (e, id) => {
    if (e.target.tagName === "TD" || e.target.tagName === "INPUT") { this.props.handleClick(e, id) }
  }

  render() {
    const {
      data, page, rowsPerPage, emptyRows,
      isSelected, classes,
    } = this.props

    return (
      <TableBody>
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((n) => {
            const selected = isSelected(n.id)
            return (
              <TableRow
                hover
                onClick={event => this.handleRowClick(event, n.id)}
                role="checkbox"
                aria-checked={selected}
                tabIndex={-1}
                key={n.id}
                selected={selected}
              >
                <TableCell padding="checkbox" className={classes.cell}><Checkbox checked={selected} /></TableCell>
                <TableCell padding="none" className={classes.cell}>{n.attempted_at}</TableCell>
                <TableCell padding="none" className={classes.cell}>{n.application.name}</TableCell>
                <TableCell padding="none" className={classes.cell}>{n.endpoint.name}</TableCell>
                <TableCell padding="none" className={classes.cell}>{n.destination.name}</TableCell>
                <TableCell padding="none" className={classes.cell}>{n.response_text}</TableCell>
                <TableCell padding="none" className={classes.cell}>{n.response_code}</TableCell>
                <TableCell align="right">
                  <LogMenu id={n.id} />
                </TableCell>
              </TableRow>
            )
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={8} />
          </TableRow>
        )}
      </TableBody>
    )
  }
}


AccessTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  emptyRows: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccessTableBody)

import React from 'react'
import PropTypes from 'prop-types'
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}


const AccessTableBody = ({ 
  data, order, orderBy, 
  page, rowsPerPage, emptyRows, 
  isSelected, handleClick 
}) => (
  <TableBody>
    {stableSort(data, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(n => {
        const selected = isSelected(n.id)
        return (
          <TableRow
            hover
            onClick={event => handleClick(event, n.id)}
            role="checkbox"
            aria-checked={selected}
            tabIndex={-1}
            key={n.id}
            selected={selected}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={selected} />
            </TableCell>
            <TableCell component="th" scope="row" padding="none">
              {n.name}
            </TableCell>
            <TableCell align="right">{n.calories}</TableCell>
            <TableCell align="right">{n.fat}</TableCell>
            <TableCell align="right">{n.carbs}</TableCell>
            <TableCell align="right">{n.protein}</TableCell>
          </TableRow>
        )
      })}
    {emptyRows > 0 && (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )}
  </TableBody>
)


AccessTableBody.propTypes = {
  data: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  emptyRows: PropTypes.number,
  isSelected: PropTypes.func,
  handleClick: PropTypes.func 
}

export default AccessTableBody

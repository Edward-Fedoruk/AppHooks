import React, { Component } from "react"
import PropTypes from "prop-types"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import { withStyles } from "@material-ui/core"
import LogMenu from "./LogMenu"

const styles = ({ palette }) => ({
  cell: {
    color: palette.primary.main,
    fontSize: "16px",
  }
})


class AccessTableBody extends Component { 

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  
  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }
  
  getSorting = (order, orderBy) => order === "desc" 
      ? (a, b) => this.desc(a, b, orderBy) 
      : (a, b) => -(this.desc(a, b, orderBy))

  handleRowClick = (e, id) => {
    if(e.target.tagName === "TD" || e.target.tagName === "INPUT") 
      this.props.handleClick(e, id)
    return
  }

  render() {
    const { 
      data, order, orderBy, 
      page, rowsPerPage, emptyRows, 
      isSelected, classes
    } = this.props

    return (
      <TableBody>
        {this.stableSort(data, this.getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(n => {
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
                <TableCell className={classes.cell} padding="checkbox">
                  <Checkbox checked={selected} />
                </TableCell>
                <TableCell className={classes.cell} padding="none">
                  {n.attempted_at}
                </TableCell>
                <TableCell className={classes.cell}>{n.application.name}</TableCell>
                <TableCell className={classes.cell}>{n.endpoint.name}</TableCell>
                <TableCell className={classes.cell}>{n.destination.name}</TableCell>
                <TableCell className={classes.cell}>{n.response_text}</TableCell>
                <TableCell className={classes.cell}>{n.response_code}</TableCell>
                <TableCell>
                  <LogMenu id={n.id} />    
                </TableCell>
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
  }
}


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

export default withStyles(styles)(AccessTableBody)

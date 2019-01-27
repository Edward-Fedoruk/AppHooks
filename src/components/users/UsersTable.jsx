import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import withPaginationTable from "../withPaginationTable"

const styles = () => ({
  colName: {
    fontWeight: "bold",
    fontSize: "14px"
  }
})

export class UsersTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes, data, page, rowsPerPage, emptyRows } = this.props
    const collNames = ["Email", "Name", "Role", "Privileges", "Active", ""]
    return (
      <Table>
        <TableHead>
          <TableRow>
            {collNames.map(name => (
              <TableCell>
                <Typography className={classes.colName} color="primary">
                  {name}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.privileges}</TableCell>
              <TableCell>{row.active}</TableCell>
            </TableRow>
          ))}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
        </TableBody>
      </Table>
    )
  }
}

export default withPaginationTable()(withStyles(styles)(UsersTable))

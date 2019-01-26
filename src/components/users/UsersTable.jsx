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
    const { classes } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className={classes.colName} color="primary">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.colName} color="primary">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.colName} color="primary">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.colName} color="primary">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.colName} color="primary">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.colName} color="primary">
                Email
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
            <TableCell>test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default withPaginationTable()(withStyles(styles)(UsersTable))

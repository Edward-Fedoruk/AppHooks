import React, { Component } from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import { withStyles } from "@material-ui/core"
import TablePagination from "@material-ui/core/TablePagination"

const styles = () => ({
  table: {
    width: "100%",

  },

  rulName: {
    width: "100%",
    fontFamily: "Lato",
    color: "#192B7F",
    fontSize: "14px"
  },

  colName: {
    fontFamily: "Lato",
    fontWeight: "bold",
    fontSize: "14px"
  }
})

let counter = 0
function createData(name) {
  counter += 1
  return { id: counter, name }
}

const data = [
  createData("Cupcake"),
  createData("Donut"),
  createData("Eclair"),
  createData("Frozen yoghurt"),
  createData("Gingerbread"),
  createData("Honeycomb"),
  createData("Ice cream sandwich"),
  createData("Jelly Bean"),
  createData("KitKat"),
  createData("Lollipop"),
  createData("Marshmallow"),
  createData("Nougat"),
  createData("Oreo"),
]

export class RulesTable extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { rowsPerPage, page } = this.state
    const { classes } = this.props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
        <Paper className={classes.table}>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography 
                      className={classes.colName} 
                      color="primary"
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(rule => (
                  <TableRow>
                    <TableCell className={classes.rulName} >
                      {rule.name}
                    </TableCell>
                    <TableCell align="right" padding="none">
                      <IconButton aria-haspopup="true">
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
               
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
    )
  }
}

export default withStyles(styles)(RulesTable)

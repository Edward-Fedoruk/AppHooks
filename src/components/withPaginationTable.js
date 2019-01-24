import React, { Component } from 'react'
import TablePagination from "@material-ui/core/TablePagination"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core"

const styles = ({ spacing }) => ({
  root: {
    width: "100%",
    maxWidth: "1050px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: spacing.unit * 3,
  }
})

export default () => WrappedComponent => {
  class hocComponent extends Component {
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
      const { classes, data } = this.props
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
      
      return (
        <Paper className={classes.root}>
          <WrappedComponent 
            emptyRows={emptyRows}
            rowsPerPage={rowsPerPage}
            page={page}
            data={data}
          />
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

  return withStyles(styles)(hocComponent)
}
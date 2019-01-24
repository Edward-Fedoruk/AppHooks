import React, { Component, Fragment } from 'react'
import TablePagination from "@material-ui/core/TablePagination"
import Paper from "@material-ui/core/Paper"

export default (data, WrappedComponent) => {
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
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

      return (
        <Paper>
          <WrappedComponent 
            emptyRows={emptyRows}
            rowsPerPage={rowsPerPage}
            page={page}
            {...this.props}
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

  return hocComponent
}

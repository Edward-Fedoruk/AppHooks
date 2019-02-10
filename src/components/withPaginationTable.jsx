import React, { Component } from "react"
import TablePagination from "@material-ui/core/TablePagination"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core"
import withWidth from "@material-ui/core/withWidth"
import PropTypes from "prop-types"

const styles = () => ({
  root: {
    width: "100%",
    maxWidth: "1050px",
    marginRight: "auto",
    marginLeft: "auto",
  },
})

export default () => (WrappedComponent) => {
  class hocComponent extends Component {
    state = {
      page: 0,
      rowsPerPage: 5,
    }

    static propTypes = {
      classes: PropTypes.object.isRequired,
      data: PropTypes.array.isRequired,
      width: PropTypes.string.isRequired,
    }

    handleChangePage = (event, page) => {
      this.setState({ page })
    }

    handleChangeRowsPerPage = (event) => {
      this.setState({ rowsPerPage: event.target.value })
    }

    render() {
      const { rowsPerPage, page } = this.state
      const { classes, data, width } = this.props
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
      const showSelect = width !== "xs" ? [5, 10, 25] : []
      return (
        <Paper elevation={0} className={classes.root}>
          <WrappedComponent
            emptyRows={emptyRows}
            rowsPerPage={rowsPerPage}
            page={page}
            data={data}
          />
          <TablePagination
            rowsPerPageOptions={showSelect}
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

  return withWidth()(withStyles(styles)(hocComponent))
}

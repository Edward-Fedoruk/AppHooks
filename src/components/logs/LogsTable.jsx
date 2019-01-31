import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import EnhancedTableToolbar from "./EnhancedTableToolbar"
import EnhancedTableHead from "./EnhancedTableHead"
import AccessTableBody from "./AccessTableBody"
import withPaginationTable from "../withPaginationTable"
import { compose } from "redux"
import { connect } from "react-redux"
import { deleteLogs } from "../../actions/requestLogs"

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "1050px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto",
  },
})

class LogsTable extends Component {
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    openDialog: false
  }

  static propTypes = { 
    classes: PropTypes.object,
    data: PropTypes.array,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    emptyRows: PropTypes.number  
  }

  toggleDialog = () => 
    this.setState(state => ({ openDialog: !state.openDialog }))

  handleCloseWithAction = (ids) => {
    this.toggleDialog()
    this.props.deleteLogs(ids)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.map(n => n.id) }))
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes, data, rowsPerPage, page, emptyRows  } = this.props
    const { order, orderBy, selected, openDialog } = this.state

    return (
          <Fragment>
            <EnhancedTableToolbar 
              selected={selected} 
              toggleDialog={this.toggleDialog}
              handleCloseWithAction={this.handleCloseWithAction}
              openDialog={openDialog}
            />
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <AccessTableBody 
                  emptyRows={emptyRows}
                  data={data}
                  order={order}
                  orderBy={orderBy}
                  handleClick={this.handleClick}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  isSelected={this.isSelected}
                />
              </Table>
            </div>
          </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteLogs: ids => dispatch(deleteLogs(ids))
})


export default compose(
  withPaginationTable(),
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(LogsTable)
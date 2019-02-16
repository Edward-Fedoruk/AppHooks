/* eslint-disable camelcase */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import Typography from "@material-ui/core/Typography"
import { compose } from "redux"
import { connect } from "react-redux"
import TableRow from "../TableRow"
import UserMenu from "./UserMenu"
import withPaginationTable from "../withPaginationTable"
import { updateSubUser } from "../../actions/subUsers"
import UserTableRow from "./UserTableRow"

const styles = () => ({
  colName: {
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 3s",
  },

  tableWrapper: {
    overflowX: "auto",
  },
})

export class UsersTable extends Component {
  state = {
    open: -1,
    anchorEl: {},
    selected: 1,
    clickedRow: {},
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    emptyRows: PropTypes.number.isRequired,
    updateSubUser: PropTypes.func.isRequired,
  }

  handleClick = (event) => {
    const { data } = this.props
    const clickedRow = data.find(row => row.id === parseInt(event.currentTarget.id, 10))
    this.setState({
      open: event.currentTarget.id,
      anchorEl: event.currentTarget,
      clickedRow,
    })
  }

  handleClose = () => {
    this.setState({ open: -1, anchorEl: null, selected: -1 })
  }

  confirmChange = () => {
    const {
      clickedRow: { is_active, role, id },
    } = this.state
    let {
      clickedRow: { name, phone, company },
    } = this.state

    // will be changed with better solution
    name = name === null ? "" : name
    phone = phone === null ? "" : phone
    company = company === null ? "" : company

    this.props.updateSubUser(id, {
      name, phone, company, is_active, role, id,
    })

    this.setState({ selected: -1 })
  }

  declineChange = () => {
    this.setState({ selected: -1 })
  }

  handleEdit = () => this.setState(({ open }) => ({
    selected: open,
    anchorEl: null,
    open: -1,
  }))

  changeSelect = select => event => this.setState(({ clickedRow }) => ({
    clickedRow: { ...clickedRow, [select]: event.target.value },
  }))

  render() {
    const {
      anchorEl, open, selected, clickedRow,
    } = this.state
    const {
      classes, data, page, rowsPerPage, emptyRows,
    } = this.props
    const collNames = ["Email", "Name", "Role", "Active", ""]
    return (
      <div className={classes.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {collNames.map(name => (
                <TableCell key={name}>
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
                <UserTableRow
                  clickedRow={clickedRow}
                  row={row}
                  selected={selected}
                  changeSelect={this.changeSelect}
                  key={row.id}
                >
                  <UserMenu
                    handleClick={this.handleClick}
                    handleClose={this.handleClose}
                    handleEdit={this.handleEdit}
                    confirmChange={this.confirmChange}
                    open={open}
                    selected={selected}
                    anchorEl={anchorEl}
                    id={row.id}
                  />
                </UserTableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateSubUser: (id, data) => dispatch(updateSubUser(id, data)),
})

export default compose(
  withPaginationTable(),
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(UsersTable)

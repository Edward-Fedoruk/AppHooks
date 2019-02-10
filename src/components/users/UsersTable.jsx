/* eslint-disable camelcase */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Typography from "@material-ui/core/Typography"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Gravatar from "react-gravatar"
import classNames from "classnames"
import { compose } from "redux"
import { connect } from "react-redux"
import UserMenu from "./UserMenu"
import withPaginationTable from "../withPaginationTable"
import { updateSubUser } from "../../actions/subUsers"

const styles = ({ palette }) => ({
  colName: {
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 3s",
  },

  avatar: { padding: "0 0 0 10px" },
  menu: { padding: "0" },

  cell: {
    color: palette.primary.main,
    fontSize: "16px",
    transition: "all 3s",
  },

  gravatar: {
    borderRadius: "50%",
    verticalAlign: "middle",
  },

  tableWrapper: {
    overflowX: "auto",
  },
})

export class UsersTable extends Component {
  state = {
    open: -1,
    anchorEl: null,
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
      clickedRow: {
        name, phone, company, is_active, role, id,
      },
    } = this.state

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
    console.log(data)
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
              .map((row) => {
                const active = row.is_active ? "Yes" : "No"
                return (
                  <TableRow hover selected={selected === `${row.id}`} key={row.id}>
                    <TableCell padding="checkbox" className={classNames(classes.cell, classes.avatar)}>
                      <Gravatar
                        default="identicon"
                        email={row.email}
                        className={classes.gravatar}
                        size={35}
                      />
                    </TableCell>
                    <TableCell className={classes.cell}>{row.email}</TableCell>
                    <TableCell className={classes.cell}>{row.name === null ? "-" : row.name}</TableCell>
                    <TableCell className={classes.cell}>
                      {selected === `${row.id}`
                        ? (
                          <Select
                            className={classes.cell}
                            value={clickedRow.role}
                            onChange={this.changeSelect("role")}
                          >
                            <MenuItem value="owner">
                              owner
                            </MenuItem>
                            <MenuItem value="user">
                              user
                            </MenuItem>
                          </Select>
                        )
                        : row.role}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {selected === `${row.id}`
                        ? (
                          <Select
                            className={classes.cell}
                            value={clickedRow.is_active}
                            onChange={this.changeSelect("is_active")}
                          >
                            <MenuItem value={1}>
                              Yes
                            </MenuItem>
                            <MenuItem value={0}>
                              No
                            </MenuItem>
                          </Select>
                        )
                        : active}
                    </TableCell>
                    <TableCell className={classNames(classes.cell, classes.menu)}>
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

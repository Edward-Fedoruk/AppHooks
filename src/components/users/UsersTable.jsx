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
import UserMenu from "./UserMenu"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Checkbox from "@material-ui/core/Checkbox"
import Gravatar from "react-gravatar"
import classNames from "classnames"

const styles = ({ palette }) => ({
  colName: {
    fontWeight: "bold",
    fontSize: "16px",
    transition: "all 3s"
  },

  avatar: {padding: "0 0 0 10px"},
  menu: {padding: "0"},

  cell: {
    color: palette.primary.main,
    fontSize: "16px",
    transition: "all 3s",
  },

  gravatar: {
    borderRadius: "50%",
    verticalAlign: "middle"
  },

  tableWrapper: {
    overflowX: "auto",
  }
})

export class UsersTable extends Component {
  state = {
    open: -1,
    anchorEl: null,
    selected: 1,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  handleClick = event => {
    this.setState({ 
      open: event.currentTarget.id,
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({ open: -1, anchorEl: null, selected: -1 })
  }

  confirmChange = () => {
    this.setState({ selected: -1 })
  }

  declineChange = () => {
    this.setState({ selected: -1 })
  }

  handleEdit = () => {
    this.setState(({ open }) => ({ 
      selected: open, 
      anchorEl: null,
      open: -1, 
      editMode: true
    }))
  }

  render() {
    const { anchorEl, open, selected } = this.state
    const { classes, data, page, rowsPerPage, emptyRows } = this.props
    const collNames = ["Email", "Name", "Role", "Privileges", "Active", ""]
    console.log(data)
    return (
      <div className={classes.tableWrapper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
            </TableCell>
            {collNames.map((name, i) => (
              <TableCell key={i}> 
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
            .map((row, i) => (
              <TableRow selected={selected === `${i}`} key={row.id}>
                <TableCell padding="checkbox" className={classNames(classes.cell, classes.avatar)}>
                  <Gravatar 
                    default="identicon" 
                    email={row.email}
                    className={classes.gravatar}
                    size={35}
                  />
                </TableCell>
                <TableCell className={classes.cell}>{row.email === null ? "-" : row.email}</TableCell>
                <TableCell className={classes.cell}>{row.name}</TableCell>
                <TableCell className={classes.cell}>
                  {selected === `${i}` 
                    ? <Select
                        className={classes.cell}
                        multiple
                        value={[row.role]}
                        renderValue={selected => selected.join(', ')}
                      >
                        <MenuItem value={row.role}>
                          {row.role}
                        </MenuItem>
                        <MenuItem value="sub-user">
                          <Checkbox />sub-user
                        </MenuItem>
                      </Select>
                    : row.role}   
                </TableCell>
                <TableCell className={classes.cell}>
                  {selected === `${i}` 
                    ? <Select
                        className={classes.cell}
                        value={row.package}
                      >
                        <MenuItem value={row.privileges}>
                          {row.privileges}
                        </MenuItem>
                        <MenuItem value="sub-user">
                          sub-user
                        </MenuItem>
                      </Select>
                    : row.privileges}
                </TableCell>
                <TableCell className={classes.cell}>
                  {selected === `${i}` 
                    ? <Select
                        className={classes.cell}
                        value={row.active}
                      >
                        <MenuItem value={1}>
                          yes
                        </MenuItem>
                        <MenuItem value={0}>
                          no
                        </MenuItem>
                      </Select>
                    : row.active ? "Yes" : "No"}                  
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
                    id={i}
                  />
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 49 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>)}
        </TableBody>
      </Table>
      </div>
    )
  }
}

export default withPaginationTable()(withStyles(styles)(UsersTable))

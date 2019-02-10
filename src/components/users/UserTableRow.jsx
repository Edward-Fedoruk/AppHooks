import React from "react"
import PropTypes from "prop-types"
import Gravatar from "react-gravatar"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

const styles = ({ palette }) => ({
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
})

const UserTableRow = ({
  classes, row, selected, changeSelect, children, clickedRow,
}) => {
  const active = row.is_active ? "Yes" : "No"
  return (
    <TableRow hover selected={selected === `${row.id}`}>
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
              onChange={changeSelect("role")}
            >
              <MenuItem value="owner">owner</MenuItem>
              <MenuItem value="user">user</MenuItem>
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
              onChange={changeSelect("is_active")}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
          )
          : active}
      </TableCell>
      <TableCell className={classNames(classes.cell, classes.menu)}>
        {children}
      </TableCell>
    </TableRow>
  )
}

UserTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  clickedRow: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserTableRow)

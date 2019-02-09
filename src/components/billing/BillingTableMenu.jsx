import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"
import { ReactComponent as BillingChart } from "../../assets/BillingChart.svg"

const styles = ({ breakpoints }) => ({
  tableRoot: {
    minWidth: "240px",
    maxWidth: "250px",

    [breakpoints.down(600)]: {
      minWidth: "155px",
    },
  },

  plan: {
    color: "#35C1CE",
    fontSize: "16px",
    marginBottom: "28px",
    fontWeight: "900",
  },

  chartIcon: {
    marginBottom: "42px",
  },

  privilege: {
    fontSize: "16px",
    paddingLeft: "24px",

    [breakpoints.down(600)]: {
      fontSize: "14px",
    },
  },

  cellRoot: {
  },
})

const privileges = [
  "Max Concurrent",
  "Number of Channels",
  "Messages / Day",
  "Support",
  "SSL Protection",
  "Manitoring Integrations",
]

const BillingTableMenu = ({ classes }) => (
  <Table classes={{ root: classes.tableRoot }}>
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography className={classes.plan} variant="h3">
            Account Plan
          </Typography>
          <BillingChart className={classes.chartIcon} />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {privileges.map((privilege, i) => (
        <TableRow key={i}>
          <TableCell padding="none">
            <Typography className={classes.privilege} color="primary">{privilege}</Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

BillingTableMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(BillingTableMenu)

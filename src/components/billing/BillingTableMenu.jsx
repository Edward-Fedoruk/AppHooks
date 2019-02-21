import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import PropTypes from "prop-types"
import TableRow from "../TableRow"
import TableCell from "../TableCell"
import { ReactComponent as BillingChart } from "../../assets/BillingChart.svg"

const styles = ({ breakpoints }) => ({
  tableRoot: {
    minWidth: "200px",
    maxWidth: "200px",

    [breakpoints.down(600)]: {
      minWidth: "140px",
    },
  },

  headCell: {
    paddingTop: "20px",

    [breakpoints.down(600)]: {
      padding: "20px 20px 4px 20px",
    },
  },

  plan: {
    color: "#35C1CE",
    fontSize: "16px",
    marginBottom: "28px",
    fontWeight: "900",
  },

  chartIcon: {
    marginBottom: "41px",
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
        <TableCell className={classes.headCell}>
          <Typography className={classes.plan} variant="h3">Account Plan</Typography>
          <BillingChart className={classes.chartIcon} />
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {privileges.map(privilege => (
        <TableRow key={privilege}>
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

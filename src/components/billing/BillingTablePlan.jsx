/* eslint-disable react/jsx-one-expression-per-line */
import React from "react"
import PropTypes from "prop-types"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import { withStyles } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import AllInclusive from "@material-ui/icons/AllInclusive"
import Check from "@material-ui/icons/Check"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import TableRow from "../TableRow"
import TableCell from "../TableCell"

const styles = ({ breakpoints, palette }) => ({
  planName: {
    textTransform: "uppercase",
    fontSize: "16px",
    marginBottom: "18px",
    fontWeight: "900",

  },

  price: {
    fontSize: "20px",
    color: "#35C1CE",
    fontWeight: "900",
  },

  caption: {
    color: "#A5ADD2",
    fontSize: "12px",
  },

  upgrade: {
    textTransform: "capitalize",
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "normal",
    width: "124px",
    marginBottom: "32px",
    marginTop: "22px",
  },

  headCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  privilege: {
    fontSize: "16px",

    [breakpoints.down(600)]: {
      fontSize: "14px",
    },
  },

  currentPlan: {
    color: palette.secondary.main,
    margin: "27px 0",
  },

  infinity: { color: "#35C1CE" },
  check: { color: "#ABE829" },
  iconWrap: { textAlign: "center" },
  active: { border: "solid #30B4C1 1px" },
})

const BillingTablePlan = ({
  classes, planName, price,
  concurrent, messages, support,
  ssl, monitoring, channels, active,
}) => (
  <Paper elevation={0} className={active ? classes.active : ""}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.headCell}>
            <Typography className={classes.planName} color="primary" align="center" variant="h3">
              {planName}
            </Typography>
            <Typography className={classes.price} align="center" variant="subtitle1">
              $
              {price}
            </Typography>
            <Typography className={classes.caption} align="center" variant="caption">per month</Typography>
            {active
              ? <Typography gutterBottom className={classes.currentPlan} color="primary" variant="h6">Your plan</Typography>
              : <Button size="small" className={classes.upgrade} color="primary" variant="outlined">Upgrade</Button>}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography
              align="center"
              className={classes.privilege}
              color="primary"
            >
              {concurrent}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.iconWrap}>
            {channels ? <AllInclusive className={classes.infinity} /> : ""}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              align="center"
              className={classes.privilege}
              color="primary"
            >
              {messages}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography
              align="center"
              className={classes.privilege}
              color="primary"
            >
              {support}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.iconWrap}>
            {ssl ? <Check className={classes.check} /> : ""}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.iconWrap}>
            {monitoring ? <Check className={classes.check} /> : ""}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
)

BillingTablePlan.propTypes = {
  classes: PropTypes.object.isRequired,
  planName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  concurrent: PropTypes.number.isRequired,
  messages: PropTypes.string.isRequired,
  support: PropTypes.string.isRequired,
  ssl: PropTypes.bool.isRequired,
  monitoring: PropTypes.bool.isRequired,
  channels: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
}

export default withStyles(styles)(BillingTablePlan)

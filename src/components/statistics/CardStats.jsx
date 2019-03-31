import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import classNames from "classnames"
import Typography from "@material-ui/core/Typography"
import CardStatsBlock from "./CardStatsBlock"

const styles = ({ palette, breakpoints }) => ({
  statsBlock: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "65px",
    padding: "0 12px",

    [breakpoints.down(600)]: { 
      position: "absolute",
      top: "50%",
      left: "100%",
      transform: "translateY(-50%)",
    },
  },

  deliverPercent: {
    fontSize: "25px",
    fontWeight: "300",
    textAlign: "center",
    width: "100%",
    lineHeight: ".9",
    color: palette.primary.main,
  },

  caption: {
    fontSize: "12px",
    fontWeight: "300",
    color: palette.primary.main,
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",

    [breakpoints.down(600)]: { 
      width: "50%",
      position: "relative",
      flexWrap: "wrap",
    },
  },

  divider: {
    width: "1px",
    backgroundColor: "#D7DEF1",
    
    [breakpoints.down(600)]: { display: "none" },
  },

})

const CardStats = ({ classes, statistics }) => (
  <div className={classes.stats}>

    <div className={classes.divider} />

    <div className={classNames(classes.statsBlock, classes.deliverWrap)}>
      <div>
        <Typography variant="body1" className={classes.deliverPercent}>{ statistics.deliverability }</Typography>
        <Typography variant="caption" className={classes.caption}>Deliverability</Typography>
      </div>
    </div>

    <CardStatsBlock leftDivider name="Successful Requests" amount={statistics.successful} />
    <CardStatsBlock name="Failed Requests" amount={statistics.failed} />
    <CardStatsBlock name="Queued Requests" amount={statistics.queued} />
    <CardStatsBlock name="Pending" amount={statistics.pending} />
    <CardStatsBlock name="Filtered" amount={statistics.filtered} />

  </div>
)

CardStats.propTypes = {
  classes: PropTypes.object.isRequired,
  statistics: PropTypes.object.isRequired,
}

export default withStyles(styles)(CardStats)

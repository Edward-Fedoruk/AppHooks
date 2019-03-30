import React from "react"
import PropTypes from "prop-types"
import { RadialChart } from "react-vis"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import CardStatsBlock from "../CardStatsBlock"
import Typography from "@material-ui/core/Typography"

const style = () => ({
  root: { width: "50%" },
  
  summaryStats: {
    display: "flex",
    justifyContent: "space-between",
  },
  
  statsWrap: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0",
  },

  deliverability: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
  },

  statsList: {
    padding: "0",
    margin: "0",
  },
  
  statsListItem: {
    margin: "10px 0",
    position: "relative",
    textTransform: "capitalize",
  },

  dot: {
    width: "10px",
    height: "10px",
    position: "absolute",
    top: "49%",
    left: "-10%",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  },

  radialChartWrap: { position: "relative" },
  radialChart: { position: "relative" },

})

const GeneralStats = ({ classes, chartData, total, summary, radialChartData }) => (
  <div className={classes.root}>
    <div className={classes.summaryStats}>
      <CardStatsBlock leftDivider name="Inputs" amount={total.inputs} />
      <CardStatsBlock name="Destinations" amount={total.destinations} />
      <CardStatsBlock name="Requests" amount={total.requests} />
    </div>
    <div className={classes.statsWrap}>
      <div className={classes.radialChartWrap}>
        <RadialChart
          className={classes.radialChart}
          colorType="literal"
          data={radialChartData}
          width={200}
          height={200}
          innerRadius={65}
          radius={90}
          padAngle={0.04}
        />
        <div className={classes.deliverability}>
          <Typography align="center" variant="h5">{ summary.deliverability }</Typography>
          <Typography align="center" variant="subtitle1">Deliverability</Typography>
        </div>
      </div>
      <ul className={classes.statsList}>
        {chartData.map(({ name, color, angle }) => (
          <Typography key={color} component="li" className={classes.statsListItem}>
            <span style={{ backgroundColor: color }} className={classes.dot} />{ name }: { angle }
          </Typography>
        ))}
      </ul>
    </div>
  </div>
)

GeneralStats.propTypes = {
  classes: PropTypes.object.isRequired,
  chartData: PropTypes.array, 
  total: PropTypes.object, 
  summary: PropTypes.object,
  radialChartData: PropTypes.array,
}

GeneralStats.defaultProps = {
  total: {}, 
  summary: {},
  chartData: [],
}

export default compose(
  withStyles(style)
)(GeneralStats)

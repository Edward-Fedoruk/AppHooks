import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import { TimeSeries, TimeRange } from "pondjs"
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis as TimeYAxis,
  LineChart,
  Resizable
} from "react-timeseries-charts"

const styles = () => ({
  timeChartWrap: { width: "50%" },
})

export class DynamicTimeChart extends Component {
  state = {
    timeRange: new TimeRange([Date.parse("2019-03-19 00:00"), Date.parse("2019-03-19 00:25")]),
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    XYChartData: PropTypes.array,
  }

  static defaultProps = {
    XYChartData: [[Date.parse(new Date()), 0]],
  }

  handleTimeRangeChange = timeRange => this.setState({ timeRange })

  render() {
    const { XYChartData, classes } = this.props
    const style = {
      value: {
        stroke: "#a02c2c",
        opacity: 0.2
      }
    }

    const series = new TimeSeries({
      name: "USD_vs_EURO",
      columns: ["time", "value"],
      points: XYChartData
    })

    return (
      <div className={classes.timeChartWrap}>
        <Resizable>
          <ChartContainer 
            minTime={series.range().begin()} 
            maxTime={series.range().end()} 
            enablePanZoom 
            onTimeRangeChanged={this.handleTimeRangeChange} 
            timeRange={this.state.timeRange}
          >
            <ChartRow height="250">
              <TimeYAxis
                showGrid
                id="price"
                min={series.min()} max={series.max()}
                width="60"
              />
              <Charts>
                <LineChart interpolation="curveLinear" axis="price" series={series} style={style}/>
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    )
  }
}

export default withStyles(styles)(DynamicTimeChart)
import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import LogsTable from "./LogsTable"
import ExportButton from "./ExportButton"
import Placeholder from "../Placeholder"
import logs from "../../assets/logs.png"
import withNavigation from "../withNavigation"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import TopBar from "../TopBar"

let counter = 0
function createData(name, calories, fat, carbs, protein) {
  counter += 1
  return { id: counter, name, calories, fat, carbs, protein }
}

const data = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
]

const styles = () => ({
  placeholder: {
    margin: "auto",
    marginTop: "170px"
  },

  contentWrap: {
    padding: "25px 35px"
  },
})

export class AccessLogs extends Component {
  static propTypes = {
    data: PropTypes.array,
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <TopBar title="Request Log Viewer" />
        <div className={classes.contentWrap}>
          {data.length  
            ? <Fragment>
                <LogsTable data={data} />
                <ExportButton />
              </Fragment>
            : <Placeholder 
                title="Log Viewer is empty"
                imgSrc={logs}
                className={classes.placeholder}
              />}
        </div>
      </Fragment>
    )
  }

  
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AccessLogs)

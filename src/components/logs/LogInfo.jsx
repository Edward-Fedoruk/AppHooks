import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import SwipeableViews from "react-swipeable-views"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import TransitEnterexit from "@material-ui/icons/TransitEnterexit"
import { compose } from "redux"
import RequestInfo from "./RequestInfo"
import ResponseInfo from "./ResponseInfo"
import withNavigation from "../withNavigation"
import TopBar from "../utils/TopBar"
import { fetchRequest } from "../../actions/requestLogs"

const styles = ({ palette, breakpoints }) => ({
  root: {
    backgroundColor: palette.background.paper,
    width: "100%",
  },

  tabs: {
    background: "#fff",
    borderBottom: "1px solid #E2E5F4",
  },

  req: {
    transform: "rotate(180deg)",
  },

  res: {
    transform: "rotate(270deg)",
  },

  contentWrap: {
    padding: "20px 26px 20px 13px",

    [breakpoints.down(375)]: {
      padding: "20px 5px 20px 5px",
    },
  },
})

export class LogInfo extends Component {
  state = {
    value: 0,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = (index) => {
    this.setState({ value: index })
  }

  componentDidMount() {
    this.props.fetchRequest(this.props.match.params.id)
  }

  render() {
    const { classes, openedLog } = this.props
    console.log(openedLog)
    return (
      <Fragment>
        <TopBar title="Request Log Info" />
        <div className={classes.contentWrap}>
          <div className={classes.root}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              classes={{
                root: classes.tabs,
              }}
            >
              <Tab icon={<TransitEnterexit className={classes.req} />} label="Request" />
              <Tab icon={<TransitEnterexit className={classes.res} />} label="Response" />
            </Tabs>
            <SwipeableViews
              axis="x"
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <RequestInfo data={openedLog} />
              <ResponseInfo data={openedLog} />
            </SwipeableViews>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ requestLogs }) => ({
  openedLog: requestLogs.openedLog,
})

const mapDispatchToProps = dispatch => ({
  fetchRequest: id => dispatch(fetchRequest(id)),
})

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LogInfo)

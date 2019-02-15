import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import UsersTable from "./UsersTable"
import withNavigation from "../withNavigation"
import TopBar from "../TopBar"
import { fetchUsers } from "../../actions/subUsers"
import AddUser from "./AddUser"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 20px 13px",

    [breakpoints.down(768)]: {
      padding: "20px 15px 5px 15px",
    },
    [breakpoints.down(600)]: {
      padding: "10px 0px 5px 0px",
    },
  },

  hint: {
    fontWeight: "300",
    fontSize: "14px",
  },
})

export class SubUsers extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const { classes, users } = this.props
    return (
      <Fragment>
        <TopBar title="Sub-Users" />
        <div className={classes.contentWrap}>
          <Typography gutterBottom className={classes.hint}>Sub-users can view an app’s stats, debug console, app settings and app keys.</Typography>
          <UsersTable data={users} />
          <AddUser />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.users,
})

const mapDispatchToProps = {
  fetchUsers,
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SubUsers)

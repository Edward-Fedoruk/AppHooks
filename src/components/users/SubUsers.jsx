import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UsersTable from "./UsersTable"
import withNavigation from "../withNavigation"
import TopBar from "../TopBar"
import { compose } from "redux"
import { withStyles } from "@material-ui/core"
import { fetchUsers } from "../../actions/subUsers"
import AddUser from "./AddUser"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 20px 13px",
  },
})

export class SubUsers extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const { classes, users } = this.props
    console.log(users)
    return (
      <Fragment>
        <TopBar title="Sub-Users" />
        <div className={classes.contentWrap}>
          <UsersTable data={users} />
          <AddUser />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.users
})

const mapDispatchToProps = {
  fetchUsers
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SubUsers)

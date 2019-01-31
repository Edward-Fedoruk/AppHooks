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

let counter = 0
function createData(email, name, role, privileges, active) {
  counter += 1
  return { id: counter, email, name, role, privileges, active }
}

const data = [
  createData("Cupcake", "test1", "test2", "test3", "yes"),
  createData("Donut", "test1", "test2", "test3", "test4"),
  createData("Frozen yoghurt", "test1", "test2", "test3", "test4"),
  createData("Gingerbread", "test1", "test2", "test3", "test4"),
  createData("Honeycomb", "test1", "test2", "test3", "test4"),
  createData("Ice cream sandwich", "test1", "test2", "test3", "test4"),
  createData("Jelly Bean", "test1", "test2", "test3", "test4"),
  createData("KitKat", "test1", "test2", "test3", "test4"),
  createData("Lollipop", "test1", "test2", "test3", "test4"),
  createData("Marshmallow", "test1", "test2", "test3", "test4"),
  createData("Nougat", "test1", "test2", "test3", "test4"),
  createData("Oreo", "test1", "test2", "test3", "test4"),
]

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

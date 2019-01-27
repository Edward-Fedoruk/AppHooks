import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UsersTable from "./UsersTable"


let counter = 0
function createData(email, name, role, privileges, active) {
  counter += 1
  return { id: counter, email, name, role, privileges, active }
}

const data = [
  createData("Cupcake", "test1", "test2", "test3", "test4"),
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

export class SubUsers extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <UsersTable data={data} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SubUsers)

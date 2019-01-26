import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UsersTable from "./UsersTable"


let counter = 0
function createData(name) {
  counter += 1
  return { id: counter, name }
}

const data = [
  createData("Cupcake"),
  createData("Donut"),
  createData("Eclair"),
  createData("Frozen yoghurt"),
  createData("Gingerbread"),
  createData("Honeycomb"),
  createData("Ice cream sandwich"),
  createData("Jelly Bean"),
  createData("KitKat"),
  createData("Lollipop"),
  createData("Marshmallow"),
  createData("Nougat"),
  createData("Oreo"),
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

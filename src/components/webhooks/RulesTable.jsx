import React from "react"
import Table from "@material-ui/core/Table"
import RulesTableHead from "./RulesTableHead"
import withPaginationTable from "../withPaginationTable"
import { compose } from "redux"
import RulesTableBody from "./RulesTableBody"

const RulesTable = ({ data, rowsPerPage, page, emptyRows }) => (
  <Table>
    <RulesTableHead />
    <RulesTableBody 
      data={data}
      rowsPerPage={rowsPerPage}
      page={page}
      emptyRows={emptyRows}
    />
  </Table>
)


export default compose(
  withPaginationTable(),
)(RulesTable)

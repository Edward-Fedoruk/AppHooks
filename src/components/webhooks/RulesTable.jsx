import React from "react"
import Table from "@material-ui/core/Table"
import { compose } from "redux"
import PropTypes from "prop-types"
import RulesTableHead from "./RulesTableHead"
import withPaginationTable from "../withPaginationTable"
import RulesTableBody from "./RulesTableBody"

const RulesTable = ({
  data, rowsPerPage, page, emptyRows,
}) => (
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

RulesTable.defaultProps = {
  emptyRows: 0,
}

RulesTable.propTypes = {
  data: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  emptyRows: PropTypes.number,
}

export default compose(
  withPaginationTable(),
)(RulesTable)

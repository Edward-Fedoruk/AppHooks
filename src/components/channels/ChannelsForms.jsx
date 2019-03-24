import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import CreateStage from "../stages/CreateStage"
import EditStageName from "../stages/EditStageName"
import FormDrawer from "../FormDrawer"
import { toggleCreateStageForm, toggleEditStageForm } from "../../actions/ui"
import CreateEndpoint from "../endpoints/CreateEndpoint"
import EditEndpoint from "../endpoints/EditEndpoint"

const ChannelsForms = ({
  toggleCreateStageForm, toggleEditStageForm,
  createStageForm, editStageNameForm,
}) => (
  <Fragment>
    <FormDrawer open={createStageForm} toggleDialog={toggleCreateStageForm}>
      <CreateStage />
    </FormDrawer>

    <FormDrawer open={editStageNameForm} toggleDialog={toggleEditStageForm}>
      <EditStageName />
    </FormDrawer>

    <CreateEndpoint />

    <EditEndpoint />
  </Fragment>
)

ChannelsForms.propTypes = {
  toggleCreateStageForm: PropTypes.func.isRequired,
  toggleEditStageForm: PropTypes.func.isRequired,
  createStageForm: PropTypes.bool.isRequired,
  editStageNameForm: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ view }) => ({
  createStageForm: view.createStageForm,
  editStageNameForm: view.editStageNameForm,
})

const mapDispatchToProps = dispatch => ({
  toggleCreateStageForm: () => dispatch(toggleCreateStageForm()),
  toggleEditStageForm: () => dispatch(toggleEditStageForm()),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelsForms)

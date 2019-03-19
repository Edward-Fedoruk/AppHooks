import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import { connect } from "react-redux"
import CreateStage from "../stages/CreateStage"
import EditStageName from "../stages/EditStageName"
import FormDrawer from "../FormDrawer"
import { toggleCreateStageForm, toggleEditStageForm, toggleCreateEndpointForm } from "../../actions/ui"

const ChannelsForms = ({
  toggleCreateStageForm, toggleEditStageForm, toggleCreateEndpointForm,
  createStageForm, editStageNameForm, createEndpointForm,
}) => (
  <Fragment>
    <FormDrawer open={createStageForm} toggleDialog={toggleCreateStageForm}>
      <CreateStage />
    </FormDrawer>

    <FormDrawer open={editStageNameForm} toggleDialog={toggleEditStageForm}>
      <EditStageName />
    </FormDrawer>

    <FormDrawer open={createEndpointForm} toggleDialog={toggleCreateEndpointForm}>
      <EditStageName />
    </FormDrawer>
  </Fragment>
)

ChannelsForms.propTypes = {
  toggleCreateStageForm: PropTypes.func.isRequired,
  toggleEditStageForm: PropTypes.func.isRequired,
  toggleCreateEndpointForm: PropTypes.func.isRequired,
  createStageForm: PropTypes.bool.isRequired,
  editStageNameForm: PropTypes.bool.isRequired,
  createEndpointForm: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ view }) => ({
  createStageForm: view.createStageForm,
  editStageNameForm: view.editStageNameForm,
  createEndpointForm: view.createEndpointForm,
})

const mapDispatchToProps = dispatch => ({
  toggleCreateStageForm: () => dispatch(toggleCreateStageForm()),
  toggleEditStageForm: () => dispatch(toggleEditStageForm()),
  toggleCreateEndpointForm: () => dispatch(toggleCreateEndpointForm()),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ChannelsForms)

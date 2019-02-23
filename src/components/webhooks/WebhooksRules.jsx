import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import PropTypes from "prop-types"
import RulesTable from "./RulesTable"
import withNavigation from "../withNavigation"
import TopBar from "../utils/TopBar"
import Placeholder from "../Placeholder"
import webhooks from "../../assets/webhooks.png"
import FormDrawer from "../FormDrawer"
import { fetchRules } from "../../actions/rules"
import { toggleEditForm as toggleEdit } from "../../actions/ui"
import CreateRuleForm from "./CreateRuleForm"
import EditRuleForm from "./EditRuleForm"
import MainButton from "../utils/MainButton"
import FormTitle from "../utils/FormTitle"
import { createLoadingSelector } from "../../actions/utils"
import Preloader from "../Preloader"
import SuccessSnackbar from "../utils/SuccessSnackbar"
import ErrorSnackbar from "../utils/ErrorSnackbar"
import { createErrorMessageSelector } from "../../actions/utils"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 20px 13px",
    overflowX: "hidden",

    [breakpoints.down(768)]: {
      padding: "20px 15px 5px 15px",
    },
    [breakpoints.down(600)]: {
      padding: "10px 0px 5px 0px",
    },

  },

  newRule: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: "16px",
    background: "#35C1CE",
    "&:hover": {
      opacity: ".9",
      background: "#192B81",
    },
  },

  formWrap: {
    padding: "20px 13vw",

    [breakpoints.down(768)]: {
      padding: "20px 10vw",
    },
  },
})


export class WebhooksRules extends Component {
  state = {
    open: false,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchRules: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    editRuleForm: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    successMessage: "Action was successful",
    errorMessage: "Something went wrong",
  }

  componentDidMount() {
    this.props.fetchRules()
  }

  toggleDialog = () => this.setState(({ open }) => ({ open: !open }))

  render() {
    const {
      classes, recipes, toggleEdit, editRuleForm,
      isLoading, successMessage, errorMessage,
      
    } = this.props
    const { open } = this.state

    return isLoading ? <Preloader /> : (
      <Fragment>
        <TopBar title="WebHooks Rules">
          <MainButton onClick={this.toggleDialog}>Create New Rule</MainButton>
        </TopBar>

        <SuccessSnackbar message={successMessage} />
        <ErrorSnackbar message={errorMessage} />

        <FormDrawer
          open={open}
          toggleDialog={this.toggleDialog}
        >
          <Fragment>
            <FormTitle
              title="Create WebHook Rule"
              paragraph="Create a WebHook Rule. You can create as many rules as you need."
            />
            <CreateRuleForm />
          </Fragment>
        </FormDrawer>

        <FormDrawer
          open={editRuleForm}
          toggleDialog={toggleEdit}
        >
          <Fragment>
            <FormTitle
              title="Edit WebHook Rule"
              paragraph="You can create as many rules as you need."
            />
            <EditRuleForm />
          </Fragment>
        </FormDrawer>
        <div className={classes.contentWrap}>
          {recipes.length
            ? <RulesTable data={recipes} />
            : (
              <Placeholder
                imgSrc={webhooks}
                title="Here should be WebHooks rules."
              />
            )}
        </div>
      </Fragment>
    )
  }
}

const loadingSelector = createLoadingSelector(["SET_RULES"])
const errorSelector = createErrorMessageSelector(["SET_RULES"])

const mapStateToProps = ({ rules, view, preloader, errorHandler }) => ({
  recipes: rules.recipes,
  editRuleForm: view.editRuleForm,
  isLoading: loadingSelector(preloader),
  successMessage: view.successMessage,
  errorMessage: errorSelector(errorHandler),
})

const mapDispatchToProps = {
  fetchRules,
  toggleEdit,
}

export default compose(
  withNavigation,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(WebhooksRules)

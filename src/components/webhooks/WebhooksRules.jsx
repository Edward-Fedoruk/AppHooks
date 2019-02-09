import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import PropTypes from "prop-types"
import RulesTable from "./RulesTable"
import withNavigation from "../withNavigation"
import TopBar from "../TopBar"
import Placeholder from "../Placeholder"
import webhooks from "../../assets/webhooks.png"
import FormDrawer from "../FormDrawer"
import { fetchRules } from "../../actions/rules"
import { toggleEditForm as toggleEdit } from "../../actions/ui"
import CreateRuleForm from "./CreateRuleForm"
import EditRuleForm from "./EditRuleForm"
import FormHeader from "./FormHeader"
import MainButton from "../MainButton"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 20px 13px",
    overflowX: "hidden",

    [breakpoints.down(768)]: {
      padding: "20px 15px 5px 15px",
    },
  },

  placeholder: {
    margin: "auto",
    marginTop: "170px",
    width: "545px",
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
    editRuleForm: PropTypes.func.isRequired,
  }


  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchRules()
  }

  toggleDialog = () => this.setState(({ open }) => ({ open: !open }))

  render() {
    const {
      classes, recipes, toggleEdit, editRuleForm,
    } = this.props
    const { open } = this.state
    console.log(recipes)
    return (
      <Fragment>
        <TopBar title="WebHooks Rules">
          <MainButton onClick={this.toggleDialog}>Create New Rule</MainButton>
        </TopBar>

        <FormDrawer
          open={open}
          toggleDialog={this.toggleDialog}
        >
          <div className={classes.formWrap}>
            <FormHeader
              header="Create WebHook Rule"
              subHeader="Create a WebHook Rule. You can create as many rules as you need."
            />
            <CreateRuleForm />
          </div>
        </FormDrawer>

        <FormDrawer
          open={editRuleForm}
          toggleDialog={toggleEdit}
        >
          <div className={classes.formWrap}>
            <FormHeader
              header="Edit WebHook Rule"
              subHeader="You can create as many rules as you need."
            />
            <EditRuleForm />
          </div>
        </FormDrawer>
        {console.log(this.toggleEditDialog)}
        <div className={classes.contentWrap}>
          {recipes.length
            ? <RulesTable data={recipes} />
            : (
              <Placeholder
                imgSrc={webhooks}
                title="Here should be WebHooks rules."
                className={classes.placeholder}
              />
            )}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ rules, view }) => ({
  recipes: rules.recipes,
  editRuleForm: view.editRuleForm,
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

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
import Button from "@material-ui/core/Button"
import FormDrawer from "../FormDrawer"
import { fetchRules } from "../../actions/rules"
import RuleForm from "./RuleForm"

const styles = ({ breakpoints }) => ({
  contentWrap: {
    padding: "20px 26px 20px 13px",

    [breakpoints.down(768)]: {
      padding: "20px 5px 5px 5px",
    },
  },

  placeholder: {
    margin: "auto",
    marginTop: "170px",
    width: "545px"
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
})


export class WebhooksRules extends Component {
  state = {
    open: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchRules: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired
  }

  toggleDialog = () => this.setState({ open: !this.state.open })
  
  componentDidMount() {
    this.props.fetchRules()
  }

  render() {
    const { classes, recipes } = this.props
    console.log(recipes)
    return (
      <Fragment>
        <TopBar title="WebHooks Rules">
          <Button 
            size={"large"}
            color="primary" 
            variant="text" 
            className={classes.newRule}
            onClick={this.toggleDialog}
          >
            Create New Rule
          </Button>
        </TopBar>

        <FormDrawer 
          open={this.state.open}
          toggleDialog={this.toggleDialog}
        >
          <RuleForm />
        </FormDrawer>

        <div className={classes.contentWrap}>
          {recipes.length
            ? <RulesTable data={recipes} />
            : <Placeholder 
                imgSrc={webhooks}
                title="Here should be WebHooks rules."
                button="Create the first one."
                className={classes.placeholder}
              />}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ rules }) => ({
  recipes: rules.recipes
})

const mapDispatchToProps = {
  fetchRules
}

export default compose(
  withNavigation,
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps)
)(WebhooksRules)

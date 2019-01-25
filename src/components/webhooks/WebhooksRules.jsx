import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import RulesTable from "./RulesTable"
import { withStyles } from "@material-ui/core"
import { compose } from "redux"
import withNavigation from "../withNavigation"
import TopBar from "../TopBar"
import Placeholder from "../Placeholder"
import webhooks from "../../assets/webhooks.png"
import Button from "@material-ui/core/Button"
import FormDrawer from "../FormDrawer"

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
    classes: PropTypes.object.isRequired
  }

  toggleDialog = () => this.setState({ open: !this.state.open })
  

  render() {
    const { classes } = this.props
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
          
        </FormDrawer>

        <div className={classes.contentWrap}>
          {data.length
            ? <RulesTable data={data} />
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default compose(
  withNavigation,
  withStyles(styles), 
  connect(mapStateToProps, mapDispatchToProps)
)(WebhooksRules)

import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core"

export default withStyles(() => ({
  hover: {
    "&:hover": {
      backgroundColor: "#F5F6FC !important",
    },
  },
}))(TableRow)

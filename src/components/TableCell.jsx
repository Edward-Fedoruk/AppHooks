import TableCell from "@material-ui/core/TableCell"
import { withStyles } from "@material-ui/core"

export default withStyles(({ palette }) => ({
  head: {
    color: palette.primary.main,
    fontSize: "16px",
  },
  body: {
    color: palette.primary.main,
    fontSize: "16px",
  },
  root: {
    borderBottom: "1px solid #D7DEF1",
  },
}))(TableCell)

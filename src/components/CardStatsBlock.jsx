import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"

const styles = ({ palette }) => ({
  statsBlock: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "65px",
    padding: "0 12px",
    // borderRight: "1px solid #828CB8",
  },

  category: {
    fontSize: "14px",
    fontWeight: "normal",
    color: palette.primary.main,
    textAlign: "center",
  },

  categoryCount: {
    fontSize: "20px",
    fontWeight: "normal",
    color: palette.primary.main,
    textAlign: "center",
  },

  divider: {
    width: "1px",
    backgroundColor: "#D7DEF1",
  },
})

const CardStatsBlock = ({
  classes, name, amount,
  leftDivider, RightDivider, className,
}) => (
  <Fragment>
    {leftDivider && <div className={classes.divider} />}

    <div className={classNames(classes.statsBlock, className)}>
      <div>
        <Typography variant="body1" className={classes.categoryCount}>{ amount }</Typography>
        <Typography variant="caption" className={classes.category}>{ name }</Typography>
      </div>
    </div>

    {RightDivider && <div className={classes.divider} />}
  </Fragment>
)


CardStatsBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  amount: PropTypes.string,
  leftDivider: PropTypes.bool,
  RightDivider: PropTypes.bool,
  className: PropTypes.string,
}

CardStatsBlock.defaultProps = {
  amount: 0,
  leftDivider: false,
  RightDivider: true,
  className: "",
}

export default withStyles(styles)(CardStatsBlock)

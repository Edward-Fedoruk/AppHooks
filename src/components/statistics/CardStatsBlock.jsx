import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"

const styles = ({ palette, breakpoints }) => ({
  statsBlock: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "65px",
    padding: "0 12px",
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

  dividerMobile: { [breakpoints.down(600)]: { display: "none" } },

  categoryCountMobile: { [breakpoints.down(600)]: { fontSize: "12px" } },

  categoryMobile: { [breakpoints.down(600)]: { fontSize: "12px" } },

  statsBlockWrapMobile: {
    [breakpoints.down(600)]: { 
      display: "flex",
      flexDirection: "row-reverse",
    },
  },

  statsBlockMobile: {
    [breakpoints.down(600)]: { 
      justifyContent: "flex-start",
      padding: "0",
      height: "30px",
      width: "100%",
    },
  },

})

const CardStatsBlock = ({
  classes, name, amount, enableMobile,
  leftDivider, RightDivider,
}) => {
  const dividerClass = classNames(classes.divider, {[classes.dividerMobile]: enableMobile})
  const statsBlockClass = classNames(classes.statsBlock, {[classes.statsBlockMobile]: enableMobile})
  const categoryCountClass = classNames(classes.categoryCount, {[classes.categoryCountMobile]: enableMobile})
  const categoryClass = classNames(classes.category, {[classes.categoryMobile]: enableMobile})

  return (
    <Fragment>
      {leftDivider && <div className={dividerClass} />}

      <div className={statsBlockClass}>
        <div className={enableMobile ? classes.statsBlockWrapMobile : ""}>
          <Typography variant="body1" className={categoryCountClass}>{ amount }</Typography>
          <Typography variant="caption" className={categoryClass}>{ name } </Typography>
        </div>
      </div>

      {RightDivider && <div className={dividerClass} />}
    </Fragment>
  )
}

CardStatsBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  leftDivider: PropTypes.bool,
  RightDivider: PropTypes.bool,
  enableMobile: PropTypes.bool,
}

CardStatsBlock.defaultProps = {
  amount: 0,
  name: "",
  leftDivider: false,
  RightDivider: true,
  enableMobile: true,
  className: "",
}

export default withStyles(styles)(CardStatsBlock)

import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core"
import classNames from "classnames"
import Typography from "@material-ui/core/Typography"

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

  deliverPercent: {
    fontSize: "25px",
    fontWeight: "300",
    textAlign: "center",
    width: "100%",
    lineHeight: ".9",
    color: palette.primary.main,
  },

  caption: {
    fontSize: "12px",
    fontWeight: "300",
    color: palette.primary.main,
  },

  deliverWrap: {
    // borderLeft: "1px solid #828CB8",
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

  stats: {
    display: "flex",
    justifyContent: "space-between",
  },

  divider: {
    width: "1px",
    backgroundColor: "#D7DEF1",
  }

})

const EndpointInfoBlock = ({ classes, statistics }) => (
  <div className={classes.stats}>
    <div className={classes.divider} />

    <div className={classNames(classes.statsBlock, classes.deliverWrap)}>
      <div>
        <Typography variant="body1" className={classes.deliverPercent}>{ statistics.deliverability }</Typography>
        <Typography variant="caption" className={classes.caption}>Deliverability</Typography>
      </div>
    </div>

    <div className={classes.divider} />

    <div className={classes.statsBlock}>
      <div>
        <Typography variant="body1" className={classes.categoryCount}>{ statistics.successful }</Typography>
        <Typography variant="caption" className={classes.category}>Successful Requests</Typography>
      </div>
    </div>

    <div className={classes.divider} />

    <div className={classes.statsBlock}>
      <div>
        <Typography variant="body1" className={classes.categoryCount}>{ statistics.failed }</Typography>
        <Typography variant="caption" className={classes.category}>Failed Requests</Typography>
      </div>
    </div>

    <div className={classes.divider} />

    <div className={classes.statsBlock}>
      <div>
        <Typography variant="body1" className={classes.categoryCount}>{ statistics.queued }</Typography>
        <Typography variant="caption" className={classes.category}>Queued Requests</Typography>
      </div>
    </div>

    <div className={classes.divider} />

    <div className={classes.statsBlock}>
      <div>
        <Typography variant="body1" className={classes.categoryCount}>{ statistics.pending }</Typography>
        <Typography variant="caption" className={classes.category}>Pending</Typography>
      </div>
    </div>

    <div className={classes.divider} />

    <div className={classes.statsBlock}>
      <div>
        <Typography variant="body1" className={classes.categoryCount}>{ statistics.filtered }</Typography>
        <Typography variant="caption" className={classes.category}>Filtered</Typography>
      </div>
    </div>

    <div className={classes.divider} />
  </div>
)

EndpointInfoBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  statistics: PropTypes.object.isRequired,
}

export default withStyles(styles)(EndpointInfoBlock)

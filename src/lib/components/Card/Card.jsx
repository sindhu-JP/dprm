import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
// import { Trans } from "@lingui/macro";

import { Grid, Paper, Typography, withStyles } from "@material-ui/core";

import SvgIcon from "lib/components/SvgIcon";
import { COLORS } from "lib/constants";

const styles = (theme) => ({
  root: {
    width: "auto",
    height: "auto",
    minHeight: 260,
    background: `${theme.palette.common.white} 0% 0% no-repeat padding-box`,
    opacity: 1,
    display: "flex",
    boxShadow: "none",
  },
  heading: {
    marginBottom: 22,
  },
  headerIcon: {
    marginRight: 15,
  },
  centerCardClass: {
    margin: "24px 0px 0px 0px",
  },
  cornerCardClass: {
    margin: "24px 24px 0px 24px",
  },
  title: {
    color: theme.palette.text.primary,
  },
  idTitle: {
    color: theme.palette.primary.main,
  },
  sideIcon: {
    marginLeft: 10,
  },
  widgetIcon: {
    "& svg path": {
      stroke: theme.palette.common.lightSilver,
    },
  },
  interactionHeader: {
    marginLeft: theme.spacing(20),
  },
});

const Card = (props) => {
  const {
    classes,
    customClasses = {},
    noTitle,
    caption,
    disableExternalIcon,
  } = props;
  const { data, id, isCenter = false, idKey = "ID", widgetsIcon } = props;
  return (
    <div>
      {data.map((obj, index) => {
        const { enableCardTitle = true } = obj;
        return (
          <Paper
            className={classNames(classes.root, customClasses.customCard)}
            key={index}
          >
            <Grid container direction="column">
              {noTitle || !enableCardTitle ? null : (
                <Grid item classes={{ root: classes.heading }}>
                  <Grid container direction="row" alignItems="center">
                    {obj.icon ? (
                      <Grid item xs={4} sm={2} md={2}>
                        <SvgIcon
                          iconColor={COLORS.textSecondary}
                          iconWidth={30}
                          iconName={obj.icon}
                          className={classes.headerIcon}
                        />
                      </Grid>
                    ) : null}
                    <Grid item>
                      <Grid container direction="column">
                        <Grid item xs sm md zeroMinWidth>
                          <Typography
                            variant={obj.titleVariant ? obj.titleVariant : "h6"}
                            display="initial"
                            className={classes.title}
                            noWrap
                          >
                            {obj.title}
                          </Typography>
                          {id && (
                            <Typography
                              variant="body1"
                              className={classes.idTitle}
                            >
                              {idKey} : {id}
                            </Typography>
                          )}
                          {caption && (
                            <Grid item>
                              <Typography variant="body1">{caption}</Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    {!disableExternalIcon ? (
                      <Grid
                        item
                        xs={8}
                        sm={4}
                        md={2}
                        className={
                          props.interactionHistory
                            ? classes.interactionHeader
                            : ""
                        }
                      >
                        <Grid container direction="row" justify="flex-end">
                          <Grid item className={classes.sideIcon}>
                            <SvgIcon
                              iconName={obj.expandIcon}
                              iconWidth={14}
                              iconColor={COLORS.textPrimary}
                            />
                          </Grid>
                          <Grid item className={classes.sideIcon}>
                            <SvgIcon
                              iconName={obj.filterIcon}
                              iconWidth={14}
                              iconColor={COLORS.textPrimary}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              )}
              {props.children}
            </Grid>
            {widgetsIcon && (
              <Grid item>
                <SvgIcon
                  iconWidth={23}
                  iconName={widgetsIcon}
                  className={classes.widgetIcon}
                />
              </Grid>
            )}
          </Paper>
        );
      })}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  id: PropTypes.any,
  isCenter: PropTypes.bool,
  rootClassName: PropTypes.string,
  caption: PropTypes.node,
};

Card.defaultProps = {
  children: null,
  data: [],
  id: null,
  isCenter: false,
  rootClassName: "",
  caption: false,
};

export default withStyles(styles)(Card);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import _ from 'lodash';
// import QontoConnector from './QontoConnector';

export const STATUS_COLOR_VALUES = (theme, value, restStyle = {}) => {
  return {
    idle: {
      [value]: theme.palette.secondary.main,
      ...restStyle
    },
    open: {
      [value]: theme.palette.secondary.main,
      ...restStyle
    },
    created: {
      [value]: theme.palette.secondary.main,
      ...restStyle
    },
    inProgress: {
      [value]: theme.palette.warning.main,
      ...restStyle
    },
    partial: {
      [value]: theme.palette.warning.main,
      ...restStyle
    },
    captured: {
      [value]: theme.palette.warning.main,
      ...restStyle
    },
    active: {
      [value]: theme.palette.success.main,
      ...restStyle
    },
    pending: {
      [value]: theme.palette.warning.main,
      ...restStyle
    },
    draft: {
      [value]: theme.palette.text.secondary,
      ...restStyle
    },
    cancelled: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    held: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    failed: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    suspended: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    softSuspended: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    rejected: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    inactive: {
      [value]: theme.palette.error.main,
      ...restStyle
    },
    completed: {
      [value]: theme.palette.success.main,
      ...restStyle
    },
    resolved: {
      [value]: theme.palette.success.main,
      ...restStyle
    },
    fulfilled: {
      [value]: theme.palette.success.main,
      ...restStyle
    },
    uploaded: {
      [value]: theme.palette.success.main,
      ...restStyle
    },
    acknowledged: {
      [value]: theme.palette.success.main,
      ...restStyle
    },
    initialized: {
      [value]: theme.palette.common.manhattan,
      ...restStyle
    },

    OPPORTUNITY_CREATION: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    MANUAL_FEASIBLE_CHECK: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    MANUAL_FEASIBILITY: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    WAREHOUSE_APPROVAL: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    APPROVAL: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    QUOTE_GENERATE: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    SHARE: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    ONBOARDING: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    QUOTE_EXPIRED: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    LEAD_DROPPED: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    FEASIBILITY_FAILED: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    REJECTED_FROM_WAREHOUSE: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    APPROVED_FROM_WAREHOUSE: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white
    },
    CUSTOMER_ACCEPTANCE: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },

    QUOTE_REJECTED: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    leadApproval: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    reject: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    QUOTE_APPROVAL: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    LEAD_APPROVAL: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    PRODUCT_CONFIGURATION: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    ONBOARDED: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white
    },
    CUSTOMER_REJECTED: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    CREATED: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white
    },
    LEAD_GENERATION: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    CONTRACT_SIGN_OFF: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    CREATE_CONTRACT: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    SERVICE_ADDED: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white
    },
    REVISE_CONTRACT: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    LEAD_RE_OPEN: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    CHANGE_PLAN: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    ADD_SERVICE: {
      backgroundColor: theme.palette.common.gold,
      color: theme.palette.common.white
    },
    CONTRACT_EXPIRED: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    },
    DROP_OPPORTUNITY: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white
    }
  };
};

const QontoStepIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.main,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1
  },
  circle: {
    width: 8,
    height: 8,
    marginLeft: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  iconClass: {
    margin: 'auto',
    marginTop: 7,
    display: 'block'
  },
  iconShape: {
    width: 40,
    height: 40,
    background: theme.palette.background.light,
    color: theme.palette.text.secondary,
    borderRadius: 30,
    marginLeft: -7
  },
  ...STATUS_COLOR_VALUES(theme, 'color')
}))((props) => {
  const { status, classes, iconName, dotClass } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes[status]]: true
      })}
    >
      {iconName && status !== 'IDLE' ? (
        <div className={classes.iconShape}>
          {/* <SvgIcon
            className={classes.iconClass}
            iconName={iconName}
            iconColor="#999999"
          /> */}
        </div>
      ) : (
        <div className={`${classes.circle} ${dotClass}`} />
      )}
    </div>
  );
});

/**
 * Render the pills based on status
 * @param {*} props
 */
const ContentEle = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    fontSize: 11,
    height: 22,
    alignItems: 'center'
  },
  subText: {
    marginLeft: 5,
    color: theme.palette.common.lightSilver,
    fontSize: 11,
    verticalAlign: 'super'
  },
  idleText: {
    marginLeft: 5,
    color: theme.palette.primary.main
  },
  ...STATUS_COLOR_VALUES(theme, 'background', { 'margin-top': '-16px' })
}))((props) => {
  const {
    status,
    title,
    annotation,
    classes,
    isLast,
    disableStatusChip,
    timeClassName,
    dateClassName
  } = props;
  return (
    <div>
      {status === 'IDLE' || disableStatusChip ? null : (
        <Chip
          className={clsx(classes.root, {
            [classes[status]]: true
          })}
          label={_.toUpper(status)}
        />
      )}
      <Typography
        className={`${status === 'IDLE' ? classes.idleText : classes.subText} ${
          status === 'IDLE' ? dateClassName : timeClassName
        }`}
        variant="subtitle1"
      >
        {title}
      </Typography>
      {annotation && annotation(props, isLast)}
    </div>
  );
});

const Timelines = withStyles((theme) => ({
  pillClass: {
    alignItems: 'flex-start'
  },
  stepperRoot: {
    padding: '24px 0px'
  },
  idleClass: {
    margin: '-12px 0px'
  },
  rootClass: {
    width: '100%'
  }
}))(
  ({
    steps = [],
    activeStep = 0,
    classes,
    iconName = null,
    disableStatusChip = false,
    timeClassName = '',
    dateClassName = '',
    dotClass = '',
    connector = null,
    handleActiveInteractionItemCount
  }) => {
    const lastIndex = steps.length - 1;

    useEffect(() => {
      handleActiveInteractionItemCount &&
        handleActiveInteractionItemCount({
          activeStep
        });
    }, [activeStep]);

    return (
      <div className={classes.rootClass}>
        <Stepper
          className={classes.stepperRoot}
          activeStep={activeStep}
          orientation="vertical"
          // connector={connector || <QontoConnector />}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                className={
                  step.status === 'IDLE' ? classes.idleClass : classes.pillClass
                }
                StepIconComponent={(props) => {
                  return (
                    <QontoStepIcon
                      {...step}
                      iconName={iconName}
                      dotClass={dotClass}
                    />
                  );
                }}
              >
                <ContentEle
                  {...step}
                  isLast={lastIndex === index}
                  disableStatusChip={disableStatusChip}
                  timeClassName={timeClassName}
                  dateClassName={dateClassName}
                />
              </StepLabel>
            </Step>
          ))}
          {steps.length === 0 ? (
            <Typography variant="body1">
              <Trans id="No information available"></Trans>
            </Typography>
          ) : null}
        </Stepper>
      </div>
    );
  }
);

Timelines.propTypes = {
  activeStep: PropTypes.number,
  classes: PropTypes.any,
  connector: PropTypes.any,
  dateClassName: PropTypes.string,
  disableStatusChip: PropTypes.bool,
  dotClass: PropTypes.string,
  iconName: PropTypes.any,
  steps: PropTypes.array,
  timeClassName: PropTypes.string
};

Timelines.defaultProps = {
  activeStep: 0,
  classes: {},
  connector: null,
  dateClassName: '',
  disableStatusChip: false,
  dotClass: '',
  iconName: null,
  steps: [],
  timeClassName: ''
};

export default Timelines;

// import React from 'react'
// import PropTypes from 'prop-types'
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import { makeStyles } from '@material-ui/core/styles';

// const CustomAlert = (props) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />
// }

// const Alert = ({message, open, onClose, type}) => {
//   return (
//     <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={onClose}>
//       <CustomAlert onClose={onClose} severity={type}>
//         {message}
//       </CustomAlert>
//     </Snackbar>
//   )
// }

// Alert.propTypes = {
//   message: PropTypes.string,
//   open: PropTypes.bool,
//   onClose: PropTypes.func,
//   type: PropTypes.string
// }

// export default Alert

import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Trans } from '@lingui/react';
import _isEmpty from 'lodash/isEmpty';
const CustomAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const styles1 = (theme) => ({
  success: {
    borderBottom: `solid 5px ${theme.palette.success.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.success.main
    }
  },
  error: {
    borderBottom: `solid 5px ${theme.palette.error.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.error.main
    }
  },
  info: {
    borderBottom: `solid 5px ${theme.palette.info.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.info.main
    }
  },
  warning: {
    borderBottom: `solid 5px ${theme.palette.warning.main}`,
    '& #client-snackbar svg': {
      color: theme.palette.warning.main
    }
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.common.black,
    overflowY: 'auto',
    maxHeight: '200px'
  },
  closeIcon: {
    fontSize: 12,
    color: theme.palette.common.black
  }
});
const MySnackbarContent = (props) => {
  const {
    classes,
    className,
    message,
    onClose,
    variant,
    handleReasonDisplay,
    isReasonVisible,
    reason,
    ...other
  } = props;
  const Icon = variantIcon['success'];
  // const Icon = variantIcon[variant?.toLowerCase()];
  const isFailure = false;
  // const isFailure = variant.toLowerCase() !== 'success';

  const showDetails = isFailure && !_isEmpty(reason);

  return (
    <SnackbarContent
      className={classNames(classes[variant.toLowerCase()], className)}
      aria-describedby="client-snackbar"
      message={
        <>
          {(reason || message) && (
            <Typography
              variant="subtitle2"
              id="client-snackbar"
              className={classes.message}
              gutterBottom={showDetails}
            >
              <>
                <Icon
                  className={classNames(classes?.icon, classes?.iconVariant)}
                />
                {reason || message}
              </>
            </Typography>
          )}

          {reason && message && showDetails && (
            <>
              <Typography variant="subtitle2">
                <Link href="#" onClick={handleReasonDisplay}>
                  {isReasonVisible ? (
                    <Trans id="Hide Details"></Trans>
                  ) : (
                    <Trans id="Show Details"></Trans>
                  )}
                </Link>
              </Typography>
              {isReasonVisible && (
                <Typography variant="subtitle2" className={classes.message}>
                  {message}
                </Typography>
              )}
            </>
          )}
        </>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

MySnackbarContent.defaultProps = {
  className: '',
  message: {},
  onClose: () => ({})
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
const Alert = ({ message, open, onClose, type }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <MySnackbarContentWrapper
        onClose={onClose}
        variant={type}
        message={message}
      />
    </Snackbar>
  );
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

Alert.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
  classes: {}
};

export default Alert;

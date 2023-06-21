import React from 'react';
import { Grid, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  button: {
    boxShadow: 'none',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      backgroundColor: theme.palette.success.light
    },
    minHeight: theme.spacing(10)
  }
}));
const Footer = ({
  onSave,
  info,
  onMainAction,
  primaryText,
  secondaryText,
  disabled,
  isSubmitting
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center" justify="space-between">
      <Grid item xs={6}>
        {info}
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={4}>
          <Grid item>
            <Button
              size="large"
              variant="text"
              color="primary"
              onClick={onSave}
            >
              {secondaryText}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              endIcon={!isSubmitting ? <ArrowForward /> : null}
              className={classes.button}
              onClick={onMainAction}
              disabled={disabled}
              type="submit"
            >
              {isSubmitting ? (
                <CircularProgress size={25} style={{ color: 'white' }} />
              ) : (
                primaryText
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Footer.defaultProps = {
  info: null,
  loading: false,
  primaryText: 'Proceed',
  secondaryText: 'Save & Exit',
  onSave: () => {},
  onNext: () => {}
};

Footer.propTypes = {};

export default Footer;

import React from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Box,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { connect } from 'react-redux';
import LeadController from 'Controllers/Lead';
import { useStateful, useBoolean } from 'react-hanger';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  container: {
    height: ({ heightvalue }) => (heightvalue ? heightvalue : '85vh'),
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.main,
    marginBottom:'2rem'
  },
  header: {
    backgroundColor: theme.palette.primary.bottomHeader,
    '& .MuiIconButton-root': {
      '& .MuiIconButton-label': {
        color: theme.palette.primary.primaryMainContrast
      }
    }
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.primaryMainContrast
  }
}));
const Buttonsheet = (props) => {
  const { heightvalue } = props;
  const [info, setInfo] = React.useState({});
  const [leadLevelSla, setleadLevelSla] = React.useState({});
  const [oppLevelSla, setoppLevelSla] = React.useState({});
  const alert = useStateful({ message: '', type: 'success' });
  const classes = useStyles({ heightvalue });
  const alertOpen = useBoolean(false);
  const leadsubOpp = useStateful({});
  const Details = useStateful({});
  const Editproducts = useBoolean(false);
  const steppers = useStateful([]);
  const [isvalidStatus, setisvalidStatus] = React.useState('');

  return (
    <Drawer anchor={'bottom'} open={props.open} onClose={props.onClose}>
      <Box className={classes.container}>
        <Box px={5} className={classes.header}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                {props.header ? props.header : 'View Details'}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Close" placeholder="bottom">
                <IconButton onClick={props.onClose}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box px={10} py={5}>
          <Box>{props.children}</Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default connect(
  (state) => ({
    leadsState: state.leads
  }),
  {
    GetSlaTiming: LeadController.SlaTiming
  }
)(Buttonsheet);

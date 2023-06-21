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

// import ServiceOfIntrest from './ServiceOfIntrest';
// import ReffrelInformation from './ReffrelInformation';
import LeadInformation from './LeadInformation';
// import QuoteDetails from './QuoteDetails';
// import InstallationAddress from './InstallationAddress';
// import ReasonCard from './ReasonCard';

import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import PartnerDetails from './PartnerDetails';

const LeadDetails = (props) => {
  const [info, setInfo] = React.useState({});
  const [leadLevelSla, setleadLevelSla] = React.useState({});
  const [oppLevelSla, setoppLevelSla] = React.useState({});
  const alert = useStateful({ message: '', type: 'success' });
  const classes = useStyles();
  const alertOpen = useBoolean(false);
  const leadsubOpp = useStateful({});
  const Details = useStateful({});
  const Editproducts = useBoolean(false);
  const steppers = useStateful([]);
  const [isvalidStatus, setisvalidStatus] = React.useState('');


  console.log(props, "axaaass")

  return (
    <Drawer anchor={'bottom'} open={props.open} onClose={props.onClose}>
      <Box className={classes.container}>
        <Box px={5} className={classes.header}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                View Details
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
          <Box>
            <Grid container direction="column" spacing={6}>
              <Grid item>
                {props.context &&
                props.context?.partnerDetails &&
                props.context.type !== 'SELFCARE_PARNTER' ? (
                  <LeadInformation
                    partnerDetails={props.context?.partnerDetails || {}}
                    columns={props.context?.columns || {}}
                    onClose={props.onClose}
                    agentData={props.context || ""}
                  />
                ) : (
                  ''
                )}
              </Grid>
              {props?.context?.partnerDetails && (
                <>
                  {props?.context?.sections?.map((item) => {
                    return (
                      <Grid item>
                        <PartnerDetails
                          title={item}
                          partnerDetails={props.context?.partnerDetails || {}}
                          
                        />
                      </Grid>
                    );
                  })}
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  container: {
    height: '95vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.main
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

// export default LeadDetails;

export default connect(
  (state) => ({
    leadsState: state.leads
  }),
  {
    GetSlaTiming: LeadController.SlaTiming
  }
)(LeadDetails);

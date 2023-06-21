import React from 'react';

import {
  Grid,
  Paper,
  IconButton,
  Typography,
  Box,
  makeStyles,
  Button
} from '@material-ui/core';
import { useStateful, useBoolean } from 'react-hanger';

import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';

import Header from './Header';
import { history } from 'Store';
import PartnerDetails from 'Features/LeadDetails/PartnerDetails';
import { Trans } from '@lingui/react';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '95vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.main,
    margin: 'auto',
    width: '85vw'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto'
  },
  button: {
    background: 'white'
  }
}));
const LeadOverviewOppertunity = (props) => {
  const [info, setInfo] = React.useState([{}]);
  const alert = useStateful({ message: '', type: 'success' });
  const classes = useStyles();
  const alertOpen = useBoolean(false);
  const subexisitinglead = useStateful({});

  React.useEffect(() => {
    if (props.existingOpp) {
      setInfo([props.leadInfo]);
      subexisitinglead.setValue(props.existingOpp);
    }
  }, [props.existingOpp]);

  const { existingOpp, checklob } = props;
  const handleroute = () => {
    props.onClose();
    history.push({
      pathname: '/digital-prm-web-ui/hierarchy',
      state: {
        partnerId:
          props.dataSource.PartnerProfileCreation.PartnerDetails.Partner_ID,
        stepper: false
      }
    });
  };
  return (
    <Drawer anchor={'bottom'} open={props.open} onClose={props.onClose}>
      <Box px={15} className={classes.container}>
        <Grid container direction="column">
          <Grid item style={{ padding: '18px 0px 22px 0px' }}>
            <Grid container direction="column" spacing={4}>
              <Grid
                item
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Paper elevation={0}>
                  <Typography variant="h4" style={{ color: '#FF034A' }}>
                    A Parnter with specified details already exist
                  </Typography>
                </Paper>
                <IconButton onClick={props.onClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={4}>
                    <Grid item style={{ paddingBottom: 15 }}>
                      <Header
                        onClose={props.onClose}
                        partnerData={props.dataSource.PartnerProfileCreation}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ display: 'flex' }}>
                  <Grid item className={classes.paper}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={handleroute}
                    >
                      <Trans id="Manage Hierarchy"></Trans>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={6}>
          {props.dataSource.PartnerProfileCreation && (
            <>
              {props.dataSource.PartnerProfileCreation?.sections.map((item) => {
                return (
                  <Grid item>
                    <PartnerDetails
                      title={item}
                      partnerDetails={props.dataSource.PartnerProfileCreation}
                    />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default LeadOverviewOppertunity;

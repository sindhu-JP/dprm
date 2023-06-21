import React from 'react';

import { Grid, Box, makeStyles } from '@material-ui/core';
import { useStateful, useBoolean } from 'react-hanger';

import Drawer from '@material-ui/core/Drawer';

import CustomerHeader from './CustomerHeader';
import LeadInformation from '../LeadDetails/LeadInformation';
import CompanyAddres from '../LeadDetails/CompanyAddres';
import PrimaryContact from '../LeadDetails/PrimaryContact';
import CompanyDetails from '../LeadDetails/CompanyDetails';
import ServiceDetails from './ServiceDetails';
import Attachments from '../LeadDetails/Attachments';
// import QuoteDetails from '../LeadDetails/QuoteDetails';
import ContractDetails from '../LeadDetails/ContractDetails';
import LeadsAPI from 'Http/api/leads';
import _ from 'lodash';
import UserDetails from './UserDetails';

const CustomerOverview = (props) => {
  const [info, setInfo] = React.useState([{}]);
  const alert = useStateful({ message: '', type: 'success' });
  const classes = useStyles();
  const alertOpen = useBoolean(false);
  const subexisitinglead = useStateful({});
  const Details = useStateful({});
  const list = useStateful({});

  React.useEffect(() => {
    if (props.existingOpp || props.lead) {
      setInfo(props.lead);
      subexisitinglead.setValue(props.existingOpp);
      getDetails();
      getFullList(existingOpp?.partyInteractionId);
    }
  }, [props.existingOpp]);

  const getDetails = async () => {
    const res = await LeadsAPI.GetcontractDetails({
      qouteId: existingOpp?.quoteRef?.id
    }).catch((err) => {});
    Details.setValue(_.get(res, '[0]', ''));
  };
  const getFullList = async (partyid) => {
    const res = await LeadsAPI.getSRResonsebyId(partyid).catch((err) => {});
    list.setValue(_.get(res, '[0]', ''));
  };

  const { existingOpp, checklob } = props;

  return (
    <Drawer anchor={'bottom'} open={true} onClose={props.onClose}>
      <Box px={15} className={classes.container}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Grid container direction="row" justify="space-between">
              <Grid item xs={12}>
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <CustomerHeader
                      existingOpp={subexisitinglead.value}
                      user={props.user}
                      opportunityStatus={props.opportunity?.OpportunityStatus}
                      onClose={props.onClose}
                      checklob={checklob}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box>
          <Grid container direction="column" spacing={6}>
            <React.Fragment>
              <Grid item>
                <LeadInformation
                  values={info}
                  onAction={props.onAction}
                  leadInfo={props.leadInfo}
                  // alert={(data) => {
                  //   alert.setValue(data);
                  //   alertOpen.setTrue();
                  // }}
                  onClose={props.onClose}
                  user={props.user}
                  SubOpportunity={props.existingOpp}
                  // oppLevelSla={oppLevelSla}
                  // leadLevelSla={leadLevelSla}
                />
              </Grid>
              <Grid item>
                <CompanyDetails values={info.companyDetails || []} />
              </Grid>
              <Grid item>
                <CompanyAddres values={info.companyAddress} />
              </Grid>
              <Grid item>
                <PrimaryContact values={info.primaryContactDetails || []} />
              </Grid>
              {existingOpp?.quoteRef && (
                <Grid item>
                  <ServiceDetails
                    values={existingOpp?.quoteRef}
                    data={existingOpp}
                  />
                </Grid>
              )}
              {/* {existingOpp?.quoteRef && (
                <Grid item>
                  <QuoteDetails values={existingOpp?.quoteRef} />
                </Grid>
              )} */}
              {existingOpp?.contract && (
                <Grid item>
                  <ContractDetails
                    values={existingOpp?.contract}
                    products={existingOpp || []}
                    Contract={Details.value}
                  />
                </Grid>
              )}
              <Grid item>
                <Attachments attachList={info.attachment || []} />
              </Grid>
              <Grid item>
                <UserDetails values={info.channel || []} />
              </Grid>
            </React.Fragment>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

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
  }
}));

export default CustomerOverview;

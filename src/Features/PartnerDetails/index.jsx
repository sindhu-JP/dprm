import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import PartnerDetails from './PartnerDetails';
import CompanyAddress from './CompanyAddress';
import BillingDetails from './BillingDetails';
import PrimaryContactDetails from './PrimaryContactDetails';
// import AdditionalContact from './AdditionalContact';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '2rem',
    paddingLeft: '2rem'
  },
  heading: {
    fontSize: '15px',
    fontWeight: 600
  },
  aa: {
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }
}));
const PartnerViewDetails = (props) => {
  const classes = useStyles();
  return (
    <div>
      <PartnerDetails details={props.partnerData.PartnerDetails} />
      <Grid item className={classes.aa}>
        <CompanyAddress companyData={props.partnerData.CompanyAddress} />
      </Grid>
      <Grid item className={classes.aa}>
        <BillingDetails billingData={props.partnerData.BillingDetails} />
      </Grid>
      <Grid item className={classes.aa}>
        <PrimaryContactDetails
          primaryContactDetails={props.partnerData.PrimaryContactDetails}
        />
      </Grid>
      <Grid item className={classes.aa}>
        {/* <AdditionalContact
          primaryContactDetails={props.partnerData.PrimaryContactDetails}
        /> */}
      </Grid>
    </div>
  );
};

export default PartnerViewDetails;

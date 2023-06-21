import React from 'react';
import { Grid, makeStyles, Typography, Chip, Box } from '@material-ui/core';
import Chicklet360 from './Chicklet360';
// import FollowUp from './FollowUp';
// import AddOpportunity from './AddOpportunity';
// import QuoteManage from './QuoteManage';
// import ServiceOfIntrest from './ServiceOfIntrest';
// import InteractionHistory from './InteractionHistory';
// import RecommendOffer from './RecommendOffer';
import { connect } from 'react-redux';

const LeadOverView = (props) => {
  return (
    <Box px={8} py={3}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Grid container direction="row" spacing={6}>
            <Grid item xs={8}>
              <Grid container direction="row" spacing={6}>
                <Grid item xs={12}>
                  <Chicklet360 customerInfo={props.customerInfo} />
                </Grid>
                <Grid item xs={12}>
                  {/* <ServiceOfIntrest value={props.customerInfo} /> */}
                  {/* <Grid container direction="row" spacing={6}>
                    <Grid item xs={6}>
                      <AddOpportunity />
                    </Grid>
                    <Grid item xs={6}>
                      <QuoteManage customerInfo={props.customerInfo} quoteDetails={props.quoteDetails} />
                    </Grid>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {/* <FollowUp
                user={props.authState}
                customerInfo={props.customerInfo}
              /> */}
            </Grid>
          </Grid>

          {/*  */}
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" spacing={6}>
            <Grid item xs={8}>
              <Grid container direction="row" spacing={6}>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    spacing={6}
                    justify="space-between"
                  >
                    <Grid item xs={6}>
                      {/* <AddOpportunity
                        customerInfo={props.customerInfo}
                        Duplicatechecklead={props.Duplicatechecklead}
                        loading={props.loading}
                      /> */}
                    </Grid>
                    <Grid item xs={6}>
                      {/* <QuoteManage
                        customerInfo={props.customerInfo}
                        quoteDetails={props.quoteDetails}
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {/* <RecommendOffer /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {/* <InteractionHistory /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default connect(
  (state) => ({
    authState: state.auth.user.sub
  }),
  {}
)(LeadOverView);

{
  /* <Grid container direction="column" spacing={4}>
<Grid item xs={12}>
  <Grid container direction="row" spacing={4}>
    <Grid item xs={8} md={8} sm={8} lg={8}>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <Chicklet360 customerInfo={props.customerInfo} />
        </Grid>
        <Grid item xs={12}>
          <ServiceOfIntrest />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={4}>
      <FollowUp user={props.authState} />
    </Grid>
  </Grid>
</Grid>

<Grid item xs={12}>
  <Grid container direction="row" spacing={4} >
    <Grid item xs={8}>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={6}>
          <AddOpportunity />
        </Grid>
        <Grid item xs={6}>
          <QuoteManage customerInfo={props.customerInfo} />
        </Grid>

        <Grid item xs={12}>
          <RecommendOffer />
        </Grid>
      </Grid>
    </Grid>
    <Grid xs={4}><InteractionHistory /></Grid>
  </Grid>
</Grid>

</Grid> */
}

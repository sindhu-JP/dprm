import React from 'react';

import { useStateful } from 'react-hanger';
import { Grid, Paper, Typography} from '@material-ui/core';

import SubscriptionCard from './SubscripionCard';
import VasHistory from './History';
import SvgIconcomp from 'Assets/Icons/company_1716823.svg';

const Selectsubscription = ({
  control,
  details,

  data,
  unselectproduct,
  selectProduct,
  customerDetails,
  plan
}) => {
  const selectedLobs = useStateful({});
  //   const lobSelection = useWatch({ control, name: "lob" })
  return (
    <Grid container direction="column" spacing={10}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Grid container alignItems="center" justify="space-between">
            <Grid itemxs={4}>
              <Grid container alignItems="center" spacing={4}>
                <Grid item>
                  <img src={SvgIconcomp} />
                </Grid>
                <Grid item>
                  <Typography variant="h2">
                    {`${details.companyName} - ${details.registrationNumber}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="row" spacing={5}>
          <Grid item xs={8}>
            <SubscriptionCard
              productIdentifier={data}
              unselectproduct={unselectproduct}
              selectProduct={selectProduct}
              plan={plan}
            />
          </Grid>
          <Grid item xs={4}>
            <VasHistory
              productIdentifier={data}
              customerDetails={customerDetails}
              plan={plan}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Selectsubscription.defaultProps = {
  feasibilityCheckRequired: false
};

export default Selectsubscription;

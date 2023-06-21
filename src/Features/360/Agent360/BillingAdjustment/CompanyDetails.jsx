import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import SvgIconcomp from 'Assets/Icons/company_1716823.svg';
export default function CompanyDetails({ details }) {
  return (
    <div>
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
                    {_.get(details.mainlist, 'partnerName', '')} -{' '}
                    {_.get(details.mainlist, 'partnerId', '')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

import { Grid } from '@material-ui/core';
import React from 'react';
import CompanyDetails from './CompanyDetails';
import InvoiceSelections from './InvoiceSelections';

export default function BillingAdjustmentview({ InvoiceDetails, context }) {
  return (
    <div>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <CompanyDetails details={context?.partner} />
        </Grid>
        <Grid item>
          <InvoiceSelections
            InvoiceDetails={InvoiceDetails}
            details={context?.partner}
          />
        </Grid>
      </Grid>
    </div>
  );
}

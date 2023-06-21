import { Grid } from '@material-ui/core';
import React from 'react';
import Adjustment from './Adjustment';
import CompanyDetails from './CompanyDetails';
import InvoiceCurd from './InvoiceCurd';

export default function InvoiceAdjustmentView({
  context,
  reasonDetails,
  adjustmentdetails,
  ChargeItemdetails,
  AdjustmentfromDetails
}) {
  return (
    <div>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <CompanyDetails details={context?.partner} />
        </Grid>
        <Grid item>
          <InvoiceCurd label={'Not this Invoice?'} context={context} />
        </Grid>
        <Grid item>
          <Adjustment
            label={'Not this Invoice?'}
            reasonDetails={reasonDetails}
            adjustmentdetails={adjustmentdetails}
            ChargeItemdetails={ChargeItemdetails}
            AdjustmentfromDetails={AdjustmentfromDetails}
          />
        </Grid>
      </Grid>
    </div>
  );
}

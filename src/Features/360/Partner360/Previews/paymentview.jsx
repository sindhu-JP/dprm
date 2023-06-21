import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';

import { Grid } from '@material-ui/core';
import PaymentDetails from 'Components/Details/PaymentDetails';
import AdjustmentDetails from 'Components/Details/AdjustmentDetails';

export default function Paymentview({ open, onClose, modalcontext, user, balance }) {
  const agentdetails = {
    cannelName: 'DPRM',
    agentlocation: 'Karnataka',
    createdBy: user?.sub
  };

  return (
    <div>
      <Buttonsheet open={open} onClose={onClose}>
        <Grid container direction="column" spacing={6}>
          {modalcontext.component === 'transaction' && (
            <Grid item>
              <PaymentDetails modalcontext={modalcontext} balance={balance} />
            </Grid>
          )}
          {modalcontext.component === 'Adjustment' && (
            <Grid item>
              <AdjustmentDetails modalcontext={modalcontext} />
            </Grid>
          )}

          {/* <Grid item>
            <AgentDetails
            agentdetails={agentdetails} />
          </Grid> */}
        </Grid>
      </Buttonsheet>
    </div>
  );
}

import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';

import { Grid } from '@material-ui/core';
import PartnerDetails from 'Features/LeadDetails/PartnerDetails';

export default function Preview({ open, onClose, modalcontext }) {
  return (
    <div>
      <Buttonsheet open={open} onClose={onClose}>
        <Grid container direction="column" spacing={6}>
          {modalcontext?.details.rowlist?.TenantProfileCreation?.sections.map(
            (item) => {
              return (
                <Grid item>
                  <PartnerDetails
                    title={item}
                    partnerDetails={
                      modalcontext?.details.rowlist?.TenantProfileCreation
                    }
                  />
                </Grid>
              );
            }
          )}
          {modalcontext?.details.rowlist?.AddProduct?.sections.map((item) => {
            return (
              <Grid item>
                <PartnerDetails
                  title={item}
                  partnerDetails={modalcontext?.details.rowlist?.AddProduct}
                />
              </Grid>
            );
          })}
        </Grid>
      </Buttonsheet>
    </div>
  );
}

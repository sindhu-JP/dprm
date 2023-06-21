import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';

import { Grid, Typography, Box } from '@material-ui/core';

import SettlementDetails from 'Components/Details/SettlementDetails';
import OfferDetails from 'Components/Details/OfferDetails';

export default function SettlementPreview({
  open,
  onClose,
  modalcontext,
  user
}) {
  return (
    <div>
      <Buttonsheet open={open} onClose={onClose} header={''}>
        <Box px={18}>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', alignItems: 'center' }}
            // y={1}
          >
            <Grid>
              <Grid item>
                <Typography variant="h2">Coca-Cola India</Typography>
              </Grid>

              <Grid item>
                <Typography variant="caption">
                  Profile ID: 5689457898 | Products: 2 | Contracts: 3
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            spacing={3}
            style={{ marginTop: '1rem' }}
          >
            <Grid item>
              <SettlementDetails
                Settlementedetails={modalcontext?.details?.rowlist}
              />
            </Grid>
            <Grid item>
              <OfferDetails />
            </Grid>
          </Grid>
        </Box>
      </Buttonsheet>
    </div>
  );
}

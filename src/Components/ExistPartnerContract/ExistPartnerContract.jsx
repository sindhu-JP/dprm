import Dialog from '@material-ui/core/Dialog';

import { Grid, Box, Button, Typography } from '@material-ui/core';
import React from 'react';

const ExistPartnerContract = ({ open, onClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box>
          <Grid container direction="column" justify="center" spacing={6}>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="subtitle2">
                    Partner Contract Already Exist!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
                spacing={4}
              >
                <Grid item>
                  <Button
                    onClick={onClose}
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    Ok
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default ExistPartnerContract;

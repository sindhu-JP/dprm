import {
  Box,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default function ProductOffering({ handleTag }) {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Typography variant="h2" className={classes.title}>
              Product Offering
            </Typography>
          </Box>

          <Grid container spacing={4} direction="column">
            <Grid item xs={4}>
              <Autocomplete
                options={[
                  {
                    name: 'Simple Product Offering',
                    code: 'SimpleProduct'
                  },
                  {
                    name: 'Complex Product Offering',
                    code: 'ComplexProduct'
                  }
                ]}
                getOptionLabel={(option) => option.name}
                id="tags"
                label="Product Offering"
                autoComplete
                onChange={(e, v) => handleTag(v)}
                // onSelect={(event) => handleTag(event,)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    hint="koo, ndama nyonya"
                    label="Product Offering"
                    margin="normal"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

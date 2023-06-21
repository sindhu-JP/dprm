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
export default function ProductSpecification() {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0}>
        <Box p={4}>
          <Box mb={4}>
            <Typography variant="h2" className={classes.title}>
              Product Specification
            </Typography>
          </Box>

          <Grid container spacing={4} direction="column">
            <Grid item xs={4}>
              <Autocomplete
                options={[
                  {
                    name: 'Simple Product Offering',
                    code: 'Simple Product Offering'
                  },
                  {
                    name: 'Complex Product Offering',
                    code: 'Complex Product Offering'
                  }
                ]}
                getOptionLabel={(option) => option.name}
                id="tags"
                label="Product Offering"
                autoComplete
                // includeInputInList.
                // onSelect={(event) => handleTag(event, 'tags')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    hint="koo, ndama nyonya"
                    label="Product Specification"
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

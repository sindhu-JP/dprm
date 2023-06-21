import React from 'react';

import { useBoolean, useStateful } from 'react-hanger';

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Paper,
  TextField,
  InputAdornment,
  Tooltip
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import InvoiceCurd from './InvoiceCurd';
// import { useBoolean } from 'react-hanger';.

const InvoiceSelections = ({
  values,
  modalcontext,
  InvoiceDetails,
  details
}) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const companyDetails = useStateful({});
  const enableSearch = useBoolean(false);

  const makelist = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        rowlist: row?.list,
        columns: {
          ...row.columns
        }
      });
    });

    return rows;
  };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Select Invoice
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <div>
          <Box>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={4}
                    >
                      {enableSearch.value ? (
                        <Grid item>
                          <TextField
                            style={{ width: '400px' }}
                            id="standard-basic"
                            fullWidth
                            placeholder="Search by Invoice Details"
                            InputProps={{
                              disableunderline: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon
                                    fontSize="large"
                                    className={classes.iconSearch}
                                  />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      ) : (
                        <>
                          <Grid item>
                            {/* <img src={img} className={classes.imglog} />A */}
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2">
                              Select the invoice for which you would like make
                              bill adjustment?
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={4}
                        >
                          <Grid item>
                            {enableSearch.value ? (
                              <Tooltip title="Close" placeholder="bottom">
                                <CloseOutlinedIcon
                                  fontSize={'small'}
                                  onClick={enableSearch.toggle}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Search" placeholder="bottom">
                                <SearchIcon
                                  fontSize={'large'}
                                  onClick={enableSearch.toggle}
                                />
                              </Tooltip>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* taxdocument */}
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={4}
                        >
                          <Grid item></Grid>
                        </Grid>
                      </Grid>
                      {/* tax end */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Grid container direction="column" spacing={'6'}>
          {makelist(InvoiceDetails)?.map((item) => {
            return (
              <Grid item>
                <InvoiceCurd
                  label={'Select'}
                  context={{ details: item, partner: details }}
                  enble={true}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  menumodel: {
    marginTop: '8rem'
  }
}));
export default InvoiceSelections;

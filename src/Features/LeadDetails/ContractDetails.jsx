import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Collapse,
  IconButton
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useBoolean, useStateful } from 'react-hanger';
import ContractProducts from './ContractProducts';

const ContractDetails = ({ values, products, Contract }) => {
  const classes = useStyles();
  const expanded = useBoolean(true);
  const Details = useStateful({});

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="h2" className={classes.title}>
            Contract Information
          </Typography>
        </Box>
        <Paper elevation={0} className={classes.border}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item direction={'column'}>
              <Grid item>
                <Typography variant="h5" className={classes.title}>
                  Contract ID: {Contract?.id}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={6}>
                <Grid item>
                  <IconButton>
                    <KeyboardArrowDownIcon onClick={expanded.toggle} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Collapse in={expanded.value} unmountOnExit timeout="auto">
            <Box py={4}>
              <Box mb={4}>
                <Grid container justify="space-between">
                  <Grid container spacing={4} xs={12}>
                    <Grid item xs={4} py={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="body1">Contract ID</Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                          >
                            {Contract?.id}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="body1">Contract Type</Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                          >
                            {Contract?.contractType}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="body1">
                            Contract Period
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                          >
                            {Contract?.contractPeriod}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* 2nd row */}
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="body1">Notice Period</Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                          >
                            {Contract?.noticePeriod}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="body1">
                            Billing Start Type
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                          >
                            {Contract?.billingStartType}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="body1">
                            Contract Validity
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            className={classes.subtitle}
                          >
                            {Contract?.contractValidity}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            {Contract?.offeringDetails && (
              <Grid container direction="column" spacing={4}>
                {Contract?.offeringDetails &&
                  Contract?.offeringDetails.map((product) => (
                    <Grid item>
                      <ContractProducts product={product} vasData={false} />
                    </Grid>
                  ))}

                {Contract?.offeringDetails &&
                  Contract?.offeringDetails.map((product) => (
                    <>
                      {product?.vas?.map((vas) => {
                        return (
                          <Grid item>
                            <ContractProducts product={vas} vasData={true} />
                          </Grid>
                        );
                      })}
                    </>
                  ))}
              </Grid>
            )}
          </Collapse>
        </Paper>

        <Box mt={4}></Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  charges: {
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(6, 4)
  },
  title: {
    fontWeight: 'bold'
  },
  border: {
    border: '1px solid #e2e2e2'
  },
  heading: {
    fontSize: '18px',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));
export default ContractDetails;

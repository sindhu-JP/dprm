import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Button,
  Collapse,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';
import { ExpandMore } from '@material-ui/icons';
import LeadUtils from 'lib/utils/lead';

import _ from 'lodash';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const CompanyDetails = ({ values }) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const companyDetails = useStateful({});
  const masterdata = useSelector((state) => state.master.data);

  React.useEffect(() => {
    if (values) {
      companyDetails.setValue(
        LeadUtils.getCompanyDetails({
          companyDetails: values
        })
      );
    }
  }, [values]);

  const getNameByCode = (code, key) => {
    const categoryTypes = {};
    _.get(masterdata, key, []).forEach((type) => {
      categoryTypes[type.code] = type.name;
    });
    return categoryTypes[code];
  };

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Company Details
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Company Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {companyDetails.value.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Registration Number</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {companyDetails.value.registrationNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Customer Category</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {getNameByCode(
                    companyDetails.value.category,
                    'partyType[1].category'
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">
                  Customer Sub Category
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {companyDetails.value.subCategory}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {companyDetails.value?.riskCategory ? (
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">Risk Category</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {companyDetails.value?.riskCategory}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
          {companyDetails.value?.registrationExpiryDate ? (
            <Grid item xs={4}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="subtitle2">
                    Registration ExpiryDate
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {dayjs(companyDetails.value?.registrationExpiryDate).format(
                      'DD MMM YYYY'
                    )}
                    {/* {companyDetails.value?.registrationExpiryDate} */}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Industry Type</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {getNameByCode(
                    companyDetails.value?.industryType,
                    'industry'
                  )}
                  {/* {companyDetails.value?.industryType} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Lead Classification</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {companyDetails.value.classification}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* {Object.keys(values)
            .filter((key) => key !== "optionalDetails")
            .map((item, i) => (
              <>
                <Grid item xs={4} key={i}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">
                        {item.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">{values[item]}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))} */}
        </Grid>

        {values?.optionalDetails && (
          <Collapse in={optionalSectionExpanded.value} timeout="auto">
            <Box mb={6} mt={12}>
              <Typography variant="h4" className={classes.title}>
                Optional Details
              </Typography>
            </Box>

            <Grid container direction="row" spacing={4}>
              {values.optionalDetails?.source && (
                <Grid item xs={4}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">Source</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {values.optionalDetails.source}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {values.optionalDetails?.websiteUrl && (
                <Grid item xs={4}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">Website Url</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {values.optionalDetails.websiteUrl}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {values.optionalDetails?.numberOfEmployee && (
                <Grid item xs={4}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">
                        No of Employees
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {values.optionalDetails.numberOfEmployee}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Collapse>
        )}

        <Box mt={6}>
          <Grid container justify="center">
            <Button
              size="large"
              color="primary"
              onClick={optionalSectionExpanded.toggle}
              endIcon={
                <ExpandMore
                  style={{
                    transform: `rotate(${
                      optionalSectionExpanded.value ? '180deg' : '0'
                    })`
                  }}
                />
              }
            >
              {optionalSectionExpanded.value
                ? `Hide Optional Details`
                : `Show Optional Details`}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default CompanyDetails;

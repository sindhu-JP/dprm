import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';

import { useSelector } from 'react-redux';
import { Leads } from 'Http/api';

const UserDetails = ({ values }) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const companyDetails = useStateful({});
  const masterdata = useSelector((state) => state.master.data);
  const [response, setResponse] = React.useState([]);

  const getEmailAndMobile = async (name) => {
    const getRes = await Leads.leadAssignmentEmailMobile(name);
    setResponse(getRes?.contactMedium);
  };

  React.useEffect(() => {
    if (values[0].id) {
      getEmailAndMobile(values[0].id);
    }
  }, [values[0].id]);

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="row" spacing={4}>
            {/* <Grid item>
              <img src={img} />
            </Grid> */}
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                User Details
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{values[0].id}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Last Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {/* {companyDetails.value.registrationNumber} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Designation</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {/* {getNameByCode(companyDetails.value.category, "partyType[1].category")} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {response?.map((item, i) => (
            <>
              {item?.medium.type === 'Mobile' && (
                <Grid item xs={4}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">Mobile Number</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {item?.medium.number}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {item?.medium.type === 'EmailAddress' && (
                <Grid item xs={4}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subtitle2">Email</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {/* {getNameByCode(companyDetails.value?.industryType, "industry")} */}
                        {item?.medium.emailAddress}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </>
          ))}
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle2">Chanel</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{values[0].name}</Typography>
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
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
export default UserDetails;

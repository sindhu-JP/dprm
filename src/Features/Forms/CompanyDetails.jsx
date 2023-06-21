import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CompanyLogo from '../../Assets/Icons/building.svg';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';

import { Collapse } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useBoolean } from 'react-hanger';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingRight: '20px',
    paddingLeft: '20px'
  },
  heading: {
    fontSize: '20px',
    fontWeight: 600,
    marginTop: '8px',
    marginLeft: '10px'
  },
  // outer: {
  //   padding: '10px'
  // },
  Logo: {
    marginLeft: '10px'
  },
  expandIcon: {
    marginRight: 20
  },
  details: {
    paddingLeft: '10px'
  },
  id: {
    marginTop: '14px'
  },
  content: {
    marginTop: '2px',
    marginleft: '5px'
  }
}));

export default function CompanyDetails(props) {
  const classes = useStyles();
  const expand = useBoolean(false);
  return (
    <div className={classes.root}>
      <Paper className={classes.outer} elevation={0}>
        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Grid container direction="row" alignItems="center" spacing={4}>
                  <Grid item>
                    <img src={CompanyLogo} />
                  </Grid>
                  <Grid item>
                    <Typography variant={'h4'}>
                      {props.partnerDetails?.value?.PartnerProfileCreation
                        ?.PartnerDetails?.PARTNER_NAME ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.TENANT_NAME}
                      -{' '}
                      {props.partnerDetails?.value?.PartnerProfileCreation
                        ?.PartnerDetails?.Partner_ID ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.TENANT_ID}
                    </Typography>
                  </Grid>
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
                      <Grid item onClick={expand.toggle}>
                        <IconButton>
                          <ExpandMoreIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Collapse in={expand.value} unmountOnExit timeout="auto">
          <Box py={2} px={3}>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">PARTNER NAME</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {/* {companyDetails.value.name} */}
                      {/* {_.get(props.accordianDetails, 'name', '-')} */}

                      {props.partnerDetails?.value?.PartnerProfileCreation
                        ?.PartnerDetails?.PARTNER_NAME ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.TENANT_NAME}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">
                      PARTNER REGISTRATION NUMBER
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {/* {_.get(props.accordianDetails, 'partnerId', '-')} */}
                      {props.partnerDetails?.value.PartnerProfileCreation
                        ?.PartnerDetails?.PARTNER_REGISTRATION_NUMBER ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.PARTNER_REGISTRATION_NUMBER}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">INDUSTRY TYPE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {/* {_.get(props.accordianDetails, 'partnerType', '-')} */}
                      {props.partnerDetails?.value?.PartnerProfileCreation
                        ?.PartnerDetails?.INDUSTRY_TYPE ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.INDUSTRY_TYPE}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">PARTNER TYPE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {/* {_.get(props.accordianDetails, 'partnerType', '-')} */}
                      {props.partnerDetails?.value?.PartnerProfileCreation
                        ?.PartnerDetails?.PARTNER_TYPE ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.TENANT_PARTNER_TYPE}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">SUB TYPE</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {props.partnerDetails?.value?.PartnerProfileCreation
                        ?.PartnerDetails?.PARTNER_SUB_TYPE ||
                        props.partnerDetails?.value?.TenantProfileCreation
                          ?.TenantDetails?.TENANT_PARTNER_SUB_TYPE}
                      {/* {companyDetails.value.registrationNumber} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>
    </div>
  );
}

import React from 'react';
import { makeStyles, Chip, Grid, Typography, Paper } from '@material-ui/core';
import { history } from 'Store';
const styles = makeStyles((theme) => ({
  outer: {
    border: '1px solid #dedede',
    borderRadius: theme.spacing(6, 6, 6, 6),
    margin: '1rem',
    cursor: 'pointer',
    width: '800px',
    overflowY: 'scroll'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  chipLabel: {
    backgroundColor: theme.palette.success.main,
    '& .MuiChip-label': {
      color: 'white'
    }
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  }
}));
const ManualContractCard = ({
  ContractType,
  item,
  SelectContractCard,
  identifier
}) => {
  const classes = styles();

  const ObjectValue = {
    tenant: {
      name: 'Tenant Name',
      id: 'Tenant Id'
    },
    partner: {
      name: 'Partner  Name',
      id: 'Partner  Id'
    },
    product: {
      name: 'Product  Name',
      id: 'Product  Id'
    }
  };
  return (
    <div>
      <Paper
        className={classes.outer}
        elevation={0}
        onClick={() =>
          history.push({
            pathname: `/digital-prm-web-ui/suspension`,
            state: {
              partnerDetails: item
            }
          })
        }
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item style={{ padding: '15px' }}>
            <Typography variant={'h4'}>
              {item?.PartnerDetails?.PARTNER_NAME ||
                item?.TenantDetails?.TENANT_NAME}
            </Typography>
          </Grid>
          <Grid item style={{ padding: '15px' }}>
            <Chip
              className={classes.chipLabel}
              label={
                item?.PartnerDetails?.Onboarding_Status ||
                item?.TenantDetails?.Onboarding_Status
              }
            />
          </Grid>
        </div>

        <Grid container direction="row" spacing={4}>
          <Grid item direction="row">
            <Grid item style={{ marginTop: '6px' }}>
              <Typography variant={'h6'}>
                Partner ID :
                {item?.PartnerDetails?.Partner_ID ||
                  item?.TenantDetails?.TENANT_ID}
              </Typography>
            </Grid>
          </Grid>
          <Grid item direction="row">
            <Grid item style={{ marginTop: '6px' }}>
              <Typography variant={'h6'}>
                Mobile :{item?.PrimaryContactDetails?.MOBILE_NUMBER}
              </Typography>
            </Grid>
          </Grid>
          <Grid item direction="row">
            <Grid item style={{ marginTop: '6px' }}>
              <Typography variant={'h6'}>
                Email :{item?.PrimaryContactDetails?.EMAIL_ID}
              </Typography>
            </Grid>
          </Grid>
          {}
        </Grid>
      </Paper>
    </div>
  );
};
export default ManualContractCard;

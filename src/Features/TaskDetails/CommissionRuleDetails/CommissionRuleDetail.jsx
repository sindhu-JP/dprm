import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import partnerFactory from 'Factory/Partner';
import dayjs from 'dayjs';

const CommissionRuleDetail = ({ maintitle, commissionRuleDetails }) => {
  const classes = useStyles();
console.log(maintitle, commissionRuleDetails, "compooxxxx")
  const rangeLabels = ['RangeFrom', 'RangeTo', 'RangeValue', 'RangeType'];

  const removeFields = (data) => {
    console.log(data, "r,fiedls")
    if (
      data['commissionType'] === 'Tier' ||
      data['commissionType'] === 'Volume' ||
      data['commissionType'] === 'Channel'

    ) {
      return _.omit(data, [
        'path',
        'href',
        'baseType',
        '@schemaLocation',
        '_class',
        'status',
        'channel',
      
      ]);
    } else {
      return _.omit(data, [
        'path',
        'href',
        'baseType',
        '@schemaLocation',
        '_class',
        'status',
        'commissionRuleRange',
        
      ]);
    }
  };
  return (
    <Paper elevation={0}>
      <Box className={classes.box}>   
           <Box  className={classes.borderOne}>       
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                {maintitle}
              </Typography>
            </Grid>
          </Grid>
       
        <Grid container spacing={4}>
          {commissionRuleDetails.map((item) => {
            return (
              <>
                {Object.keys(removeFields(item)).map((field) => {
                  console.log(item, "vvvvvovovo", field,)
                  return (
                    <>
                      {field !== 'commissionRuleRange' &&
                        field !== '@baseType' && field !== "channelCommission" && (
                          <Grid item xs={3}>
                            <Grid container direction="column">
                              <Grid item>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.subtitle2Changes}
                                >
                                  {item['commissionType'] === 'Tier' ||
                                  item['commissionType'] === 'Volume' 
                                    ? field === 'commissionValue'
                                      ? '--'
                                      : partnerFactory.removeUnderScore(field)
                                    :  partnerFactory.removeUnderScore(field)}
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Typography
                                  variant="subtitle1"
                                  style={{ wordBreak: 'break-word' }}
                                >
                                  {field === 'createdDate' ? (
                                    <>
                                      {dayjs(item['createdDate']).format(
                                        'DD MMM YYYY'
                                      )}
                                    </>
                                  ) : item['commissionType'] === 'Tier' ||
                                    item['commissionType'] === 'Volume' ? (
                                    field === 'commissionValue' ? (
                                      ''
                                    ) : (
                                      item[field]
                                    )
                                  ) : item['commissionType'] === 'Channel' 
                                   ? (
                                  field === 'channelCommission' ? (
                                    '--'
                                  ) : (
                                    item[field]
                                  )
                                ): (
                                  field === "channelCommission" ? "" : item[field]
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      {field === 'commissionRuleRange'  && item['commissionType'] !== 'Channel' && (
                        <Grid container spacing={12}>
                          <Grid item xs={12}>
                            <Grid container direction="row">
                              {item['commissionType'] === 'Tier' ||
                              item['commissionType'] === 'Volume'  ? (
                                <>
                                  {rangeLabels.map((label) => {
                                    return (
                                      <Grid
                                        item
                                        xs={3}
                                        style={{ padding: '0.5rem' }}
                                      >
                                        <Typography
                                          variant="subtitle2"
                                          className={classes.subtitle2Changes}
                                        >
                                          {partnerFactory.removeUnderScore(
                                            label
                                          )}
                                        </Typography>

                                        {label === 'RangeFrom' ? (
                                          <>
                                            {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                              (range) => {
                                                return (
                                                  <>
                                                    <Typography variant="subtitle1">
                                                      {range?.rangeFrom}
                                                    </Typography>
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        ) : label === 'RangeTo' ? (
                                          <>
                                            {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                              (range) => {
                                                return (
                                                  <>
                                                    <Typography variant="subtitle1">
                                                      {range?.rangeTo}
                                                    </Typography>
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        ) : label === 'RangeValue' ? (
                                          <>
                                            {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                              (range) => {
                                                return (
                                                  <>
                                                    <Typography variant="subtitle1">
                                                      {range?.rangeValue}
                                                    </Typography>
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        ) : label === 'RangeType' ? (
                                          <>
                                            {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                              (range) => {
                                                return (
                                                  <>
                                                    <Typography variant="subtitle1">
                                                      {range?.rangeType}
                                                    </Typography>
                                                  </>
                                                );
                                              }
                                            )}
                                          </>
                                        ) : (
                                          ''
                                        )}
                                      </Grid>
                                    );
                                  })}
                                </>
                              ) :            <>
                              {/* {rangeLabels.map((label) => {
                                return (
                                  <Grid
                                    item
                                    xs={3}
                                    style={{ padding: '0.5rem' }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      className={classes.subtitle2Changes}
                                    >
                                      {partnerFactory.removeUnderScore(
                                        label
                                      )}
                                    </Typography>

                                    {label === 'RangeFrom' ? (
                                      <>
                                        {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                          (range) => {
                                            return (
                                              <>
                                                <Typography variant="subtitle1">
                                                  {range?.rangeFrom}
                                                </Typography>
                                              </>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : label === 'RangeTo' ? (
                                      <>
                                        {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                          (range) => {
                                            return (
                                              <>
                                                <Typography variant="subtitle1">
                                                  {range?.rangeTo}
                                                </Typography>
                                              </>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : label === 'RangeValue' ? (
                                      <>
                                        {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                          (range) => {
                                            return (
                                              <>
                                                <Typography variant="subtitle1">
                                                  {range?.rangeValue}
                                                </Typography>
                                              </>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : label === 'RangeType' ? (
                                      <>
                                        {item['commissionRuleRange']?.length > 0 && item['commissionRuleRange']?.map(
                                          (range) => {
                                            return (
                                              <>
                                                <Typography variant="subtitle1">
                                                  {range?.rangeType}
                                                </Typography>
                                              </>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      ''
                                    )}
                                  </Grid>
                                );
                              })} */}
                            </>}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}

                  {field === 'channelCommission'  && item['commissionType'] === 'Channel' && (
                        <Grid container spacing={12}>
                          <Grid item xs={12}>
                            <Grid container direction="row">
                           
                                <>
                                  {item.channelCommission.map((label) => {
                                    return (
                                      <>
                                      <Grid
                                        item
                                        xs={4}
                                        style={{ padding: '0.5rem' }}
                                      >
                                        <Typography
                                          variant="subtitle2"
                                          className={classes.subtitle2Changes}
                                        >
                                         Channel Name
                                        </Typography>
                                          <Typography variant="subtitle1">
                                            {label?.channelName}
                                          </Typography>
                                  
                                      </Grid>
                                       <Grid
                                       item
                                       xs={3}
                                       style={{ padding: '0.5rem' }}
                                     >
                                       <Typography
                                         variant="subtitle2"
                                         className={classes.subtitle2Changes}
                                       >
                                        Commission Type
                                       </Typography>
                                         <Typography variant="subtitle1">
                                           {label?.commissionType}
                                         </Typography>
                                 
                                     </Grid>
                                     <Grid
                                       item
                                       xs={3}
                                       style={{ padding: '0.5rem' }}
                                     >
                                       <Typography
                                         variant="subtitle2"
                                         className={classes.subtitle2Changes}
                                       >
                                        Commission Value
                                       </Typography>
                                         <Typography variant="subtitle1">
                                           {label?.commissionValue
}
                                         </Typography>
                                 
                                     </Grid>
                                     </>
                                    );
                                  })}
                                </>
                              
                           
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  );
                })}
              </>
            );
          })}
        </Grid>
      </Box>
      </Box>

    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2'
  },
  borderOne:{
    border: `1px solid #e2e2e2`,
    borderRadius: "16px",
    padding:'20px'
  },
  box:{
    padding:'20px !important'
  },
  root: {
    width: theme.spacing(65),
    minHeight: '13rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    maxHeight: '25rem'
  },
  image: {
    width: '90%',
    height: 'auto',
    overflow: 'hidden'
  },
  subtitle2Changes: {
    textTransform: 'uppercase',
    '&.MuiTypography-subtitle2': {
      color:
        theme.palette.type === 'dark'
          ? `${theme.palette.primary.black} !important`
          : `#777777 !important`
    }
  }
}));
export default CommissionRuleDetail;

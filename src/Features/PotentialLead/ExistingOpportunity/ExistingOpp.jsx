import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Chip,
  IconButton
} from '@material-ui/core';

// import LeadProductPrice from 'Features/360/components/Customer/Details/LeadProductprice';
import ModalsStore from 'Store/Modals';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { connect } from 'react-redux';
import Statuses from 'lib/constants/statuses';
import _ from 'lodash';

const ExistingOpportunity = ({
  values,
  user,
  openModal,
  lead,
  leadAssigne,
  data,
  checklob
}) => {
  const classes = useStyles();

  const [lobs, setlobs] = React.useState('');
  const editopportunityCreation = () => {
    openModal({
      id: 'opportunityCreation',

      context: {
        lead: data,
        user: user,
        NewOpp: true,
        OppData: values
      }
    });
  };

  const getStatusColor = (values) => {
    return Statuses.statuses[values?.status]?.color || 'orange';
  };

  React.useEffect(() => {
    if (checklob) {
      let lob = checklob.split(',').toString();
      setlobs(lob);
    }
  }, []);

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
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
                    <Grid item>
                      <Typography variant="h2" className={classes.title}>
                        Existing Opportunites
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
                        <Grid item>
                          <Chip
                            className={classes[getStatusColor(values)]}
                            label={_.get(values, 'status', '')}
                          />
                        </Grid>

                        <Grid item>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            spacing={4}
                          >
                            <>
                              {values?.status === 'PRODUCT_CONFIGURATION' ||
                              values?.status === 'MANUAL_FEASIBILITY' ||
                              values?.status === 'QUOTE_GENERATE' ? (
                                <Grid item>
                                  <IconButton onClick={editopportunityCreation}>
                                    <CreateOutlinedIcon />
                                  </IconButton>
                                </Grid>
                              ) : (
                                ''
                              )}
                            </>

                            {/* ) : (
                              ""
                            )} */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Box p={4}>
            <Box mb={4}>
              <Grid container direction="row" spacing={4}>
                <Grid item>
                  <Typography variant="h6" className={classes.title}>
                    Lead Assignee
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={4}>
              {Object.keys(leadAssigne).map((item, i) => (
                <>
                  <Grid item xs={4} key={i}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="subtitle2">
                          {item.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          {leadAssigne[item]}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* <Box py={4}>

        <Grid container spacing={4}>
          {values.lob?.split(",").map((item, i) => (
            <Grid item key={i}>
              <Chip color="primary" label={item} />
            </Grid>
          ))}
        </Grid>
        </Box> */}

        {values?.products && (
          <Grid container direction="column" spacing={4}>
            {values?.products &&
              values?.products.map((product) => (
                <Grid item>
                  {/* <LeadProductPrice product={product} vasData={false} /> */}
                </Grid>
              ))}

            {values?.products &&
              values?.products.map((product) => (
                <>
                  {product?.vas?.map((vas) => {
                    return (
                      <Grid item>
                        {/* <LeadProductPrice product={vas} vasData={true} /> */}
                      </Grid>
                    );
                  })}
                </>
              ))}
          </Grid>
        )}
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data
  }),
  {
    openModal: ModalsStore.existingOpenModel
  }
)(ExistingOpportunity);

import React, { useEffect } from 'react';
import { Box, Grid, makeStyles, Typography, Drawer } from '@material-ui/core';

import { isEmpty } from 'lodash-es';

import ContractViewDetails from 'Features/ContractViewDetails/ContractViewDetails';
import CloseIcon from '@material-ui/icons/Close';
import Model from 'Store/Modals';
import { useDispatch } from 'react-redux';
import { TecnotreedigitalSales } from '../../Http/axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.main
  },
  //   paper: {
  //     padding: theme.spacing(2),
  //     margin: "auto",
  //     maxWidth: 500
  //   },
  outerColumn: {
    // borderRight: "1px solid grey",
    // borderBottom: "1px solid grey",
    // borderLeft: "1px solid grey",
    height: 'auto',
    padding: theme.spacing(2)
  },
  centerColumn: {
    // borderBottom: "1px solid grey",
    height: 'auto',
    padding: theme.spacing(2)
  }
}));
const ViewContract = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [contractDetails, setContractDetails] = React.useState({});
  // setContractDetails(props.contractDetails);
  let ContractId = props.rowSignOff.CONTRACT_ID;
  const [closeViewContract, setCloseViewContract] = React.useState(false);
  const handleClose = () => {
    props.onClose(false);
  };

  const getContractDetails = async (ContractId) => {
    await TecnotreedigitalSales.get(
      `/search/Add_Contract?AddContractFor.ContractInformation.CONTRACT_ID=${ContractId}`
    )
      .then((resp) => {
        setContractDetails(resp.data[0]);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getContractDetails(ContractId);
  }, []);

  return (
    <div>
      <Drawer
        // anchor="bottom"
        classes={{ paper: classes.paper }}
        open={props.open}
        onClose={props.onClose}
        anchor={'bottom'}
        style={{ height: '95vh', width: '100vw' }}
      >
        <Box
          py={6}
          px={10}
          style={{
            maxHeight: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: '140px'
          }}
        >
          <Grid container direction="column">
            <Grid
              item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'cneter'
              }}
            >
              <Grid item style={{ paddingBottom: '12px' }}>
                <Typography variant="h4">View Contract Details</Typography>
              </Grid>
              <Grid
                item
                onClick={() => {
                  dispatch(Model.close('ViewContract'));
                }}
              >
                <CloseIcon iconName="close" className={classes.closeIcon} />
              </Grid>
            </Grid>

            <Grid item>
              {!isEmpty(contractDetails) ? (
                <>
                  <ContractViewDetails
                    contractData={contractDetails.AddContractFor}
                  />
                </>
              ) : (
                <></>
              )}

              {/* <Paper>
                <Typography variant="h4">Contract Information</Typography>

                <div className="App">
                  <div style={{ maxWidth: '100%', paddingTop: '12px' }}>
                    <div className={classes.root}>
                      <Grid container>
                        <Grid container direction="column" item xs={4}>
                          <Grid
                            item
                            xs
                            className={classes.outerColumn}
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                CONTRACT NUMBER
                              </Typography>
                              <Typography variant="caption">
                                1234567890
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs
                            className={classes.outerColumn}
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                START DATE
                              </Typography>
                              <Typography variant="caption">
                                18 Jan 2021
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs
                            className={classes.outerColumn}
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                NOTICE PERIOD
                              </Typography>
                              <Typography variant="caption">1 Month</Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs
                            className={classes.outerColumn}
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                SUBSCRIPTION FEE
                              </Typography>
                              <Typography variant="caption">2000</Typography>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs
                            className={classes.outerColumn}
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                SETTLEMENT MODE
                              </Typography>
                              <Typography variant="caption">1 Month</Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="column"
                          item
                          xs={4}
                          align="center"
                        >
                          <Grid
                            item
                            container
                            className={classes.centerColumn}
                            //display="flex"
                            //justify="center"
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                CONTRACT TYPE
                              </Typography>
                              <Typography variant="caption">
                                Auto-Renewal
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            className={classes.centerColumn}
                            direction="column"
                            //display="flex"
                            //justify="center"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">END DATE</Typography>
                              <Typography variant="caption">
                                18 Jan 2021
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classes.centerColumn}
                            container
                            //direction="row"
                            //alignItems="flex-end"
                            //justify="center"
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">CURRENCY</Typography>
                              <Typography variant="caption">GHS</Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classes.centerColumn}
                            container
                            //direction="row"
                            //alignItems="flex-end"
                            //justify="center"
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                DSP COMMISSION
                              </Typography>
                              <Typography variant="caption">
                                Percentage
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classes.centerColumn}
                            container
                            //direction="row"
                            //alignItems="flex-end"
                            //justify="center"
                            direction="column"
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                MINIMUM GUARANTEE
                              </Typography>
                              <Typography variant="caption">3000</Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid container direction="column" item xs={4}>
                          <Grid
                            item
                            className={classes.outerColumn}
                            container
                            // direction="column"
                            //alignItems="flex-end"
                            //justify="flex-start"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                CONTRACT PERIOD
                              </Typography>
                              <Typography variant="caption">
                                12 Months
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classes.outerColumn}
                            container
                            //direction="row"
                            //alignItems="center"
                            //justify="flex-end"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                CONTRACT VALIDITY
                              </Typography>
                              <Typography variant="caption">
                                10 Jan 2021
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classes.outerColumn}
                            container
                            //direction="column"
                            //alignItems="flex-end"
                            //justify="flex-end"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                ONE TIME ENROLLMENT FEE
                              </Typography>
                              <Typography variant="caption">2300</Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            className={classes.outerColumn}
                            container
                            //direction="column"
                            //alignItems="flex-end"
                            //justify="flex-end"
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-start'
                            }}
                          >
                            <Grid container direction="column">
                              <Typography variant="label1">
                                REVENUE SHARING PERCENTAGE
                              </Typography>
                              <Typography variant="caption">2%</Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          style={{ paddingTop: '12px' }}
                        >
                          <Grid item>AGGREMENT DESCRIPTION</Grid>
                          <Grid item>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam fringilla laoreet dolor. Praesent
                            lectus massa, tempus at lorem id, placerat tincidunt
                            erat. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Paper> */}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </div>
  );
};

export default ViewContract;

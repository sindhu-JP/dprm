import React from 'react';

import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  Box,
  Button
} from '@material-ui/core';

import CompanyLogo from '../../Assets/Icons/company_1716823.svg';

import ButtomDrawer from './BottomSheet';

import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';
import { TecnotreedigitalSales } from '../../Http/axios';

import Model from 'Store/Modals';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  field: {
    width: 'calc(50vw)',
    minWidth: '150px',
    maxWidth: '360px',
    marginLeft: '16px',
    marginRight: '16px',
    marginBottom: '16px'
  },
  outerdiv: {
    backgroundColor: theme.palette.background.main
  },
  partner: {
    height: '20px',
    marginTop: '0px'
  },
  profile: {
    margin: 10
  },
  main: {
    backgroundColor: theme.palette.background.main,
    padding: '5px'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  aa: {
    marginTop: 10,
    marginBottom: 10
  },
  viewcrt: {
    color: '#1400C8'
  },
  id: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  name: {
    marginRight: 10
  },
  root: {
    width: theme.spacing(60),
    // border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    height: '23.5rem',
    marginLeft: '10px'
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '8.5rem',
    borderWidth: 2,
    borderRadius: 2,
    // borderColor: "#e2e2e2",
    // borderStyle: "dashed",
    backgroundColor: '#ffffff',
    color: theme.palette.common.textSecondary,
    outline: 'none',
    textAlign: 'center',
    minHeight: '100px',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  }
}));
const ContractSignOff = (props) => {
  const classes = useStyles();
  const [draweropen, setopen] = React.useState(false);
  const modalState = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const [viewContractSheetOpen, setViewContractSheetOpen] =
    React.useState(false);
  const [contractDetails, setContractDetails] = React.useState({});
  const closedrawer = () => setopen(false);
  const getContractDetails = async (ContractId) => {
    await TecnotreedigitalSales.get(
      `/search/Add_Contract?AddContractFor.ContractInformation.CONTRACT_ID=${ContractId}`
    )
      .then((resp) => {
        setContractDetails(resp.data[0]);
      })
      .catch((error) => {});
  };
  const handleComponentOpen = () => {
    setViewContractSheetOpen(true);
    let ContractId = props.details.CONTRACT_ID;
    getContractDetails(ContractId);
    getfun();
  };
  function getfun() {}

  return (
    <div className={classes.outerdiv}>
      <Box
        py={6}
        px={10}
        style={{
          // maxHeight: "100vh",
          //overflowY: "auto",
          overflowY: 'hidden',
          overflowX: 'hidden',
          paddingBottom: '140px'
        }}
      >
        <Grid container direction="column">
          {/* <Grid item className={classes.partner}>
                <img src={Partner}/>
            </Grid> */}
          {/* <Grid item>
            <Typography variant="h4">
              Coca-Cola India |{' '}
              <Typography variant="caption">
                <img src={VipLogo} />
                VIP
              </Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" className={classes.aa}>
              Partner Id: 367387238 | Tenanat:1 | Product:2
            </Typography>
          </Grid> */}
          <Grid item>
            <Typography variant="h4" className={classes.aa}>
              Contract Association with
            </Typography>
          </Grid>
          <Grid item>
            <Paper
              className={classes.aa}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'cneter'
              }}
            >
              <Typography variant="h4">
                <img className={classes.name} src={CompanyLogo} />
                {(() => {
                  if (props.details.PARTNER_NAME) {
                    return (
                      <>
                        {props.details.PARTNER_NAME} -{' '}
                        {props.details.Partner_ID}
                      </>
                    );
                  } else {
                    return (
                      <>
                        {props.details.TENANT_NAME} - {props.details.Partner_ID}
                      </>
                    );
                  }
                })()}
              </Typography>
              <Grid item>
                <Button
                  size="large"
                  variant="text"
                  color="primary"
                  onClick={() => {
                    dispatch(Model.open({ id: 'ViewContract' }));
                    dispatch(Model.close('ButtomDrawer'));
                  }}
                >
                  View Contract
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            {/* Dynamic contract signOff Form */}
            <BottomSheetFormFields
              formIdentity="Contract_Sign_Off"
              partnerName={props.details.PARTNER_NAME}
              contractId={props.details.CONTRACT_ID}
              partnerId={props.details.Partner_ID}
            />
            {/* Static contract signOff form */}
            {/* <Paper className={classes.aa}>
              <Typography variant="h4" className={classes.aa}>
                Contract Sign Off Details
              </Typography>
              <Box className={classes.main}>
                <Grid container direction="row" justify="space-between">
                  <Grid item className={classes.id}>
                    Contract ID: 009865(2 products)
                  </Grid>
                  <Grid item>
                    <Button
                      size="large"
                      variant="text"
                      color="primary"
                      //   onClick={() => history.push("/dlpm-web-ui/viewcontract")}
                      onClick={() => handleComponentOpen()}
                    >
                      View Contract
                    </Button>
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item>
                    <TextField
                      required
                      className={classes.field}
                      label="SIGNED BY"
                      defaultValue="Jessica Pearson"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      className={classes.field}
                      label="CUSTOMER SIGNED BY"
                      defaultValue="Eliza Fisher"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
            <Paper className={classes.aa}>
              <Box p={4}>
                <Box mb={6}>
                  <Typography variant="h4" className={classes.aa}>
                    Upload Documents
                  </Typography>
                  <Grid container direction="row">
                    <Grid item>
                      <Box
                        className={classes.root}
                        style={{ border: `1px solid #e2e2e2` }}
                      >
                        <Grid container direction="column" spacing={4}>
                          <Grid item>
                            <Box className={classes.inputWrapper}>
                              <Grid
                                container
                                direction="column"
                                spacing={10}
                                mt={15}
                              >
                                <Grid item>
                                 
                                  <ControlPointIcon
                                    style={{ fontSize: '4rem' }}
                                    color={'primary'}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper> */}
          </Grid>
        </Grid>
        <ButtomDrawer
          open={draweropen}
          close={closedrawer}
          // displayComponent={<ViewContract />}
        />
        {/* {modalState.ViewContract && (
          <>
            <>
              <ViewContract
                open={modalState.ViewContract}
                // close={closedrawer}
                contractDetails={contractDetails}
              />
            </>
          </>
        )} */}
      </Box>
    </div>
  );
};

export default ContractSignOff;

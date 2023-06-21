import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

// import LeadProductPrice from 'Features/360/components/Customer/Details/LeadProductprice';
import ModalsStore from 'Store/Modals';

import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

const ContractInformation = (props, { values }) => {
  const classes = useStyles();
  const [draweropen, setdraweropen] = React.useState(false);
  const [product, setproducts] = React.useState([]);
  const [oppQuoteCopy, setOppQuote] = React.useState({});

  React.useEffect(() => {
    if (props.oppQuote?.quoteRef?.id && !oppQuoteCopy?.quoteRef?.id) {
      setOppQuote(props.oppQuote);
    }
  }, [props]);
  return (
    <Paper elevation={0} className={classes.layout}>
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
                        Contract Sign off Details
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
                          <Typography variant="h6" className={classes.title}>
                            Quote ID:
                            {props.oppQuote?.quoteRef?.id
                              ? props.oppQuote?.quoteRef?.id
                              : oppQuoteCopy?.quoteRef?.id}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.layout1} px={7}>
          <Grid container direction="column" spacing={6} xs={12} mt={6}>
            <Grid
              item
              container
              justify="space-between"
              style={{ marginTop: '1rem' }}
            >
              <Typography variant="h5" className={classes.subtitile}>
                Contract ID: {props.data?.id}
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                className={classes.subtitile}
                onClick={() => {
                  props.openleadview({
                    id: 'leadView',
                    context: {
                      lead: props.lead,
                      subOpp: props.oppQuote ? props.oppQuote : oppQuoteCopy,
                      user: props.user
                    }
                  });
                }}
              >
                View Contract
              </Typography>
            </Grid>

            {/* <Grid container spacing={6} xs={12} style={{ marginTop: "1rem" }}>
              <Grid item xs={4}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  type="text"
                  label="CONTRACT TYPE"
                  //   component={TextField}

                  name="contractType"
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  type="text"
                  label="PO REFERENCE NUMBER"
                  //   component={TextField}

                  name="PO REFERENCE NUMBER"
                ></TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  type="text"
                  label="SIGNED BY"
                  name="SIGNED BY"
                ></TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  type="text"
                  label="CUSTOMER SIGNED BY"
                  //   component={TextField}

                  name="CUSTOMER SIGNED BY"
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  type="text"
                  label="SMART SERVICE-LOCATION"
                  //   component={TextField}
                  select
                  name="contractType"
                >
                  <MenuItem value="Auto-Renewel">
                    <Typography>Auto-Renewel</Typography>
                  </MenuItem>
                  <MenuItem value="Non-ReneWel">
                    <Typography>Non-ReneWel</Typography>
                  </MenuItem>
                  <MenuItem value="Limited">
                    <Typography>Limited</Typography>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  type="text"
                  label="REVENUE SHARING PERCENTAGE"
                  //   component={TextField}
                  select
                  name="contractType"
                >
                  <MenuItem value="Auto-Renewel">
                    <Typography>10%</Typography>
                  </MenuItem>
                  <MenuItem value="Non-ReneWel">
                    <Typography>20%</Typography>
                  </MenuItem>
                  <MenuItem value="Limited">
                    <Typography>30%</Typography>
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid> */}

            {(!props.isExist || props.contractdetails) && (
              <Formik
                initialValues={{
                  PoNumber: props.contractdetails?.poReferenceNumber || '',
                  LgNumber: props.contractdetails?.lgReferenceNumber || '',
                  SIGNEDBY: props?.user?.sub || '',
                  // SmartService: "",
                  CUSTOMERSIGNEDBY:
                    props.lead?.primaryContactDetails?.name || ''
                  // Revenue: "",
                }}
                validationSchema={Yup.object({
                  // a: Yup.string().required("required")
                  PoNumber: Yup.string().required('required'),
                  LgNumber: Yup.string().required('required'),
                  SIGNEDBY: Yup.string().required('required'),
                  // SmartService: Yup.string().required("required"),
                  CUSTOMERSIGNEDBY: Yup.string().required('required')
                  // Revenue: Yup.string().required("required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  props.handleSubmit(values);

                  setSubmitting(false);
                }}
              >
                {(formikProps) => {
                  const { values, handleChange, handleBlur, handleSubmit } =
                    formikProps;

                  // bind the submission handler remotely
                  props.bindSubmitForm(formikProps.submitForm);

                  return (
                    <form noValidate onSubmit={handleSubmit}>
                      <Grid
                        container
                        spacing={6}
                        xs={12}
                        style={{ marginTop: '1rem' }}
                      >
                        <Grid item xs={4}>
                          <Field
                            required
                            style={{ width: '100%' }}
                            type="text"
                            label="PO REFERENCE NUMBER"
                            component={TextField}
                            disbled
                            name="PoNumber"
                          ></Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            required
                            style={{ width: '100%' }}
                            type="text"
                            label="LG REFERENCE NUMBER"
                            component={TextField}
                            name="LgNumber"
                          ></Field>
                        </Grid>

                        <Grid item xs={4}>
                          <Field
                            required
                            style={{ width: '100%' }}
                            type="text"
                            label="USER BY"
                            name="SIGNEDBY"
                            disabled
                            component={TextField}
                          ></Field>
                        </Grid>

                        <Grid item xs={4}>
                          <Field
                            required
                            style={{ width: '100%' }}
                            type="text"
                            label="PARTNER SIGNED BY"
                            component={TextField}
                            disabled
                            name="CUSTOMERSIGNEDBY"
                          ></Field>
                        </Grid>
                        <Grid item xs={4}>
                          {/* <Field
                          required
                          style={{ width: "100%" }}
                          type="text"
                          label="SMART SERVICE-LOCATION"
                          component={TextField}
                          select
                          name="SmartService"
                        >
                          <MenuItem value="Auto-Renewel">
                            <Typography>Location-1</Typography>
                          </MenuItem>
                        
                        </Field> */}
                        </Grid>
                        <Grid item xs={4}>
                          {/* <Field
                          required
                          style={{ width: "100%" }}
                          type="text"
                          label="REVENUE SHARING PERCENTAGE"
                          component={TextField}
                          select
                          name="Revenue"
                        >
                          <MenuItem value="Auto-Renewel">
                            <Typography>10%</Typography>
                          </MenuItem>
                          <MenuItem value="Non-ReneWel">
                            <Typography>20%</Typography>
                          </MenuItem>
                          <MenuItem value="Limited">
                            <Typography>30%</Typography>
                          </MenuItem>
                        </Field> */}
                        </Grid>
                      </Grid>
                    </form>
                  );
                }}
              </Formik>
            )}
            {/* </Paper> */}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  border: {
    border: '1px, solid #4933D3'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },

  layout: {
    minHeight: '25rem',
    maxHeight: '30rem',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  layout1: {
    minHeight: '18rem',
    maxHeight: '30rem',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: '#f4f6f8'
  },

  //  buttoncolor:{
  //   fontSize:"16px", color:'#57606F',
  //   fontWeight:600,
  //  },

  btn: {
    // fontFamily: "Manrope",
    // borderColor: "#57606F",
    fontSize: '16px',
    color: '#57606F',
    fontWeight: 600,

    '&:hover': {
      // backgroundColor: "#15e577",
      color: '#1400C8',
      border: '1px solid #1400C8'
    }
  },
  subtitile: {
    fontWeight: 'bold',
    cursor: 'pointer'
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
    // openModal: ModalsStore.open,
    openModal: ModalsStore.buttomdraweropen
  }
)(ContractInformation);

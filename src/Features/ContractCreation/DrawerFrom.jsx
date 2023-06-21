import React from 'react';

import NavigateNext from '@material-ui/icons/NavigateNext';

import {
  Box,
  Grid,
  Typography,
  Drawer,
  Button,
  makeStyles,
  Paper,
  MenuItem,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Statuses from 'lib/constants/statuses';
import { Formik, Form, Field } from 'formik';

import { TextField } from 'formik-material-ui';
import validationSchema from './Schema';
import { DatePicker } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DrawerForm = (props) => {
  const classes = useStyles();

  const getStatusColor = (status) => {
    return Statuses.docStatus[status]?.color || 'orange';
  };
  const instailvalue = {
    contractNumner: '',
    contractType: '',
    contractPeriod: '',
    noticePeriod: '',
    billingType: '',
    contractValidity: ''
  };

  const onsubmitdata = (values) => {
    const payload = {
      id: values.contractNumner,
      contractNumber: values.contractNumber,
      contractPeriod: values.contractPeriod,
      noticePeriod: values.noticePeriod,
      billingStartType: values.billingType,
      contractValidity: values.contractValidity,
      quoteId: props.quoteID,
      contractType: values.contractType,

      oppId: props.opp?.id,
      leadId: props.leadid,
      status: 'APPROVAL',
      offeringDetails: props.products,
      isNewContract: props.isNewContract
    };

    props.createContract({ payload, id: props.leadid });
  };

  const onEditform = (values) => {
    const payload = {
      id: values.contractNumner,

      contractNumber: values.contractNumber,
      contractPeriod: values.contractPeriod,
      noticePeriod: values.noticePeriod,
      billingStartType: values.billingType,
      contractValidity: values.contractValidity,
      quoteId: props.quoteID,
      contractType: values.contractType,
      offeringDetails: props.products
    };

    props.Oneditsumbmit({ payload, id: props.leadid });
  };

  const { data } = props;
  return (
    <div>
      <Drawer
        anchor="bottom"
        open={props.open}
        // onClose={upload.cancel}
      >
        <Formik
          initialValues={{
            contractNumner: props.constractId || '',
            contractType: data?.contractType || '',
            contractPeriod: data?.contractPeriod || '',
            noticePeriod: data?.noticePeriod || '',
            billingType: data?.billingStartType || '',
            contractValidity: data?.contractValidity
              ? data?.contractValidity
              : null
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onsubmitdata(values);

            // onEditform(values)
          }}
        >
          {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
            <Box className={classes.drawer}>
              <Box className={classes.details} p={10}>
                <Form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={6}>
                    <Grid item>
                      <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item>
                          <Typography variant="h2" className={classes.title}>
                            Create Contract
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={props.onclose}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Paper
                        elevation={0}
                        style={{ height: '18rem' }}
                        spacing={5}
                      >
                        <Grid item>
                          <Typography variant="h4">
                            Contract Information
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          spacing={6}
                          style={{ marginTop: '1rem' }}
                        >
                          <Grid item xs={4}>
                            <Field
                              required
                              style={{ width: '100%' }}
                              component={TextField}
                              name="contractNumner"
                              label="CONTRACT NUMBER"
                              disabled
                              value={values.contractNumner}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Field
                              required
                              style={{ width: '100%' }}
                              type="text"
                              label="CONTRACT TYPE"
                              component={TextField}
                              select
                              name="contractType"
                            >
                              {props.masterdata?.contractType?.map((item) => {
                                return (
                                  <MenuItem value={item.name}>
                                    <Typography>{item.name}</Typography>
                                  </MenuItem>
                                );
                              })}{' '}
                              {/* <MenuItem value="Auto-Renewel">
                                <Typography>Auto-Renewel</Typography>
                              </MenuItem>
                              <MenuItem value="Non-ReneWel">
                                <Typography>Non-ReneWel</Typography>
                              </MenuItem>
                              <MenuItem value="Limited">
                                <Typography>Limited</Typography>
                              </MenuItem> */}
                            </Field>
                          </Grid>
                          <Grid item xs={4}>
                            <Field
                              required
                              style={{ width: '100%' }}
                              type="text"
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              label="CONTRACT PERIOD"
                              component={TextField}
                              select
                              name="contractPeriod"
                            >
                              {' '}
                              {props.masterdata?.contractPeriod?.map((item) => {
                                return (
                                  <MenuItem value={item.name}>
                                    <Typography>{item.name}</Typography>
                                  </MenuItem>
                                );
                              })}
                              {/* < */}
                              {/* <MenuItem value="24 months">
                                <Typography>24 months</Typography>
                              </MenuItem> */}
                            </Field>
                          </Grid>
                          <Grid item xs={4}>
                            <Field
                              required
                              style={{ width: '100%' }}
                              type="text"
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              label="NOTICE PERIOD"
                              component={TextField}
                              select
                              name="noticePeriod"
                            >
                              {' '}
                              {props.masterdata?.noticePeriod?.map((item) => {
                                return (
                                  <MenuItem value={item.name}>
                                    <Typography>{item.name}</Typography>
                                  </MenuItem>
                                );
                              })}
                              {/* <MenuItem value="1 month">
                                <Typography>1 month</Typography>
                              </MenuItem>
                              <MenuItem value="2 months">
                                <Typography>2 month</Typography>
                              </MenuItem>
                              <MenuItem value="3 months">
                                <Typography>3 month</Typography>
                              </MenuItem> */}
                            </Field>
                          </Grid>

                          <Grid item xs={4}>
                            <Field
                              required
                              style={{ width: '100%' }}
                              type="text"
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              label="BILLING TYPE"
                              component={TextField}
                              select
                              name="billingType"
                            >
                              {' '}
                              {props.masterdata?.billingStartType?.map(
                                (item) => {
                                  return (
                                    <MenuItem value={item.name}>
                                      <Typography>{item.name}</Typography>
                                    </MenuItem>
                                  );
                                }
                              )}
                              {/* <Field
                              required
                              style={{ width: "100%" }}
                              component={TextField}
                              name="billingType"
                              label="BILLING TYPE"
                            /> */}
                            </Field>{' '}
                          </Grid>
                          <Grid item xs={4}>
                            <KeyboardDatePicker
                              required
                              fullWidth
                              clearable
                              label="CONTRACT VALIDITY"
                              value={values.contractValidity}
                              onChange={(date) =>
                                setFieldValue('contractValidity', date)
                              }
                              minDate={new Date()}
                              format="MM/dd/yyyy"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid container justify="flex-end" spacing={3}>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={props.onclose}
                          endIcon={<NavigateNext />}
                        >
                          Cancel
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          endIcon={<NavigateNext />}
                          // disabled={!isSubmitting}
                        >
                          {isSubmitting ? 'Creating...' : 'Create'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Box>
            </Box>
          )}
        </Formik>
      </Drawer>
    </div>
  );
};

const FormikDatePicker = ({
  name,
  form: { setFieldValue },
  field: { value },
  ...rest
}) => {
  return (
    <DatePicker
      name={name}
      keyboard
      clearable
      autoOk
      label="Masked input"
      format="dd/MM/yyyy"
      placeholder="10/10/2018"
      // handle clearing outside => pass plain array if you are not controlling value outside
      mask={(value) =>
        value
          ? [/[0-3]/, /\d/, '/', /0|1/, /\d/, '/', /1|2/, /\d/, /\d/, /\d/]
          : []
      }
      disableOpenOnEnter
      onChange={(value) => {
        setFieldValue('date', value);
      }}
      value={value}
      animateYearScrolling={false}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(70),
    height: 'auto',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  embedded: {
    display: 'block',
    width: '100%',
    height: '90px',
    // height: "100",
    overflow: 'hidden'
  },
  closeIcon: {
    width: theme.spacing(8),
    cursor: 'pointer',
    color: theme.palette.text.primary
  },
  button: {
    backgroundColor: theme.palette.common.white
  },
  title: {
    fontWeight: 600
  },
  fontcolor: {
    fontWeight: theme.typography.fontWeightBold,
    color: '#777777'
  },
  subfont: {
    color: '#777777'
  },
  selectText: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    width: theme.spacing(4),
    color: theme.palette.common.silver,
    '& svg': {
      path: theme.palette.common.silver
    },
    '& path': {
      path: theme.palette.common.silver
    }
  },
  image: {
    width: '100%',
    height: 'auto',
    overflow: 'hidden'
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#e2e2e2',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: theme.palette.common.textSecondary,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    textAlign: 'center',
    minHeight: '150px',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  },

  drawer: {
    backgroundColor: theme.palette.background.main
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(4)
  },
  chip: {
    color: '#FFFFFF',
    background: '#FFA369'
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  }
}));

export default DrawerForm;

import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';

import {
  Grid,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
  CircularProgress
} from '@material-ui/core';

import CompanyLogo from 'Assets/Icons/building.svg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PrimaryContactDetails from 'Features/360/Partner360/Users/ContactDetails';
import HooksFormWrapper from 'lib/components/HooksFormWrapper/HooksFormWrapper';
import CommonPayload from 'Factory/CommonPayload';
import * as Yup from 'yup';
import CustomHooks from 'lib/CustomHooks/CustomHooks';
import config from 'config';
import NavigateNext from '@material-ui/icons/NavigateNext';

const schema = Yup.object().shape(
  {
    name: Yup.string().required('Name is required.'),
    extensionNumber: Yup.string('extensionNumber  is required'),
    Department: Yup.string('Department  is required'),
    lastName: Yup.string().required('Last Name is required.'),
    designation: Yup.string().required('Designation is required.'),
    // mobileNumber: Yup.string()
    //   .required('Mobile number is required.')
    //   .min(`${config.dev.server.MOBILE_LENGTH}`, 'Invalid mobile number')
    //   .max(`${config.dev.server.MOBILE_LENGTH}`, 'Invalid mobile number')
    //   .matches(
    //     '^(\\+91-|\\+91|0)?\\d{' +
    //       _.get(config, 'dev.server.MOBILE_LENGTH', 10) +
    //       '}$',
    //     'Invalid mobile number.'
    //   ),
    whatsapp: Yup.string()
      .nullable()
      .notRequired()
      .when('whatsapp', {
        is: (value) => value?.length,
        then: (rule) => rule.min(0, 'Min value 0.')
      }),
    // .transform((o, c) => (o === '' ? null : c))
    // .min(10, 'This value must be minimum of 10 characters.'),

    // .matches(/^[0-9]+$/, 'Must be only digits'),

    // .notRequired()
    // // .required('WhatsApp number is required.')
    // .min(
    //   `${config.dev.server.MOBILE_MIN_LENGTH}`,
    //   `WhatsApp Number should be minimum of ${config.dev.server.MOBILE_MIN_LENGTH} digits long`
    // )
    // .max(
    //   `${config.dev.server.MOBILE_LENGTH}`,
    //   `WhatsApp Number should be maximum of ${config.dev.server.MOBILE_LENGTH} digits long`
    // )
    // .matches(/^[0-9]+$/, 'Must be only digits'),

    // matches(/^(\+91-|\+91|0)?\d{10}$/, "Invalid whatsapp number."),
    phoneNumber: Yup.string()
      .nullable()
      .notRequired()
      .when('phoneNumber', {
        is: (value) => value?.length,
        then: (rule) => rule.min(0, 'Min value 0.')
      }),

    // .required('Phone number is required.')

    // .min(
    //   `${config.dev.server.MOBILE_MIN_LENGTH}`,
    //   `Phone Number should be minimum of ${config.dev.server.MOBILE_MIN_LENGTH} digits long`
    // )
    // .max(
    //   `${config.dev.server.MOBILE_LENGTH}`,
    //   `Phone Number should be maximum of ${config.dev.server.MOBILE_LENGTH} digits long`
    // )
    // .matches(/^[0-9]+$/, 'Must be only digits'),
    mobileNumber: Yup.string()
      .required('Mobile number is required.')
      .min(
        `${config.dev.server.MOBILE_MIN_LENGTH}`,
        `Mobile Number should be minimum of ${config.dev.server.MOBILE_MIN_LENGTH} digits long`
      )
      .max(
        `${config.dev.server.MOBILE_LENGTH}`,
        `Mobile Number should be maximum of ${config.dev.server.MOBILE_LENGTH} digits long`
      )
      .matches(/^[0-9]+$/, 'Must be only digits'),

    email: Yup.string('Invalid email address.')
      .email('Invalid email address.')
      .required('Email address is required.'),

    contactMedium: Yup.array()
      .transform(function (o, obj) {
        return Object.keys(obj).filter((k) => obj[k]);
      })
      .min(1, 'Please select an option for contact medium')
  },
  [
    // Add Cyclic deps here because when require itself
    ['whatsapp', 'whatsapp'],
    ['phoneNumber', 'phoneNumber']
  ]
);
export default function AddUser({
  open,
  onClose,
  modalcontext,
  user,
  Add_user,
  loading,
  Modify_user,
  partnerdetails
}) {
  const EditDetails = CustomHooks.CustomUseBoolean(modalcontext?.EditUser);
  const [arraylist, setarraylist] = CustomHooks.CustomUseState([
    { name: 'Email', code: 'email' },
    { name: 'Whatsapp', code: 'whatsapp' },
    { name: 'SMS', code: 'sms' },
    { name: 'Telegram', code: 'telegram' }
  ]);
  React.useEffect(() => {
    if (modalcontext.EditUser) {
      setarraylist(
        _.map(arraylist, (item) => {
          if (_.includes(modalcontext.list?.contactMedium, item.code)) {
            return {
              ...item,
              isActive: true
            };
          } else {
            return item;
          }
        })
      );
    }
  }, [modalcontext]);
  const handleSubmit = (data) => {
    if (modalcontext?.EditUser) {
      Modify_user({
        payload: CommonPayload.addUserpayload(
          data,
          modalcontext,
          partnerdetails
        ),
        partnerlist: partnerdetails
      });
    } else {
      Add_user({
        payload: CommonPayload.addUserpayload(
          data,
          modalcontext,
          partnerdetails
        ),
        // workflowapayload:Worlflowpayload.addUserWorkFlow(data, modalcontext)
        partnerlist: partnerdetails
      });
    }
  };
  return (
    <div>
      <Buttonsheet open={open} onClose={onClose} header={'Add User'}>
        <HooksFormWrapper onSubmit={handleSubmit} validationSchema={schema}>
          {({ register, errors, control, setValue }) => (
            <Box px={10}>
              <Grid
                container
                spacing={2}
                style={{ display: 'flex', alignItems: 'center' }}
                // y={1}
              ></Grid>

              <Grid
                container
                direction="column"
                spacing={3}
                style={{ marginTop: '1rem' }}
              >
                <Grid item>
                  <Paper elevation={0}>
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
                                <img src={CompanyLogo} />
                              </Grid>
                              <Grid item>
                                <Typography variant={'h4'}>
                                  {modalcontext.label}- {modalcontext.code}
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
                  </Paper>
                </Grid>

                <Grid item>
                  <PrimaryContactDetails
                    register={register}
                    EditDetails={EditDetails}
                    control={control}
                    errors={errors}
                    arraylist={arraylist}
                    modalcontext={modalcontext}
                  />
                </Grid>
              </Grid>
              {!EditDetails.value ? (
                <Box py={10} px={3}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    spacing={6}
                  >
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={loading}
                        onClick={onClose}
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
                        style={{ width: '10rem' }}
                        endIcon={<NavigateNext />}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress
                            size={25}
                            style={{ color: 'white' }}
                          />
                        ) : (
                          'Submit'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                ''
              )}
            </Box>
          )}
        </HooksFormWrapper>
      </Buttonsheet>
    </div>
  );
}

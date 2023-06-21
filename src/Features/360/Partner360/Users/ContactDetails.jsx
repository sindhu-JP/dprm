import React from 'react';
import _ from 'lodash';
import { useBoolean } from 'react-hanger';

import CheckboxGroup from 'lib/components/CheckboxGroup';
import telegram from 'Assets/Icons/Telegram.svg';
import whatsapp from 'Assets/Icons/whatsapp.svg';
import email from 'Assets/Icons/mail.svg';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';

const Icons = {
  telegram: telegram,
  sms: telegram,
  email: email,
  whatsapp: whatsapp
};
const PrimaryContactDetails = ({
  register,
  errors,
  control,
  schema,
  options,
  leadsState,
  leadOpen,
  drop,
  contactarray,
  modalcontext,
  EditDetails,
  arraylist,
  partnerDetails
}) => {
  const classes = useStyles();
  const sectionIsValid = useBoolean(false);
  // const [arraylist, setarraylist] = useState([
  //   { name: 'Email', code: 'email' },
  //   { name: 'Whatsapp', code: 'whatsapp' },
  //   { name: 'SMS', code: 'sms' },
  //   { name: 'Telegram', code: 'telegram' }
  // ]);
  // React.useEffect(() => {
  //   if (modalcontext.EditUser) {
  //     setarraylist(
  //       _.map(arraylist, (item) => {
  //         if (_.includes(modalcontext.list?.contactMedium, item.code)) {
  //           return {
  //             ...item,
  //             isActive: true
  //           };
  //         } else {
  //           return item
  //         }
  //       })
  //     );
  //   }
  // }, [modalcontext,]);

  React.useEffect(() => {
    if (partnerDetails) {
      setemail(
        partnerDetails?.PartnerProfileCreation?.PrimaryContactDetails?.EMAIL_ID
      );
    }
  }, [partnerDetails]);
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid
            container
            spacing={6}
            direction="row"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Contact Details
              </Typography>
            </Grid>

            {modalcontext?.EditUser ? (
              <Grid item>
                <IconButton size="small" onClick={() => EditDetails.toggle()}>
                  <CreateOutlinedIcon />
                </IconButton>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <TextField
              required
              InputProps={{ disableUnderline: EditDetails.value }}
              fullWidth
              label="NAME"
              disabled={EditDetails.value}
              variant="standard"
              inputRef={register}
              error={!!errors?.name}
              name="name"
              helperText={_.get(errors, 'name.message', '')}
              defaultValue={modalcontext?.list?.partnerName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              InputProps={{ disableUnderline: EditDetails.value }}
              fullWidth
              label="LAST NAME"
              variant="standard"
              inputRef={register}
              disabled={EditDetails.value}
              error={!!errors?.lastName}
              name="lastName"
              helperText={_.get(errors, 'lastName.message', '')}
              defaultValue={modalcontext?.list?.lastName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              InputProps={{ disableUnderline: EditDetails.value }}
              label="DESIGNATION"
              variant="standard"
              type={'text'}
              disabled={EditDetails.value}
              inputRef={register}
              error={!!errors?.designation}
              name="designation"
              // helperText={_.get(errors, "designation.message", "")}
              //   defaultValue={leadOpen?.?.designation}
              defaultValue={modalcontext?.list?.designation}
            />
          </Grid>
          {modalcontext?.list?.mobile ? (
            <Grid item xs={4}>
              <TextField
                required
                InputProps={{ disableUnderline: EditDetails.value }}
                fullWidth
                label="MOBILE NUMBER"
                variant="standard"
                // disabled={modalcontext?.EditUser}
                type={'number'}
                inputRef={register}
                error={!!errors?.mobileNumber}
                name="mobileNumber"
                value={modalcontext?.list?.mobile}
                helperText={_.get(errors, 'mobileNumber.message', '')}
                //   defaultValue={leadOpen?.?.mobile}
              />
            </Grid>
          ) : (
            <Grid item xs={4}>
              <TextField
                required
                InputProps={{ disableUnderline: EditDetails.value }}
                fullWidth
                label="MOBILE NUMBER"
                variant="standard"
                type={'number'}
                inputRef={register}
                error={!!errors?.mobileNumber}
                name="mobileNumber"
                helperText={_.get(errors, 'mobileNumber.message', '')}
                //   defaultValue={leadOpen?.?.mobile}
              />
            </Grid>
          )}

          {modalcontext?.list?.email ? (
            <Grid item xs={4}>
              <TextField
                required
                InputProps={{ disableUnderline: EditDetails.value }}
                fullWidth
                label="EMAIL"
                // disabled={modalcontext?.EditUser}
                value={modalcontext?.list?.email}
                variant="standard"
                inputRef={register}
                error={!!errors?.email}
                name="email"
                helperText={_.get(errors, 'email.message', '')}

                // defaultValue={leadOpen?.?.email}
              />
            </Grid>
          ) : (
            <Grid item xs={4}>
              <TextField
                required
                InputProps={{ disableUnderline: EditDetails.value }}
                fullWidth
                label="EMAIL"
                disabled={modalcontext?.EditUser}
                variant="standard"
                inputRef={register}
                error={!!errors?.email}
                name="email"
                helperText={_.get(errors, 'email.message', '')}

                // defaultValue={leadOpen?.?.email}
              />
            </Grid>
          )}
          <Grid item xs={4}>
            <TextField
              // required
              fullWidth
              disabled={EditDetails.value}
              InputProps={{ disableUnderline: EditDetails.value }}
              label="WHATSAPP"
              variant="standard"
              type={'number'}
              inputRef={register}
              error={!!errors?.whatsapp}
              name="whatsapp"
              defaultValue={modalcontext?.list?.whatsapp}
              helperText={_.get(errors, 'whatsapp.message', '')}
              //   defaultValue={leadOpen?.?.whatsapp}
            />
          </Grid>

          {/* <Grid container spacing={6}> */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              InputProps={{ disableUnderline: EditDetails.value }}
              label="PHONE NUMBER"
              disabled={EditDetails.value}
              variant="standard"
              //   inputProps={{ maxLength: (_.get(config, 'dev.uiConfig.fieldLengths.mobile', 10)) }}
              //   onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
              inputRef={register}
              error={!!errors?.phoneNumber}
              name="phoneNumber"
              helperText={_.get(errors, 'phoneNumber.message', '')}
              defaultValue={modalcontext?.list?.phoneNumber}
              //   defaultValue={leadOpen?.?.phoneNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="EXTENSION NUMBER "
              variant="standard"
              InputProps={{ disableUnderline: EditDetails.value }}
              disabled={EditDetails.value}
              //   inputProps={
              //     {maxLength: 10}
              //   }
              //   onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
              inputRef={register}
              error={!!errors?.extensionNumber}
              name="extensionNumber"
              helperText={_.get(errors, 'extensionNumber.message', '')}
              defaultValue={modalcontext?.list?.extensionNumber}
              //   defaultValue={leadOpen?.?.extensionNumber}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="DEPARTMENT"
              disabled={EditDetails.value}
              variant="standard"
              InputProps={{ disableUnderline: EditDetails.value }}
              inputRef={register}
              error={!!errors?.Department}
              defaultValue={modalcontext?.list?.Department}
              name="department"
              helperText={_.get(errors, 'Department.message', '')}
              //   defaultValue={leadOpen?.?.designation}
            />
            {/* </Grid> */}
          </Grid>
          <Grid item xs={12}>
            {!EditDetails.value && (
              <Box mb={4}>
                <Typography variant="h4" className={classes.title}>
                  Contact Medium <span className={classes.starmark}>*</span>
                </Typography>
              </Box>
            )}

            {!EditDetails.value &&
              arraylist.map((option, index) => {
                // if (option.isActive == true) {
                return (
                  <CheckboxGroup
                    //  disabled={ true}
                    key={index}
                    control={control}
                    name={`contactMedium.${option.code}`}
                    label={option.name}
                    inputProps={{
                      readOnly: true,
                      'aria-label': 'primary checkbox'
                    }}
                    defaultValue={option.isActive}
                  />
                );
              })}

            {errors?.contactMedium?.message && (
              <div style={{ color: 'red' }}>
                {_.get(errors, 'contactMedium.message', '')}
              </div>
            )}

            {EditDetails.value && modalcontext?.list?.contactMedium && (
              <React.Fragment>
                <Box mb={6} mt={12}>
                  <Typography variant="h4" className={classes.title}>
                    Contact Medium
                  </Typography>
                </Box>

                <Grid container spacing={6}>
                  {modalcontext?.list?.contactMedium?.map((medium) => (
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <img src={Icons[medium]} />
                        </Grid>

                        <Grid item>{medium}</Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold'
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  },
  starmark: {
    color: 'red'
  }
}));

PrimaryContactDetails.propTypes = {};

export default connect((state) => ({
  // leadsState: state.leads,
}))(PrimaryContactDetails);
// export default PrimaryContactDetails;

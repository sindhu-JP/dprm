import React from 'react';
import _ from 'lodash';
import {
  TextField,
  makeStyles
} from '@material-ui/core';

const ModifiedAutocomplete = ({ name, errors, control, options, register }) => {
  const classes = useStyles();

  const autoOptions = [
    { name: 'HR Manger', givenName: 'SSOIndividual', id: 'QA', code: 'QA' },
    {
      name: 'Sale Manager',
      givenName: 'SSOIndividual',
      id: 'sahana',
      code: 'sahana'
    }
  ];

  return (
    <TextField
      required
      fullWidth
      label="Role"
      variant="standard"
      control={control}
      inputRef={register}
      error={!!errors.designation}
      name={name}
      helperText={_.get(errors, 'moreContact.message', '')}
    />
    // <Autocomplete
    //   error={!!errors.designation}
    //   helperText={_.get(errors, "moreContact.message", "")}
    //   name={name}
    //   options={autoOptions}
    //   variant="standard"
    //   control={control}
    //   autocompleteProps={{
    //     classes: {
    //       input: classes.inputs,
    //       options: classes.options,
    //     },
    //   }}
    //   inputProps={{
    //     InputProps: {
    //       disableUnderline: true,
    //     },
    //   }}
    // />
  );
};

// const AdditionalContact = ({
//   register,
//   errors,
//   control,
//   id,
//   schema,
//   options,
//   removecontact,
//   validatingcontact
// }) => {
//   const classes = useStyles();
//   const [ErrorMsg, setErrorMsg] = useState({
//     mobileNumber: '',
//     whatsapp: '',
//     phoneNumber: '',
//     telegram: ''
//   });

//   const values = useWatch({
//     control,
//     name: 'moreContact'
//   });
//   // const value = useWatch({
//   //   control,
//   //   name: `AdditionalContact`,
//   // });
//   const sectionIsValid = useBoolean(false);
//   React.useEffect(() => {
//     sectionValidator({
//       value: {
//         AdditionalContact: { ...values }
//       },
//       schema,
//       sectionName: 'AdditionalContact',
//       onFaliure: sectionIsValid.setFalse,
//       onSuccess: sectionIsValid.setTrue
//     });
//     if (ErrorMsg) {
//       if (_.values(ErrorMsg).every(_.isEmpty)) {
//         validatingcontact.setTrue();
//       } else {
//         validatingcontact.setFalse();
//       }
//       // Object.keys(ErrorMsg).map(item=>{
//       //    if(ErrorMsg[item]){

//       //       validatingcontact.setFalse()
//       //    }
//       //   //  else{

//       //   //   validatingcontact.setFalse()
//       //   //  }
//       // })
//     }

//     if (values) {
//     }
//   }, [values, ErrorMsg]);

//   const handleChange = (e, value) => {
//     var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

//     if (e.target.value.match(phoneno)) {
//       setErrorMsg({
//         ...ErrorMsg,
//         [value]: ''
//       });
//     } else {
//       setErrorMsg({
//         ...ErrorMsg,
//         [value]: `Please Enter  valid  Number `
//       });
//     }
//   };

//   return (
//     <Paper elevation={0}>
//       <Box p={4}>
//         <Grid container justify="space-between">
//           <Grid item>
//             <Typography variant="h2" className={classes.title}>
//               Additional Contact
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button
//               color="primary"
//               startIcon={<DeleteIcon />}
//               onClick={() => {
//                 validatingcontact.setTrue();
//                 removecontact(id);
//               }}
//             >
//               Remove Contract
//             </Button>
//           </Grid>
//         </Grid>

//         <Grid container direction="column" spacing={6}>
//           <Grid item xs={4}>
//             <ModifiedAutocomplete
//               errors={errors}
//               control={control}
//               options={options}
//               name={`moreContact.${id}.role`}
//               register={register}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container spacing={6}>
//               <Grid item xs={4}>
//                 <TextField
//                   required
//                   control={control}
//                   fullWidth
//                   label="Name"
//                   variant="standard"
//                   inputRef={register}
//                   error={!!errors?.name}
//                   name={`moreContact.${id}.name`}
//                   helperText={_.get(errors, 'name.message', '')}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   control={control}
//                   label="Last Name"
//                   variant="standard"
//                   inputRef={register}
//                   error={!!errors?.lastName}
//                   name={`moreContact.${id}.lastName`}
//                   helperText={_.get(errors, 'lastName.message', '')}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   control={control}
//                   label="Mobile Number"
//                   variant="standard"
//                   // inputProps={{type:"number"}}
//                   error={!!errors.terminal_id}
//                   inputProps={{
//                     maxLength: _.get(
//                       config,
//                       'dev.uiConfig.fieldLengths.mobile',
//                       10
//                     )
//                   }}
//                   onChange={(e) => handleChange(e, 'mobileNumber')}
//                   // onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
//                   // innerRef={register({
//                   //   required: true,
//                   //   maxLength: {
//                   //     value: 10,
//                   //     message: 'Your title cannot exceed 30 characters',
//                   //   },
//                   //   minLength: {
//                   //     value:  10,
//                   //     message: 'Your title must be at least 2 letters',
//                   //   },
//                   // })}
//                   // onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}

//                   error={!!errors?.mobileNumber}
//                   name={`moreContact.${id}.mobileNumber`}
//                   helperText={_.get(errors, 'mobileNumber.message', '')}
//                 />
//                 {ErrorMsg && ErrorMsg.mobileNumber ? (
//                   <p style={{ color: 'red' }}>{ErrorMsg.mobileNumber}</p>
//                 ) : null}
//               </Grid>

//               <Grid item xs={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   control={control}
//                   label="Email"
//                   type={'email'}
//                   variant="standard"
//                   inputRef={register}
//                   error={!!errors?.email}
//                   name={`moreContact.${id}.email`}
//                   helperText={_.get(errors, 'email.message', '')}
//                   // error={!!errors?.[`moreContact.${id}.email`]}
//                   // name={`moreContact.${id}.email`}
//                   // helperText={_.get(
//                   //   errors,
//                   //   `moreContact.${id}.email.message`,
//                   //   ""
//                   // )}
//                 />
//               </Grid>

//               <Grid item xs={4}>
//                 <TextField
//                   control={control}
//                   fullWidth
//                   label="Whatsapp"
//                   variant="standard"
//                   onChange={(e) => handleChange(e, 'whatsapp')}
//                   inputProps={{
//                     maxLength: _.get(
//                       config,
//                       'dev.uiConfig.fieldLengths.mobile',
//                       10
//                     )
//                   }}
//                   // onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
//                   inputRef={register}
//                   error={!!errors?.whatsapp}
//                   name={`moreContact.${id}.whatsapp`}
//                   helperText={_.get(errors, 'whatsapp.message', '')}
//                   // error={!!errors?.[`moreContact.${id}.whatsapp`]}
//                   // name={`moreContact.${id}.whatsapp`}
//                   // helperText={_.get(
//                   //   errors,
//                   //   `moreContact.${id}.whatsapp.message`,
//                   //   ""
//                   // )}
//                 />
//                 {ErrorMsg && ErrorMsg.whatsapp ? (
//                   <p style={{ color: 'red' }}>{ErrorMsg.whatsapp}</p>
//                 ) : null}
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   control={control}
//                   fullWidth
//                   label="Telegram"
//                   variant="standard"
//                   inputRef={register}
//                   inputProps={{
//                     maxLength: _.get(
//                       config,
//                       'dev.uiConfig.fieldLengths.mobile',
//                       10
//                     )
//                   }}
//                   onChange={(e) => handleChange(e, 'telegram')}
//                   // onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
//                   error={!!errors?.telegram}
//                   name={`moreContact.${id}.telegram`}
//                   helperText={_.get(errors, 'telegram.message', '')}
//                   // error={!!errors?.[`moreContact.${id}.telegram`]}
//                   // name={`moreContact.${id}.telegram`}
//                   // helperText={_.get(
//                   //   errors,
//                   //   `moreContact.${id}.telegram.message`,
//                   //   ""
//                   // )}
//                 />
//                 {ErrorMsg && ErrorMsg.telegram ? (
//                   <p style={{ color: 'red' }}>{ErrorMsg.telegram}</p>
//                 ) : null}
//               </Grid>

//               <Grid item xs={4}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Phone Number"
//                   variant="standard"
//                   inputProps={{
//                     maxLength: _.get(
//                       config,
//                       'dev.uiConfig.fieldLengths.mobile',
//                       10
//                     )
//                   }}
//                   onChange={(e) => handleChange(e, 'phoneNumber')}
//                   // onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
//                   inputRef={register}
//                   error={!!errors?.phoneNumber}
//                   name={`moreContact.${id}.phoneNumber`}
//                   helperText={_.get(errors, 'phoneNumber.message', '')}
//                 />
//                 {ErrorMsg && ErrorMsg.phoneNumber ? (
//                   <p style={{ color: 'red' }}>{ErrorMsg.phoneNumber}</p>
//                 ) : null}
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   fullWidth
//                   required
//                   inputProps={{ maxLength: 10 }}
//                   // onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
//                   label="Extension Number"
//                   variant="standard"
//                   inputRef={register}
//                   error={!!errors?.extensionNumber}
//                   name={`moreContact.${id}.extensionNumber`}
//                   helperText={_.get(errors, 'extensionNumber.message', '')}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <TextField
//                   fullWidth
//                   required
//                   label="Department"
//                   variant="standard"
//                   inputRef={register}
//                   error={!!errors?.Department}
//                   name={`moreContact.${id}.department`}
//                   helperText={_.get(errors, 'Department.message', '')}
//                 />
//                 {/* </Grid> */}
//               </Grid>
//               <Grid item xs={12}>
//                 <Box mb={4}>
//                   <Typography variant="h4" className={classes.title}>
//                     Contact Medium
//                   </Typography>
//                 </Box>
//                 {[
//                   { name: 'Email', code: 'email' },
//                   { name: 'Whatsapp', code: 'whatsapp' },
//                   { name: 'SMS', code: 'sms' },
//                   { name: 'Telegram', code: 'telegram' }
//                 ].map((option, index) => (
//                   <CheckboxGroup
//                     key={index}
//                     control={control}
//                     name={`moreContact.${id}.contactMedium.${option.code}`}
//                     label={option.name}
//                   />
//                 ))}
//                 {!sectionIsValid.value && (
//                   <div style={{ color: 'red' }}>
//                     {_.get(errors, 'contactMedium.message', '')}
//                   </div>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           {/* <Grid item xs={12}>

//           </Grid> */}
//         </Grid>
//       </Box>
//     </Paper>
//   );
// };

const useStyles = makeStyles((theme) => ({
  inputs: {
    color: 'green',
    fontSize: `${theme.spacing(5)}`,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  options: {
    color: 'green',
    fontSize: `${theme.spacing(5)}`,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  }
}));

export default AdditionalContact;

// import React from "react";
// import PropTypes from "prop-types";
// import { useStateful } from "react-hanger";
// import { useField } from "formik";
// import { SolidDropdown } from "lib/components/Dropdowns";
// import { Tecnovos } from "Http/axios";
// import { Check, DeleteForeverOutlined } from "@material-ui/icons";
// import {
//   Box,
//   Grid,
//   Paper,
//   Button,
//   Typography,
//   IconButton,
//   makeStyles,
// } from "@material-ui/core";

// const AdditionalSection = ({
//   roles,
//   temporary,
//   name,
//   values,
//   onDeleteSection,
//   ...props
// }) => {
//   const classes = useStyles();
//   const [field, meta, helpers] = useField(props);

// const onRoleSelection = (e) => {
//   if (temporary) {
//     field.onChange({
//       target: { name: "primaryContactDetails.placeholder", value: false },
//     });
//     field.onChange({
//       target: {
//         name: `primaryContactDetails.moreContact.${e.target.value}`,
//         value: {
//           selection: {
//             name: e.target.name,
//             value: e.target.value,
//           },
//           name: "",
//           lastName: "",
//           email: "",
//           mobileNumber: "",
//           whatsapp: "",
//         },
//       },
//     });
//   }
// };

//   return (
//     <Paper elevation={0}>
//       <Box p={6}>
//         <Box>
//           <Grid container justify="space-between">
//             <Grid item xs={4}>
//               {/* <SolidDropdown
//                 options={roles?.map((role) => ({
//                   label: role.roleName,
//                   value: role.id,
//                 }))}
//                 onChange={onRoleSelection}
//                 value={values?.selection?.value}
//                 name="role"
//                 displayEmpty
//               /> */}
//             </Grid>
//             <Grid item>
//               <Grid
//                 container
//                 direction="row"
//                 alignItems="center"
//                 className={classes.deleteIcon}
//                 onClick={onDeleteSection}
//               >
//                 <Grid item>
//                   <IconButton size="small">
//                     <DeleteForeverOutlined />
//                   </IconButton>
//                 </Grid>
//                 <Grid item>
//                   <Typography
//                     display="inline"
//                     className={classes.deleteIcon}
//                     variant="h5"
//                   >
//                     Remove Contact
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Box>

//         <Grid container spacing={6}>
//           <Grid item xs={4}>
//             {/* <FormikTextField
//               fullWidth
//               required
//               label="NAME"
//               name={`primaryContactDetails.moreContact.${name}.name`}
//             /> */}
//           </Grid>
//           <Grid item xs={4}>
//             {/* <FormikTextField
//               fullWidth
//               required
//               label="LAST NAME"
//               name={`primaryContactDetails.moreContact.${name}.lastName`}
//             /> */}
//           </Grid>
//           <Grid item xs={4}>
//             {/* <FormikTextField
//               fullWidth
//               required
//               label="MOBILE NUMBER"
//               name={`primaryContactDetails.moreContact.${name}.mobileNumber`}
//             /> */}
//           </Grid>
//           <Grid item xs={4}>
//             {/* <FormikTextField
//               fullWidth
//               required
//               label="EMAIL"
//               name={`primaryContactDetails.moreContact.${name}.email`}
//             /> */}
//           </Grid>
//           <Grid item xs={4}>
//             {/* <FormikTextField
//               fullWidth
//               required
//               label="WHATSAPP"
//               name={`primaryContactDetails.moreContact.${name}.whatsapp`}
//             /> */}
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// };

// const AdditionalContact = ({ values, ...props }) => {
//   const classes = useStyles();
//   const [field] = useField();
//   const roles = useStateful("");

//   const onAddingContact = () => {
//     field.onChange({
//       target: {
//         name: `primaryContactDetails.placeholder`,
//         value: true,
//       },
//     });
//   };

//   const loadRoles = async () => {
//     try {
//       const response = await Tecnovos.get("/roles");
//       roles.setValue(response.data);
//     } catch (err) {
//
//     }
//   };

//   const handleSectionDelete = (contact) => {
//     const contacts = {};

//     Object.keys(values.moreContact)
//       .filter((cont) => cont !== contact)
//       .map((cont) => {
//         contacts[cont] = values.moreContact[cont];
//       });

//     field.onChange({
//       target: {
//         name: "primaryContactDetails",
//         value: {
//           ...values,
//           moreContact: contacts,
//         },
//       },
//     });
//   };

//   React.useEffect(() => {
//     loadRoles();
//   }, []);

//   return (
//     <Grid container direction="column" spacing={6}>
//       {Object.keys(values.moreContact)?.map((contact, index) => (
//         <Grid item key={index}>
//           <AdditionalSection
//             roles={roles.value}
//             values={values.moreContact[contact]}
//             name={contact}
//             onDeleteSection={() => handleSectionDelete(contact)}
//           />
//         </Grid>
//       ))}
//       <Grid item>
//         {values.placeholder && (
//           <AdditionalSection roles={roles.value} temporary={true} />
//         )}
//       </Grid>
//       <Grid item>
//         <Paper elevation={0}>
//           <Box p={6}>
//             <Grid container justify="space-between" alignItems="center">
//               <Grid item>
//                 <Typography variant="h2" className={classes.title}>
//                   Add Another Contact
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Button
//                   variant="outlined"
//                   size="large"
//                   color="primary"
//                   onClick={onAddingContact}
//                 >
//                   Add
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// const useStyles = makeStyles((theme) => ({
//   title: {
//     fontWeight: theme.typography.fontWeightBold,
//   },
//   icon: {
//     backgroundColor: theme.palette.success.main,
//     color: theme.palette.success.contrastText,
//     "& svg": {
//       fill: theme.palette.common.white,
//       stroke: theme.palette.common.white,
//     },
//   },
//   deleteIcon: {
//     color: theme.palette.primary.main,
//     cursor: "pointer",
//   },
//   autocomplete: {
//     "& input": {
//       fontSize: theme.spacing(6),
//       fontWeight: theme.typography.fontWeightBold,
//     },

//     "& input:before": {
//       borderBottom: "1px solid transparent",
//     },
//   },
// }));

// export default AdditionalContact;

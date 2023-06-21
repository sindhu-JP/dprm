// import React, { useState, useEffect } from 'react';
// import _map from 'lodash/map';
// import _some from 'lodash/some';

// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import Radio from '@material-ui/core/Radio';
// import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import { FormControl } from '@material-ui/core';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { withStyles } from '@material-ui/core/styles';
// import ClearIcon from '@material-ui/icons/Clear';
// import Paper from '@material-ui/core/Paper';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker
// } from '@material-ui/pickers';
// import AttachmentIcon from '@material-ui/icons/AttachFile';
// import { i18n } from '@lingui/core';
// import classNames from 'classnames';
// import { Trans } from '@lingui/macro';
// import constants from 'common/constants/constants';
// import Warning from 'common/components/Warning';
// import Visible from 'common/components/Visible';
// import { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Title from './Title';
// // import SearchResult from './SearchResult';
// import AdditionalCharacteristics from './AdditionalCharacteristics';
// import DublicateTicketDialog from './DublicateTicketDialog';
// import { getDublicateTickets } from 'common/services/api';
// import { ThemeProvider, createTheme } from '@material-ui/core/styles';
// import SVGIcon from 'common/components/SVGIcon/SVGIcon';
// import config from 'config';

// const defaultTheme = createTheme();
// const theme = createTheme({
//   overrides: {
//     MuiInputLabel: {
//       formControl: {
//         fontSize: '16px',
//         color: defaultTheme.palette.text.primary
//       }
//     },
//     MuiInputBase: {
//       input: {
//         fontSize: '16px',
//         color: defaultTheme.palette.text.primary
//       }
//     }
//   }
// });

// const styles = (theme) => ({
//   buttonProgress: {
//     position: 'absolute',
//     color: theme.palette.success.main,
//     right: theme.spacing(11)
//   },
//   loader: {
//     color: theme.palette.success.main
//   },
//   radioGrp: {
//     background: theme.palette.background.inactive
//   },
//   accountData: {
//     background: theme.palette.background.main,
//     borderRadius: theme.spacing(2)
//   },
//   iconClearSearch: {
//     float: 'right',
//     position: 'absolute',
//     left: theme.spacing(73),
//     background: theme.palette.common.white,
//     '&:hover': {
//       background: theme.palette.common.white
//     }
//   },
//   // result: {
//   //   width: '30%',
//   //   position: 'absolute',
//   //   zIndex: 1,
//   //   height: 'fitContent',
//   //   overflowY: 'auto'
//   // },
//   row: {
//     cursor: 'pointer',
//     '&:hover': {
//       background: theme.palette.errorMain
//     }
//   },
//   autoComplete: {
//     borderRadius: '0px'
//   },
//   recommendationBtn: {
//     backgroundColor: theme.palette.error.main,
//     color: theme.palette.common.white,
//     '&:hover': {
//       background: theme.palette.error.main
//     }
//   },
//   customerDetailsCard: {
//     background: theme.palette.background.inactive
//   },
//   textField: {
//     margin: theme.spacing(5),
//     width: 200
//   },
//   phnNumberTextField: {
//     margin: theme.spacing(3.5),
//     width: 200
//   },
//   timeValidationError: {
//     color: theme.palette.error.main
//   },
//   datePickerColor: {
//     color: 'none'
//   },
//   asteriskColor: {
//     color: theme.palette.error.main
//   }
// });

// const MinimizeLogTicket = (props) => {
//   const {
//     ticketTypesList,
//     reasonForCallList,
//     statusList,
//     loadCategoriesList,
//     loadSubcategories,
//     onRemedyChange,
//     getCategoriesFromChildCategoryId,
//     clearCategoriesFromChildCategory,
//     category,
//     setCategory,
//     subCategory,
//     setSubCategory,
//     searchCategory,
//     setSearchCategory,
//     getSubCategories,
//     allCatDropdownData,
//     selectedCatArr,
//     handleSelectCategory,
//     characteristics,
//     setCharacteristics,
//     callLogCauseAndCategories,
//     callLogPayload,
//     showLogTicketUI,
//     customerDetails
//   } = props;

//   const [type, setType] = useState('Complaint');
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [resolution, setResolution] = useState('');
//   const [cause, setCause] = useState('');
//   const [response, setResponse] = useState('');
//   const [notify, setNotify] = useState('EM');
//   const [isFollowup, setFollowup] = useState('no');
//   const [call, setCall] = useState('HC');
//   const [notes, setNotes] = useState('');
//   const [priority, setPriority] = useState('');
//   const [attributeValidation, setAttributeValidation] = useState(false);
//   const [isDublicateDialogOpen, setDublicateModalOpen] = useState(false);

//   let mandatoryAttributes = [];

//   useEffect(() => {
//     if (statusList) {
//       setResolution(statusList[0].code);
//     }
//   }, []);

//   const handleSelect = (e, action) => {
//     action(e.target.value);
//   };
//   const handleNotes = (e) => {
//     e.target.value === 'no' ? setNotes('') : null;
//   };
//   const followupOptions = [
//     { code: 'no', name: <Trans>No</Trans> },
//     { code: 'yes', name: <Trans>Yes</Trans> }
//   ];

//   const updateCharacteristics = (characteristics) => {
//     let newData = [];
//     setCharacteristics(characteristics);
//     characteristics.length &&
//       characteristics.map((data) => {
//         if (data.mandatory === true) {
//           mandatoryAttributes.push(data);
//         }
//       });
//     mandatoryAttributes.length &&
//       mandatoryAttributes.map((data) => {
//         if (data?.value) {
//           newData.push(data);
//         }
//       });
//     if (mandatoryAttributes?.length === newData?.length) {
//       setAttributeValidation(false);
//     } else {
//       setAttributeValidation(true);
//     }
//   };

//   const setCatRelatedValues = (item) => {
//     setPriority(item && item.priority);
//     // onRemedyChange(item.postToThirdParty);
//     setCharacteristics(item.categoryCharacteristic || []);
//     setMenuOpen(false);
//     if (item.categoryCharacteristic.length > 0) {
//       item.categoryCharacteristic.map((data) => {
//         if (data.mandatory === true) {
//           mandatoryAttributes.push(data);
//           setAttributeValidation(true);
//         }
//       });
//     } else {
//       setAttributeValidation(false);
//     }
//   };
//   const handleProceed = () => {
//     if (showLogTicketUI) {
//       setDublicateModalOpen(false);
//       props.onSubmit({
//         searchCategory: selectedCatArr[selectedCatArr.length - 1],
//         category: showLogTicketUI
//           ? selectedCatArr[0]
//           : callLogPayload.callLogCategory.name,
//         type,
//         resolution,
//         cause,
//         response,
//         notify,
//         call,
//         isFollowup,
//         notes,
//         characteristics,
//         priority,
//         isLogTicket: showLogTicketUI
//       });
//     } else {
//       props.onMaximize();
//     }
//   };

//   const checkIsDublicateCat = async () => {
//     const query = `category*=${selectedCatArr[0].id},${
//       selectedCatArr[selectedCatArr.length - 1].id
//     }&customerId=${props.customerId}&productId=${
//       props.productId
//     }&publicIdentifier=${props.publicIdentifier}`;
//     const dublicateTicket = await getDublicateTickets('troubleTicket', query);
//     if (dublicateTicket.length) {
//       setDublicateModalOpen(true);
//     } else {
//       handleProceed();
//     }
//   };

//   const filterOptions = createFilterOptions({
//     ignoreCase: false
//   });
//   return (
//     <Grid container direction="column" justifyContent="center">
//       <Grid item className={props.classes.radioGrp}>
//         <Box my={3} mx={5}>
//           <Grid container direction="row" justify="space-between">
//             <Grid item>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   name="ticketType"
//                   className="inSameline"
//                   onChange={(e) => {
//                     handleSelect(e, setType);
//                     setSearchCategory('');
//                     setCategory([]);
//                     setSubCategory([]);
//                     loadCategoriesList(e.target.value);
//                     loadSubcategories(e.target.value);
//                   }}
//                   value={type}
//                 >
//                   {ticketTypesList &&
//                     ticketTypesList.map((item, index) => {
//                       return (
//                         <FormControlLabel
//                           key={item.code}
//                           value={item.name}
//                           control={<Radio />}
//                           label={item.name}
//                         />
//                       );
//                     })}
//                 </RadioGroup>
//               </FormControl>
//             </Grid>
//             <Grid item>
//               {selectedCatArr.length >= 2 ? (
//                 <Button
//                   className={props.classes.recommendationBtn}
//                   variant="contained"
//                   onClick={props.onMaximize}
//                 >
//                   <Trans>Recommendation</Trans>
//                 </Button>
//               ) : null}
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//       <Grid item>
//         <Box my={5} mx={5}>
//           <Grid container spacing={3} direction="row">
//             {allCatDropdownData.length
//               ? allCatDropdownData.map((options, index) => (
//                   <Grid item xs={4} key={index}>
//                     <Autocomplete
//                       classes={{ paper: props.classes.autoComplete }}
//                       value={selectedCatArr[index] || {}}
//                       options={options}
//                       getOptionLabel={(option) => option.name}
//                       filterOptions={filterOptions}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label={
//                             !index ? (
//                               <Trans>Parent Category</Trans>
//                             ) : (
//                               <Trans>Sub Category</Trans>
//                             )
//                           }
//                         />
//                       )}
//                       onChange={(e, value) => {
//                         handleSelectCategory(value, index);
//                         setCatRelatedValues(value);
//                       }}
//                     />
//                   </Grid>
//                 ))
//               : null}

//             <Visible when={characteristics.length}>
//               <Grid item xs={12}>
//                 <AdditionalCharacteristics
//                   characteristics={characteristics}
//                   onChange={updateCharacteristics}
//                 />
//               </Grid>
//             </Visible>
//           </Grid>
//         </Box>
//       </Grid>
//       <Grid item>
//         {props.account && (
//           <Box my={3} mx={5} py={5} className={props.classes.accountData}>
//             <Grid
//               container
//               direction="row"
//               justifyContent="flex-start"
//               alignItems="center"
//             >
//               <Grid item>
//                 <Box mr={6}>
//                   <Typography
//                     variant="body1"
//                     className={classNames('semiBold', 'pl10')}
//                   >
//                     <Trans>Account</Trans>: {props.accountId}
//                   </Typography>
//                 </Box>
//               </Grid>
//               {props.publicIdentifier && (
//                 <Grid item>
//                   <Box mr={6}>
//                     <Typography variant="body1" className="semiBold">
//                       <Trans>Service ID</Trans>: {props.publicIdentifier}
//                     </Typography>
//                   </Box>
//                 </Grid>
//               )}
//             </Grid>
//           </Box>
//         )}
//       </Grid>
//       <Grid item>
//         <Box py={4} mx={5}>
//           <Grid container direction="row" spacing={4}>
//             {(type === constants.troubleTicketTypes.COMPLAINT ||
//               type === constants.troubleTicketTypes.REQUEST) && (
//               <Grid item xs={12}>
//                 {props.relatedTicketCount ? (
//                   <Warning
//                     enableViewTicket
//                     viewAction={props.onMaximize}
//                     warningText={
//                       <>
//                         {`${props.relatedTicketCount}`}{' '}
//                         <Trans>similar related tickets exist</Trans>
//                       </>
//                     }
//                   />
//                 ) : null}
//                 <Title
//                   title={<Trans>DESCRIPTION</Trans>}
//                   rootClassName={props.classes.tooltip}
//                   variant="button"
//                 >
//                   <InputBase
//                     className="grayText"
//                     placeholder={i18n._('Describe the trouble here')}
//                     multiline
//                     fullWidth
//                     rows={20}
//                     rowsMax={5}
//                     value={props.description}
//                     onChange={props.onChange}
//                     name="description"
//                   />
//                 </Title>
//               </Grid>
//             )}
//             {type === constants.troubleTicketTypes.QUERY && (
//               <Grid item xs={12}>
//                 <Grid container direction="column">
//                   <form autoComplete="off">
//                     <Grid item>
//                       <Grid
//                         container
//                         direction="row"
//                         justifyContent="space-between"
//                         spacing={3}
//                       >
//                         <Grid item xs={6}>
//                           <TextField
//                             type="text"
//                             label={<Trans>Cause</Trans>}
//                             fullWidth
//                             value={cause}
//                             onChange={(e) => handleSelect(e, setCause)}
//                           />
//                         </Grid>
//                         <Grid item xs={6}>
//                           <TextField
//                             label={<Trans>Resolution</Trans>}
//                             select
//                             fullWidth
//                             value={resolution}
//                             onChange={(e) => handleSelect(e, setResolution)}
//                           >
//                             {_map(statusList, (item) => (
//                               <MenuItem value={item.code} key={item.code}>
//                                 <Typography variant="body1">
//                                   {item.name}
//                                 </Typography>
//                               </MenuItem>
//                             ))}
//                           </TextField>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                     {resolution !== 'Resolved' && (
//                       <>
//                         <Grid item>
//                           <Box my={4}>
//                             <Grid
//                               container
//                               direction="row"
//                               justifyContent="space-between"
//                               spacing={3}
//                             >
//                               <Grid item xs={6}>
//                                 <TextField
//                                   label={<Trans>Response</Trans>}
//                                   fullWidth
//                                   value={response}
//                                   onChange={(e) => handleSelect(e, setResponse)}
//                                 />
//                               </Grid>
//                               <Grid item xs={6}>
//                                 <TextField
//                                   label={<Trans>Notify Customer</Trans>}
//                                   select
//                                   fullWidth
//                                   value={notify}
//                                   onChange={(e) => handleSelect(e, setNotify)}
//                                 >
//                                   {_map(reasonForCallList, (item) => (
//                                     <MenuItem
//                                       value={item.sourceFromId}
//                                       key={item.sourceFromId}
//                                     >
//                                       <Typography variant="body1">
//                                         {item.sourceFromName}
//                                       </Typography>
//                                     </MenuItem>
//                                   ))}
//                                 </TextField>
//                               </Grid>
//                             </Grid>
//                           </Box>
//                         </Grid>
//                         <Grid item>
//                           <Box my={4}>
//                             <Grid
//                               container
//                               direction="row"
//                               justifyContent="space-between"
//                               spacing={3}
//                             >
//                               <Grid item xs={6}>
//                                 <TextField
//                                   label={<Trans>Reason for Call</Trans>}
//                                   select
//                                   fullWidth
//                                   value={call}
//                                   onChange={(e) => handleSelect(e, setCall)}
//                                 >
//                                   {_map(reasonForCallList, (item) => (
//                                     <MenuItem
//                                       value={item.sourceFromId}
//                                       key={item.sourceFromId}
//                                     >
//                                       <Typography variant="body1">
//                                         {item.sourceFromName}
//                                       </Typography>
//                                     </MenuItem>
//                                   ))}
//                                 </TextField>
//                               </Grid>
//                               <Grid item xs={6}>
//                                 <TextField
//                                   label={<Trans>Followup required</Trans>}
//                                   select
//                                   fullWidth
//                                   value={isFollowup}
//                                   onChange={(e) => {
//                                     handleSelect(e, setFollowup);
//                                     handleNotes(e);
//                                   }}
//                                 >
//                                   {_map(followupOptions, (item) => (
//                                     <MenuItem value={item.code} key={item.code}>
//                                       <Typography variant="body1">
//                                         {item.name}
//                                       </Typography>
//                                     </MenuItem>
//                                   ))}
//                                 </TextField>
//                               </Grid>
//                             </Grid>
//                           </Box>
//                           {isFollowup === 'yes' && (
//                             <Grid item>
//                               <Box my={4}>
//                                 <Grid
//                                   container
//                                   direction="row"
//                                   justifyContent="space-between"
//                                   spacing={6}
//                                 >
//                                   <Grid item xs={6}>
//                                     <TextField
//                                       label={<Trans>Followup notes</Trans>}
//                                       fullWidth
//                                       value={notes}
//                                       onChange={(e) =>
//                                         handleSelect(e, setNotes)
//                                       }
//                                     />
//                                   </Grid>
//                                 </Grid>
//                               </Box>
//                             </Grid>
//                           )}
//                         </Grid>
//                       </>
//                     )}
//                   </form>
//                 </Grid>
//               </Grid>
//             )}
//           </Grid>
//         </Box>
//       </Grid>
//       <Grid>
//         <Box px={10} pb={25}>
//           <Grid container direction="column" spacing={6}>
//             {props.fileNames.length > 0 &&
//               props.fileNames.map((fileName, index) => (
//                 <Grid item key={index}>
//                   <Box p={2} className={props.classes.attachmentRoot}>
//                     <Grid
//                       container
//                       direction="row"
//                       alignItems="center"
//                       justifyContent="space-between"
//                     >
//                       <Grid item>
//                         <Typography className={props.classes.fileNames}>
//                           {fileName}
//                         </Typography>
//                       </Grid>
//                       <Grid item>
//                         <IconButton
//                           className="p0"
//                           onClick={() => props.onDeleteFile(fileName)}
//                         >
//                           <ClearIcon fontSize="small" className="grayText" />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Grid>
//               ))}
//           </Grid>
//         </Box>
//       </Grid>

//       <Grid item className={props.classes.dialogBottomSection}>
//         <Box mr={2}>
//           <Grid
//             container
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             className={props.classes.submitSection}
//           >
//             <Grid item md={2}>
//               <Grid container alignItems="center">
//                 <Grid item md>
//                   <IconButton className="p0">
//                     <label className="p15">
//                       <Box display="none">
//                         <input
//                           id="file"
//                           multiple
//                           type="file"
//                           onChange={props.onDocumentChange}
//                           accept={constants.troubleTicketDoc.types}
//                         />
//                       </Box>
//                       <AttachmentIcon className={props.classes.attachIcon} />
//                     </label>
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item md={6} align="right">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={checkIsDublicateCat}
//                 disabled={
//                   selectedCatArr.length < 2 ||
//                   _some(characteristics, { error: true }) ||
//                   (type !== constants.troubleTicketTypes.QUERY
//                     ? !props.description
//                     : !cause) ||
//                   attributeValidation ||
//                   props.loader
//                 }
//               >
//                 <Trans>Proceed</Trans>
//                 {props.loader && (
//                   <CircularProgress
//                     size={24}
//                     className={props.classes.buttonProgress}
//                   />
//                 )}
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//       {isDublicateDialogOpen && (
//         <DublicateTicketDialog
//           isModalOpen={isDublicateDialogOpen}
//           onCancel={() => setDublicateModalOpen(false)}
//           onProceed={handleProceed}
//         />
//       )}
//     </Grid>
//   ) : (
//     <Grid container direction="column" justify="center">
//       <Grid item className={props.classes.radioGrp}>
//         <Box my={3} mx={5}>
//           <Grid container direction="row" justify="space-between">
//             <Grid item>
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   row
//                   aria-label="position"
//                   name="position"
//                   defaultValue="top"
//                   onChange={(e) => props.handleChangeCallLog(e)}
//                   name="callLogType"
//                   value={callLogPayload.callLogType}
//                 >
//                   {props.callLogType?.length &&
//                     props.callLogType.map((callLogType, callLogIndex) => {
//                       return (
//                         <FormControlLabel
//                           key={callLogIndex}
//                           value={callLogType.name}
//                           control={<Radio color="primary" />}
//                           label={callLogType.name}
//                           labelPlacement="end"
//                         />
//                       );
//                     })}
//                 </RadioGroup>
//               </FormControl>
//             </Grid>
//             <Grid item>
//               {callLogPayload.callLogCategory !== '' ? (
//                 <Button
//                   className={props.classes.recommendationBtn}
//                   variant="contained"
//                   onClick={props.onMaximize}
//                 >
//                   <Trans>Past Call Logs</Trans>
//                 </Button>
//               ) : null}
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//       <Grid item>
//         <Box py={4} mx={5}>
//           <Paper className={props.classes.customerDetailsCard}>
//             <Grid direction="row" container>
//               <Grid item xs="6">
//                 <Typography variant="subtitle1">
//                   <Trans>CUSTOMER DETAILS</Trans>
//                 </Typography>
//                 <Typography variant="body2">
//                   {/* {customerDetails.customerType} <Trans>|</Trans> <>&nbsp;</>
//                   {customerDetails.relatedParty &&
//                     customerDetails.relatedParty.length &&
//                     customerDetails.relatedParty.map((relatedParty) => {
//                       if (relatedParty.role === 'ProfileOwner')
//                         return (
//                           <>
//                             {`${relatedParty.engagedParty.contactMedium[1].medium.number} `}{' '}
//                             <Trans>|</Trans>&nbsp;
//                             {`${relatedParty.engagedParty.contactMedium[0].medium.emailAddress}`}
//                           </>
//                         );
//                     })} */}
//                 </Typography>
//               </Grid>
//               <Grid item xs="6">
//                 <Typography variant="subtitle1" align="right">
//                   <Trans>CUSTOMER ID: </Trans> {props.customerId}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       </Grid>
//       <Grid container direction="row" spacing={4}>
//         <Grid item>
//           <Autocomplete
//             className={props.classes.textField}
//             options={callLogCauseAndCategories.section}
//             getOptionLabel={(option) => option.name}
//             value={callLogPayload.section}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label={<Trans>Department </Trans>}
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: (
//                     <>
//                       <SVGIcon iconWidth={18} iconName={'CallLogSection'} />
//                       {params.InputProps.startAdornment}
//                     </>
//                   )
//                 }}
//                 required
//                 placeholder="Select"
//               />
//             )}
//             // onChange={(e, value) => props.handleChangeCallLogSection(e, value)}
//             name="section"
//           />
//         </Grid>
//         <Grid item>
//           <Autocomplete
//             className={props.classes.textField}
//             options={props.mediumTypes}
//             getOptionLabel={(option) => option.sourceFromName}
//             value={callLogPayload.medium}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label={<Trans>Source Medium</Trans>}
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: (
//                     <>
//                       <SVGIcon iconWidth={18} iconName={'CallLog_Media'} />
//                       {params.InputProps.startAdornment}
//                     </>
//                   )
//                 }}
//                 required
//                 placeholder="Select"
//               />
//             )}
//             // onChange={(e, value) => props.handleChangeCallLogMedium(e, value)}
//             name="callLogMedium"
//           />
//         </Grid>
//         {/* {callLogPayload.medium.sourceFromName === 'Phone Call' && (
//           <Grid item xs={4}>
//             <TextField
//               error={props.phnNumValidate && true}
//               label="Phone Number"
//               type="number"
//               InputLabelProps={{
//                 shrink: true
//               }}
//               className={props.classes.phnNumberTextField}
//               onChange={(e) => props.handleChangeCallLogPhone(e)}
//               value={callLogPayload.phoneNo}
//               helperText={
//                 props.phnNumValidate && (
//                   <Typography
//                     variant="body2"
//                     className={props.classes.ValidationError}
//                   >
//                     <Trans>invalid phone number</Trans>
//                   </Typography>
//                 )
//               }
//             />
//           </Grid>
//         )} */}
//       </Grid>
//       <Grid container direction="row" spacing={4}>
//         <Grid item>
//           <ThemeProvider theme={theme}>
//             <MuiPickersUtilsProvider utils={DateFnsUtils}>
//               <KeyboardDatePicker
//                 disableToolbar
//                 variant="inline"
//                 format="dd/MM/yyyy"
//                 margin="normal"
//                 id="date-picker-dialog"
//                 label={
//                   <Trans>
//                     {' '}
//                     CALL DATE{' '}
//                     <span className={props.classes.asteriskColor}>&nbsp;*</span>
//                   </Trans>
//                 }
//                 className={props.classes.textField}
//                 maxDate={new Date()}
//                 // onChange={props.handleChangeCallLogDate}
//                 name="callDate"
//                 value={props.callLogDate}
//                 keyboardIcon={
//                   <img
//                     src={`${config.basePath}assets/icons/Created_OnDate.svg`}
//                     className={props.classes.ticketLinkIcon}
//                   />
//                 }
//               />
//             </MuiPickersUtilsProvider>
//           </ThemeProvider>
//         </Grid>
//         <Grid item>
//           <TextField
//             id="time"
//             label="CALL START "
//             type="time"
//             defaultValue="00:00:00"
//             required
//             InputLabelProps={{
//               shrink: true
//             }}
//             className={props.classes.textField}
//             inputProps={{
//               step: 300 // 5 min
//             }}
//             // onChange={(e) => props.handleChangeCallLogStartTime(e)}
//             name="callStart"
//             value={callLogPayload.callStart}
//             helperText={
//               props.showTimeStartErrorMessage && (
//                 <Typography
//                   variant="body2"
//                   className={props.classes.timeValidationError}
//                 >
//                   {props.timeStartErrorMessage}
//                 </Typography>
//               )
//             }
//           />
//         </Grid>
//         <Grid item>
//           <TextField
//             id="time"
//             label="CALL END "
//             type="time"
//             defaultValue="00:00:00"
//             required
//             InputLabelProps={{
//               shrink: true
//             }}
//             className={props.classes.textField}
//             inputProps={{
//               step: 300 // 5 min
//             }}
//             // onChange={(e) => props.handleChangeCallLogEndTime(e)}
//             name="callEnd"
//             value={callLogPayload.callEnd}
//             helperText={
//               props.showTimeEndErrorMessage && (
//                 <Typography
//                   variant="body2"
//                   className={props.classes.timeValidationError}
//                 >
//                   {props.timeEndErrorMessage}
//                 </Typography>
//               )
//             }
//           />
//         </Grid>
//       </Grid>

//       <Grid container direction="row" spacing={4}>
//         <Grid item>
//           <Autocomplete
//             className={props.classes.textField}
//             options={callLogPayload.section.category || []}
//             getOptionLabel={(option) => option.name}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label={<Trans>Category </Trans>}
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: (
//                     <>
//                       <Box></Box>
//                       {params.InputProps.startAdornment}
//                     </>
//                   )
//                 }}
//                 required
//                 placeholder="Select"
//               />
//             )}
//             value={callLogPayload.callLogCategory}
//             // onChange={(e, value) => {
//             //   props.handleChangeCallLogCategory(e, value);
//             // }}
//           />
//         </Grid>
//         <Grid item>
//           <Autocomplete
//             className={props.classes.textField}
//             options={callLogPayload.callLogCategory.reason || []}
//             getOptionLabel={(option) => option.name}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Reason "
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: (
//                     <>
//                       <Box></Box>
//                       {params.InputProps.startAdornment}
//                     </>
//                   )
//                 }}
//                 placeholder="Select"
//               />
//             )}
//             name="reason"
//             value={callLogPayload.reason}
//             // onChange={(e, value) => props.handleChangeCallLogReason(e, value)}
//           />
//         </Grid>
//         <Grid item>
//           <Autocomplete
//             className={props.classes.textField}
//             options={callLogPayload.callLogCategory.resolution || []}
//             getOptionLabel={(option) => option.name}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Resolution "
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: (
//                     <>
//                       <Box></Box>
//                       {params.InputProps.startAdornment}
//                     </>
//                   )
//                 }}
//                 placeholder="Select"
//               />
//             )}
//             name="callLogResolution"
//             value={callLogPayload.callLogResolution}
//             // onChange={(e, value) =>
//             //   props.handleChangeCallLogResolution(e, value)
//             // }
//           />
//         </Grid>
//       </Grid>

//       <Grid>
//         <Box px={10} pb={25}>
//           <Grid container direction="column" spacing={6}>
//             {props.fileNames.length > 0 &&
//               props.fileNames.map((fileName, index) => (
//                 <Grid item key={index}>
//                   <Box p={2} className={props.classes.attachmentRoot}>
//                     <Grid
//                       container
//                       direction="row"
//                       alignItems="center"
//                       justify="space-between"
//                     >
//                       <Grid item>
//                         <Typography className={props.classes.fileNames}>
//                           {fileName}
//                         </Typography>
//                       </Grid>
//                       <Grid item>
//                         <IconButton
//                           className="p0"
//                           onClick={() => props.onDeleteFile(fileName)}
//                         >
//                           <ClearIcon fontSize="small" className="grayText" />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Grid>
//               ))}
//           </Grid>
//         </Box>
//       </Grid>

//       <Grid item className={props.classes.dialogBottomSection}>
//         <Box mr={2}>
//           <Grid
//             container
//             direction="row"
//             justify="space-between"
//             alignItems="center"
//             className={props.classes.submitSection}
//           >
//             <Grid item md={2}>
//               <Grid container alignItems="center">
//                 <Grid item md>
//                   <IconButton className="p0">
//                     <label className="p15">
//                       <Box display="none">
//                         <input
//                           id="file"
//                           multiple
//                           type="file"
//                           onChange={props.onDocumentChange}
//                           accept={constants.troubleTicketDoc.types}
//                         />
//                       </Box>
//                       <AttachmentIcon className={props.classes.attachIcon} />
//                     </label>
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item md={6} align="right">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleProceed}
//                 // disabled={
//                 //   _some(characteristics, { error: true }) ||
//                 //   (type !== constants.troubleTicketTypes.QUERY
//                 //     ? showLogTicketUI && !props.description
//                 //     : !cause) ||
//                 //   attributeValidation ||
//                 //   (!showLogTicketUI &&
//                 //     (!callLogPayload.callStart ||
//                     //   !callLogPayload.callEnd ||
//                 //       !callLogPayload.medium ||
//                 //       !callLogPayload.section ||
//                 //       !callLogPayload.reason ||
//                 //       !callLogPayload.callLogResolution ||
//                 //       !callLogPayload.callLogCategory ||
//                 //       props.phnNumValidate ||
//                 //       !props.callLogDate)) ||
//                 //   props.loader
//                 // }
//               >
//                 <Trans>Proceed</Trans>
//                 {props.loader && (
//                   <CircularProgress
//                     size={24}
//                     className={props.classes.buttonProgress}
//                   />
//                 )}
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//       {/* {isDublicateDialogOpen && (
//         <DublicateTicketDialog
//           isModalOpen={isDublicateDialogOpen}
//           onCancel={() => setDublicateModalOpen(false)}
//           onProceed={handleProceed}
//         />
//       )} */}
//     </Grid>
//   );
// };
// export default withStyles(styles)(MinimizeLogTicket);

import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {
  TextField,
  Typography,
  Button,
  Box,
  // InputAdornment,
  // MenuItem,
  makeStyles,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

// // import SearchIcon from '@material-ui/icons/Search';
// import { Trans } from '@lingui/macro';
// import classNames from 'classnames';
// import Grid from '@material-ui/core/Grid';
// import { i18n } from '@lingui/core';

// import InputBase from '@material-ui/core/InputBase';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Card from 'common/components/Card/Card';
// import MUICard from '@material-ui/core/Card';
// import Avatar from '@material-ui/core/Avatar';
// import CardContent from '@material-ui/core/CardContent';
// import Visible from 'common/components/Visible';
// import SVGIcon from 'common/components/SVGIcon/SVGIcon';
// import CloseIcon from '@material-ui/icons/Close';
// import AccountCard from 'common/components/AccountCard';
// import _map from 'lodash/map';
// import { Viewer, Upload } from 'common/components/Attachment';
// import appRoutes from 'common/constants/appRoutes';
// import constants from 'common/constants/constants';
// import CallTimer from 'common/components/CallTimer';
import Sticky from 'react-stickynode';
import NavigateNext from '@material-ui/icons/NavigateNext';
// import RequestSubHeader from 'srqOld/views/CustomerRequestView/RequestSubHeaderView';
// import { getCharacteristicValue } from 'common/utils/commonUtility';
// import UserModal from './UserModal';
// import Title from './Title';
// import AddIcon from '@material-ui/icons/Add';
// import AdditionalCharacteristics from './AdditionalCharacteristics';
// import { Logo } from 'common/components/Logo';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Paper from '@material-ui/core/Paper';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import Tooltip from '@material-ui/core/Tooltip';
// import DublicateTicketDialog from './DublicateTicketDialog';
// import { getDublicateTickets } from 'common/services/api';
// import CheckIcon from '@material-ui/icons/Check';
// import { FormControl } from '@material-ui/core';
// import FormLabel from '@material-ui/core/FormLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Dialog from '@material-ui/core/Dialog';
// import CloseIcon from '@material-ui/icons/Close';
import { createTheme } from '@material-ui/core/styles';
import SvgFile from 'lib/components/SvgFile';
import Logo from 'Components/Logo';
import CallTimer from 'lib/components/CallTimer/CallTimer';

import { Trans } from '@lingui/react';
import classNames from 'classnames';
import { Autocomplete } from 'Components';

import AddIcon from '@material-ui/icons/Add';
// import { SVGIcon } from 'lib/components';
// import CallDetailesCard from '../../CallLogsDashboard/CallDetailesCard';
// import { createFilterOptions } from '@material-ui/lab/Autocomplete';
// import { isArray } from 'lodash';

const defaultTheme = createTheme();

const theme = createTheme({
  overrides: {
    MuiInputLabel: {
      formControl: {
        fontSize: '16px',
        color: defaultTheme.palette.text.primary
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '16px',
        color: defaultTheme.palette.text.primary
      }
    }
  }
});
const contactDetails = [
  {
    header: 'Secondary Contact',
    mobile: 9988786545,
    email: 'ranasarkar2020@gmail.com'
  },
  {
    header: 'Temporary Contact',
    mobile: 8888786023,
    email: 'rahul_2020@gmail.com'
  }
];

const linkTypes = ['isRelatedTo', 'isBlockedBy', 'isDublicatedBy'];

const styles = makeStyles((theme) => {
  return {
    root: {
      top: 0,
      left: 0,
      zIndex: 999999,
      backgroundColor: theme.palette.background.highlight,
      width: '100vw',
      minHeight: '100vh'
    },
    paperview: {
      // width: '100vw',
      overflowX: 'hidden',
      minHeight: '80vh'
    },
    paper: {
      paddingTop: 20
    },
    grow: {
      flexGrow: 1
    },
    rootGrid: {
      padding: 40
    },
    icons: {
      margin: theme.spacing(4, 8)
    },
    subContent: {
      marginTop: theme.spacing(6)
    },
    cardRoot: {
      border: `1px solid ${theme.palette.background.main}`,
      opacity: 1,
      borderRadius: 10,
      padding: theme.spacing(4, 8)
    },
    detailSection: {
      paddingTop: theme.spacing(5)
    },
    timeline: {
      width: '50%'
    },
    appFooter: {
      bottom: 0,
      top: 'auto'
    },
    submitBtn: {
      position: 'fixed',
      right: 150,
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
      padding: theme.spacing(2, 6),
      fontSize: 16
    },
    name: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      verticalAlign: 'super'
    },
    buttonProgress: {
      position: 'absolute',
      color: theme.palette.success.main
    },
    iconClearSearch: {
      float: 'right',
      zIndex: 1,
      position: 'absolute',
      left: '21%',
      background: theme.palette.common.white,
      '&:hover': {
        background: theme.palette.common.white
      }
    },
    autoComplete: {
      borderRadius: '0px'
    },
    title: {
      fontWeight: theme.typography.fontWeightBold
    },
    troubleTicketWrapper: {
      marginTop: theme.spacing(8)
    },
    categoryTickets: {
      marginBottom: theme.spacing(5),
      background: theme.palette.background.inactive,
      padding: theme.spacing(3)
    },
    categoryTicketID: {
      color: theme.palette.primary.dark,
      fontWeight: theme.typography.fontWeightMedium
    },
    statusText: {
      borderRadius: 5,
      padding: theme.spacing(1),
      width: theme.spacing(31),
      textAlign: 'center',
      border: `solid ${theme.palette.text.secondary} 1px`
    },

    ticketCardFirstRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    assignFlex: {
      display: 'flex',
      alignItems: 'center'
    },
    ticketLinkIcon: {
      height: theme.spacing(4),
      marginTop: theme.spacing(1)
    },
    ticketCategories: {
      marginTop: theme.spacing(1)
    },
    avatarName: {
      background: theme.palette.common.indigo,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: theme.spacing(7),
      width: theme.spacing(7.5),
      fontSize: theme.spacing(3.9)
    },
    typographyLeftMargin: {
      marginLeft: theme.spacing(2)
    },
    ticketTypeContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(4)
    },
    ticketTypeContainerBtn: {
      color: theme.palette.common.white,
      marginLeft: theme.spacing(2),
      background: theme.palette.common.darkGray
    },
    activeBtn: {
      color: theme.palette.common.white,
      marginLeft: theme.spacing(2),
      background: theme.palette.secondary.main
    },
    topMargin: {
      marginTop: theme.spacing(1)
    },
    muiCardContent: {
      padding: `${theme.spacing(0)} !important`
    },
    emptyTicketsContainer: {
      height: theme.spacing(300)
    },
    emptyTicketsText: {
      marginTop: theme.spacing(6)
    },
    emptyTicketsImgContainer: {
      textAlign: 'center'
    },
    emptyTicketImg: {
      marginTop: theme.spacing(50),
      width: theme.spacing(100),
      height: theme.spacing(60)
    },
    linkTicketCard: {
      border: `1px solid ${theme.palette.background.main}`,
      padding: theme.spacing(4),
      borderRadius: theme.spacing(2)
    },
    ticketChips: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
      boxShadow: '0px 1px 0px cyan',
      borderRadius: theme.spacing(1)
    },
    chip: {
      margin: theme.spacing(0.5),
      height: theme.spacing(8),
      fontSize: theme.spacing(5),
      background: theme.palette.common.white
    },
    eachTicketRow: {
      height: theme.spacing(8.2),
      marginTop: theme.spacing(3)
    },
    EachLinkSection: {
      marginBottom: theme.spacing(12)
    },
    customerDetailsCard: {
      color: theme.palette.common.white
    },
    textField: {
      margin: theme.spacing(5),
      width: 250
    },
    phnNumberTextField: {
      margin: theme.spacing(3.5),
      width: 250
    },
    callLogHeadingIcons: {
      height: theme.spacing(8)
    },
    ValidationError: {
      color: theme.palette.error.main
    },
    pastCallLogDialog: {
      background: theme.palette.background.inactive
    },
    asteriskColor: {
      color: theme.palette.error.main
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.common.white
    },
    fileTypes: {
      fontSize: 14
    }
  };
});

const PaperView = ({ title, children, iconType }) => {
  const classes = styles();
  return (
    <>
      <Paper elevation={0}>
        {title && (
          <Box p={4}>
            <Box mb={4}>
              <Grid container spacing={2}>
                <Grid item>
                  <SvgFile iconName={iconType} iconWidth={24} />
                </Grid>
                <Grid item>
                  <Typography variant="h2" className={classes.title}>
                    {title}
                  </Typography>
                </Grid>
                {title === 'ATTACHMENTS' && (
                  <Grid item>
                    <Typography variant="h2" className={classes.title}>
                      Attachments
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        )}
        <Box py={1}>{children}</Box>
      </Paper>
    </>
  );
};

const MaximizeTicket = (props) => {
  const {
    categoriesList,
    loadSubcategories,
    getSubCategories,
    getRoot,
    getCategoriesFromChildCategoryId,
    clearCategoriesFromChildCategory,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    searchCategory,
    setSearchCategory,
    allCatDropdownData,
    selectedCatArr,
    handleSelectCategory,
    characteristics,
    setCharacteristics,
    categoryBasedTroubleTickets,
    linkTicketTypes,
    callLogCauseAndCategories,
    callLogPayload,
    showLogTicketUI,
    customerDetails,
    handleRedirect,
    onMinimize,

    OnsearchValue,
    partnerDropdownlist,
    handleSelect,
    ProductDropDownList,
    SelectedProduct,
    LogTicket_ProductObj,
    onDocumentChange,
    logTicketMinMode
  } = props;
  const [attributeValidation, setAttributeValidation] = useState(false);
  const [ticketsByActiveTab, setTicketsByActiveTab] = useState([]);
  let mandatoryAttributes = [];

  const CSRAgent = 'CSRAgent';
  const ProfileOwner = 'ProfileOwner';

  const [showUserSelectModal, setUserSelectModal] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [type, setType] = useState('Complaint');
  //   const userDetails = getUserPayload(props);
  const [priority, setPriority] = useState('');
  const buttonNames = ['all', 'duplicate', 'past', 'related'];
  const [activeTab, setActiveTab] = useState('');
  const [linkTicketArr, setLinkTicketArr] = useState([]);
  const [isDublicateDialogOpen, setDublicateModalOpen] = useState(false);
  const [callLogDialog, setCallLogDialog] = useState(false);
  const [callLogDialogData, setCallLogDialogData] = useState([]);

  const classes = styles();
  const ticketTypesList = [
    { code: 'Complaint', name: 'Complaint' },
    { code: 'Query', name: 'Query' },
    { code: 'Request', name: 'Request' }
  ];
  const dashboardLink = () => {};
  return (
    <div className={classes.root}>
      <Sticky enabled top={0} innerZ={15}>
        <AppBar
          position="static"
          className={classes.primaryBackground}
          color="default"
        >
          <Toolbar>
            {/* <Toolbar> */}
            <Logo clickHandler={handleRedirect} />
            <Box p={4} borderLeft={1} className={classes.headerTitle}>
              <Typography variant="body1" className={classes.headerTitle}>
                {'Ticket ID'}
              </Typography>
            </Box>
            <Box className={classes.grow} />
            <CallTimer
              // className={classes.icons}
              onStopTimer={dashboardLink}
              // customerId={userDetails.customerId}
            />
            <SvgFile iconName="faq" iconWidth={24} />
            <Box ml={5} className="inline">
              <IconButton aria-label="fullscreen_exit" onClick={onMinimize}>
                <SvgFile iconName="Minimize" iconWidth={24} />
              </IconButton>
            </Box>
            <Box ml={0} mr={8}>
              <IconButton aria-label="fullscreen_exit">
                <SvgFile iconName="SaveandExit" iconWidth={24} />
              </IconButton>
            </Box>
            {/* </Toolbar> */}
          </Toolbar>
        </AppBar>
      </Sticky>
      <Box py={5} px={3}>
        <Grid container direction="row" spacing={5} xs={12}>
          <Grid item xs={8}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <PaperView>
                  {/* <Box py={3}>
                    <Grid
                      container
                      spacing={6}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h4" className={classes.title}>
                          xBox360
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h4" className={classes.title}>
                          Product ID:PR232323
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box> */}

                  <Box py={3}>
                    <Grid
                      container
                      spacing={6}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h2" className={classes.title}>
                          {LogTicket_ProductObj?.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h2" className={classes.title}>
                          Product ID:{_.get(LogTicket_ProductObj, 'code', '')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box py={1}>
                    <Grid
                      container
                      spacing={6}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h6" className={classes.title}>
                          {_.get(
                            LogTicket_ProductObj?.searchlist?.AddProduct,
                            'ProductDetails.PRODUCT_LOB',
                            ''
                          )}{' '}
                          &nbsp;&nbsp; | &nbsp; &nbsp;{' '}
                          {_.get(
                            LogTicket_ProductObj?.searchlist?.AddProduct,
                            'ProductDetails.PRODUCT_TECHNOLOGY',
                            ''
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </PaperView>
              </Grid>

              <Grid item>
                <PaperView title={'Log Type  '} iconType={'LogTicket'}>
                  {/* <Grid item xs> */}
                  <Box mx={5} px={3}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="ticketType"
                        className="inSameline"
                        // onChange={(e) => {
                        //   handleSelect(e, setType);
                        //   setSearchCategory('');
                        //   setCategory([]);
                        //   setSubCategory([]);
                        //   loadCategoriesList(e.target.value);
                        //   loadSubcategories(e.target.value);
                        // // }}
                        // value={type}
                      >
                        {ticketTypesList &&
                          ticketTypesList.map((item, index) => {
                            return (
                              <FormControlLabel
                                key={item.code}
                                value={item.name}
                                control={<Radio />}
                                label={item.name}
                              />
                            );
                          })}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  {/* </Grid> */}
                </PaperView>
              </Grid>

              <Grid item>
                <PaperView title={'CATEGORY  '} iconType={'Category'}>
                  <Box>
                    <Grid container spacing={6} direction="row">
                      <Grid item xs={6}>
                        <Autocomplete
                          label="Catagory"
                          // onChange={handleSelect}
                          options={[]}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Autocomplete
                          label="Sub-Catagory"
                          // onChange={handleSelect}
                          options={[]}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </PaperView>
              </Grid>

              <Grid item>
                <PaperView title={'DESCRIPTION  '} iconType={'Notes'}>
                  <TextField fullWidth label="Description" multiline />
                </PaperView>
              </Grid>
              <Grid item>
                <Paper elevation={0}>
                  <Box p={4}>
                    <Box mb={4}>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Grid container spacing={2}>
                            <Grid item>
                              <SvgFile iconName="Attachment" iconWidth={24} />
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="h2"
                                className={classes.title}
                              >
                                ATTACHMENTS
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid container alignItems="baseline">
                            <Grid item>
                              <IconButton>
                                <label>
                                  <Box display="none">
                                    <input
                                      id="file"
                                      multiple
                                      type="file"
                                      onChange={onDocumentChange}
                                      // accept={constants.troubleTicketDoc.types}
                                    />
                                  </Box>

                                  <AddIcon />
                                </label>
                              </IconButton>
                            </Grid>

                            <Grid item>
                              <Typography variant="h2">Attachment</Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            File Types:.jpg, .png, .pdf File size: 2MB
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>

                {/* <PaperView title={'ATTACHMENTS  '} iconType={'Attachment'}>
                  <Typography>frefref</Typography>
                </PaperView> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paperview} elevation={0}></Paper>
          </Grid>
        </Grid>
      </Box>

      <AppBar
        position="fixed"
        className={classNames(
          // classes.primaryBackground,
          classes.appFooter
        )}
        color="transparent"
      >
        <Toolbar>
          <Button
            variant="contained"
            className={classes.submitBtn}
            size="large"
            endIcon={<NavigateNext />}
          >
            <Trans>Submit</Trans>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MaximizeTicket;

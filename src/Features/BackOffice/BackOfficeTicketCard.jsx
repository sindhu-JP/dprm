// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import { Grid, Paper, Typography, Tooltip } from '@material-ui/core';
// import ReportProblemIcon from '@material-ui/icons/ReportProblem';
// import { Trans } from '@lingui/macro';
// import classNames from 'classnames';
// // import constants from 'trouble-ticket-management/common/constants/constants';
// import { withRouter } from 'react-router-dom';
// // import appRoutes from 'trouble-ticket-management/common/constants/appRoutes';
// import _get from 'lodash/get';
// import _cloneDeep from 'lodash/cloneDeep';

// const styles = (theme) => ({
//   root: {
//     flexGrow: 1,
//     height: '124px',
//     padding: '24px',
//     backgroundColor: theme.palette.background.highlight,
//     boxShadow: 'none',
//     marginBottom: '16px',
//     maxWidth: '99%',
//     cursor: 'pointer'
//   },
//   cardWrapper: {
//     margin: '0',
//     height: '100%',
//     paddingTop: '0',
//     paddingBottom: '0'
//   },
//   statusSection: {
//     flex: '0.1'
//   },
//   headerTitle: {
//     width: 190,
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis'
//   },
//   contentSection: {
//     flex: '2'
//   },
//   leftContent: {
//     justifyContent: 'space-evenly'
//   },
//   statusSpan: {
//     width: '4px',
//     background: `${theme.palette.common.white} 0% 0% no-repeat padding-box`,
//     borderRadius: '50px',
//     height: '100%',
//     marginRight: '12px'
//   },
//   redStatus: {
//     backgroundColor: theme.palette.error.main
//   },
//   orangeStatus: {
//     backgroundColor: theme.palette.warning.main
//   },
//   captureStatus: {
//     backgroundColor: theme.palette.secondary.main
//   },
//   greenStatus: {
//     backgroundColor: theme.palette.success.main
//   },
//   greyStatus: {
//     backgroundColor: theme.palette.common.lightSilver
//   },
//   subTitle: {
//     marginRight: '0.2em'
//   },
//   typeCss: {
//     color: theme.palette.text.primary,
//     paddingTop: '0.7em'
//   },
//   activeCard: {
//     backgroundColor: theme.palette.common.white,
//     height: '128px',
//     marginRight: -6,
//     maxWidth: '100%'
//   },
//   warningIcon: {
//     color: theme.palette.warning.main
//   },
//   ticketID: {
//     color: '#999999',
//     fontWeight: 300,
//     fontSize: '12px'
//   },
//   associateHeading: {
//     marginLeft: '-2px'
//   }
// });

// const getStatusCss = (status) => {
//   switch (status.toLowerCase()) {
//     case 'pending':
//     case 'draft':
//       return 'greyStatus';
//     case 'inprogress':
//     case 'inprogressreopened':
//     case 'inprogressescalated':
//     case 'held':
//       return 'orangeStatus';
//     case 'captured':
//       return 'captureStatus';
//     case 'done':
//     case 'completed':
//     case 'resolved':
//     case 'closed':
//       return 'greenStatus';
//     case 'open':
//       return 'greyStatus';
//     default:
//       return 'redStatus';
//   }
// };

// const isToday = (rowDate) => {
//   const inputDate = new Date(rowDate);
//   const today = new Date();
//   return (
//     inputDate.getDate() === today.getDate() &&
//     inputDate.getMonth() === today.getMonth() &&
//     inputDate.getFullYear() === today.getFullYear()
//   );
// };

// const modifyOrder = async (params) => {
//   const {
//     partyInteraction,
//     customerId,
//     setOldInteraction,
//     submitCorporateRegistrationLead,
//     setActiveCustomer,
//     getFullCustomerAction,
//     FetchBillingAccountsByCustomerId,
//     history
//   } = params;
//   setOldInteraction(partyInteraction);

//   //   const serviceRequestType = constants.serviceRequestType.MODIFY_PLAN;
//   const serviceRequestClone = _cloneDeep(partyInteraction);
//   delete serviceRequestClone.id;
//   serviceRequestClone['@type'] = serviceRequestType;
//   const updatedServiceRequest = await submitCorporateRegistrationLead({
//     serviceRequest: serviceRequestClone,
//     endPoint: serviceRequestType
//   });

//   if (customerId) {
//     setActiveCustomer(customerId);
//     // this.props.getCustomerAction(customerId);
//     getFullCustomerAction(customerId);
//     FetchBillingAccountsByCustomerId(customerId);
//   }

//   //   const url = `${appRoutes.serviceRequest}/ModifyOrder?requestId=${updatedServiceRequest.id}&resume=1`;
//   history.push(url);
// };

// // const onOptionSelected = async ({ option }) => {
// //   switch (option) {
// //     case 'Cancel':
// //       this.handleModalOpen('isCancelOrderModalOpen');
// //       break;
// //     case 'Modify':
// //       console.log('modify clicked')
// //     default:
// //       break;
// //   }
// // };

// const BackOfficeTicketCard = ({
//   classes,
//   requestLabel,
//   requestId,
//   associateLabel,
//   associateId,
//   serviceId,
//   heading,
//   time,
//   type,
//   selected,
//   status,
//   onCardClick,
//   selectedRow,
//   showWarningIcon,
//   categoryLabel,
//   showTime,
//   tooltip,
//   setOldInteraction = null,
//   submitCorporateRegistrationLead = null,
//   setActiveCustomer = null,
//   getFullCustomerAction = null,
//   FetchBillingAccountsByCustomerId = null,
//   history,
//   ticketItem,
//   partnerdetails,
//   category
// }) => {
//   console.log(category, 'item');
//   const associateID = associateId || serviceId;
//   return (
//     <Paper
//       className={classNames(classes.root, selected ? classes.activeCard : '')}
//       rounded="true"
//       onClick={onCardClick}
//     >
//       <Grid container className={classes.cardWrapper}>
//         <Grid
//           item
//           container
//           direction="column"
//           spacing={1}
//           className={classes.statusSection}
//         >
//           {/* {tooltip ? (
//             <>
//               <Tooltip
//                 title={selectedRow && selectedRow.status.toUpperCase()}
//                 aria-label="add"
//               >
//                 <span
//                   className={classNames(
//                     classes.statusSpan,
//                     classes[getStatusCss(selectedRow.status)]
//                   )}
//                 />
//               </Tooltip>
//             </>
//           ) : (
//             <>
//               <span
//                 className={classNames(
//                   classes.statusSpan,
//                   classes[getStatusCss(status)]
//                 )}
//               />
//             </>
//           )} */}
//         </Grid>
//         <Grid
//           item
//           container
//           direction="column"
//           spacing={1}
//           className={classNames(classes.contentSection, classes.leftContent)}
//         >
//           <Grid item>
//             <Grid container direction="row" alignItems="center" spacing={2}>
//               <Grid item>
//                 <Typography className={classes.ticketID} variant="caption">
//                   {requestLabel}:
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography variant="subtitle1">{requestId}</Typography>
//               </Grid>
//               {/* {showWarningIcon && (
//                 <Grid item>
//                   <ReportProblemIcon
//                     className={classNames(classes.warningIcon, 'ml10')}
//                   />
//                 </Grid>
//               )} */}
//             </Grid>
//           </Grid>

//           <Grid item xs>
//             <Grid
//               container
//               direction="row"
//               justifyContent="space-between"
//               spacing={3}
//             >
//               <Grid item>
//                 <Typography variant="h2">{category || '--'}</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography  variant="h6">
//                   {_.get(partnerdetails, 'mainlist.partnerName', '...')} -{' '}
//                   {_.get(partnerdetails, 'mainlist.partnerId', '...')}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item>
//             <Grid
//               container
//               direction="row"
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={2}
//             >
//               <Grid item>{ticketItem?.ticketType}</Grid>
//               <Grid item></Grid>
//             </Grid>
//           </Grid>

//           <Grid item>
//             <Typography className={classes.headerTitle} variant="body1">
//               {heading}
//             </Typography>
//             {showTime && (
//               <Grid item>
//                 {isToday(time) ? (
//                   <Typography variant="subtitle2" className={classes.subTitle}>
//                     <Trans>Today</Trans>
//                   </Typography>
//                 ) : (
//                   <Typography variant="subtitle2" className={classes.typeCss}>
//                     {time}
//                   </Typography>
//                 )}
//               </Grid>
//             )}
//           </Grid>
//         </Grid>

//         <Grid
//           item
//           container
//           direction="column"
//           spacing={1}
//           className={classes.contentSection}
//           alignItems="flex-end"
//         >
//           {associateID && (
//             <>
//               {_get(selectedRow, 'status', '') ===
//                 constants.status.INPROGRESS && (
//                 <Grid
//                   item
//                   container
//                   spacing={1}
//                   alignItems="flex-end"
//                   justify="flex-end"
//                 ></Grid>
//               )}
//               <Grid
//                 item
//                 container
//                 spacing={1}
//                 alignItems="flex-end"
//                 justify="flex-end"
//                 className={classes.associateHeading}
//               >
//                 <Typography
//                   variant="body1"
//                   className={classes.associateHeading}
//                 >
//                   {associateID}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 container
//                 spacing={1}
//                 alignItems="flex-end"
//                 justify="flex-end"
//               >
//                 <Typography variant="body1" className={classes.typeCss}>
//                   {type}
//                 </Typography>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// BackOfficeTicketCard.propTypes = {
//   classes: PropTypes.objectOf(PropTypes.object).isRequired,
//   requestId: PropTypes.string,
//   associateId: PropTypes.string,
//   heading: PropTypes.string,
//   time: PropTypes.string,
//   type: PropTypes.string,
//   selected: PropTypes.bool,
//   status: PropTypes.string,
//   onCardClick: PropTypes.func,
//   selectedRow: PropTypes.object
// };

// BackOfficeTicketCard.defaultProps = {
//   requestId: null,
//   associateId: null,
//   heading: '',
//   time: null,
//   type: '',
//   selected: false,
//   status: '',
//   onCardClick: null,
//   selectedRow: null
// };

// export default withStyles(styles)(withRouter(BackOfficeTicketCard));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
// import { Trans } from '@lingui/react';
import classNames from 'classnames';
// import constants from 'trouble-ticket-management/common/constants/constants';
import { withRouter } from 'react-router-dom';
// import appRoutes from 'trouble-ticket-management/common/constants/appRoutes';
import _cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: '124px',
    padding: '24px',
    backgroundColor: theme.palette.background.highlight,
    boxShadow: 'none',
    marginBottom: '16px',
    maxWidth: '99%',
    cursor: 'pointer'
  },
  cardWrapper: {
    margin: '0',
    height: '100%',
    paddingTop: '0',
    paddingBottom: '0'
  },
  statusSection: {
    flex: '0.1'
  },
  headerTitle: {
    width: 190,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  contentSection: {
    flex: '2'
  },
  leftContent: {
    justifyContent: 'space-evenly'
  },
  statusSpan: {
    width: '4px',
    background: `${theme.palette.common.white} 0% 0% no-repeat padding-box`,
    borderRadius: '50px',
    height: '100%',
    marginRight: '12px'
  },
  redStatus: {
    backgroundColor: theme.palette.error.main
  },
  orangeStatus: {
    backgroundColor: theme.palette.warning.main
  },
  captureStatus: {
    backgroundColor: theme.palette.secondary.main
  },
  greenStatus: {
    backgroundColor: theme.palette.success.main
  },
  greyStatus: {
    backgroundColor: theme.palette.common.lightSilver
  },
  subTitle: {
    marginRight: '0.2em'
  },
  typeCss: {
    color: theme.palette.text.primary,
    paddingTop: '0.7em'
  },
  activeCard: {
    '&.MuiTypography-h2': {
      color: `#000 !important`
    },
    backgroundColor:
      theme.palette.type === 'dark'
        ? `${theme.palette.primary.main} !important`
        : `${theme.palette.common.white} !important`,
    height: '128px',
    marginRight: -6,
    maxWidth: '100%'
  },
  warningIcon: {
    color: theme.palette.warning.main
  },
  ticketID: {
    color: theme.palette.type === 'light' ? '##999999' : '#fff',
    fontWeight: 300,
    fontSize: '12px'
  },
  ticketIDValue: {
    color: theme.palette.type === 'light' ? '##999999' : '#fff',
    fontWeight: 300,
    fontSize: '12px'
  },
  associateHeading: {
    marginLeft: '-2px'
  },
  activeNew: {
    color: `#000 !important`
  }
});

const getStatusCss = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
    case 'draft':
      return 'greyStatus';
    case 'inprogress':
    case 'inprogressreopened':
    case 'inprogressescalated':
    case 'held':
      return 'orangeStatus';
    case 'captured':
      return 'captureStatus';
    case 'done':
    case 'completed':
    case 'resolved':
    case 'closed':
      return 'greenStatus';
    case 'open':
      return 'greyStatus';
    default:
      return 'redStatus';
  }
};

const isToday = (rowDate) => {
  const inputDate = new Date(rowDate);
  const today = new Date();
  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (rowDate) => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const inputDate = new Date(rowDate);
  return (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  );
};

const modifyOrder = async (params) => {
  const {
    partyInteraction,
    customerId,
    setOldInteraction,
    submitCorporateRegistrationLead,
    setActiveCustomer,
    getFullCustomerAction,
    FetchBillingAccountsByCustomerId,
    history
  } = params;
  setOldInteraction(partyInteraction);

  //   const serviceRequestType = constants.serviceRequestType.MODIFY_PLAN;
  const serviceRequestClone = _cloneDeep(partyInteraction);
  delete serviceRequestClone.id;
  serviceRequestClone['@type'] = serviceRequestType;
  const updatedServiceRequest = await submitCorporateRegistrationLead({
    serviceRequest: serviceRequestClone,
    endPoint: serviceRequestType
  });

  if (customerId) {
    setActiveCustomer(customerId);
    // this.props.getCustomerAction(customerId);
    getFullCustomerAction(customerId);
    FetchBillingAccountsByCustomerId(customerId);
  }

  //   const url = `${appRoutes.serviceRequest}/ModifyOrder?requestId=${updatedServiceRequest.id}&resume=1`;
  history.push(url);
};

// const onOptionSelected = async ({ option }) => {
//   switch (option) {
//     case 'Cancel':
//       this.handleModalOpen('isCancelOrderModalOpen');
//       break;
//     case 'Modify':
//       console.log('modify clicked')
//     default:
//       break;
//   }
// };

const BackOfficeTicketCard = ({
  classes,
  requestLabel,
  requestId,
  associateLabel,
  associateId,
  serviceId,
  heading,
  time,
  type,
  selected,
  status,
  onCardClick,
  selectedRow,
  showWarningIcon,
  categoryLabel,
  showTime,
  tooltip,
  setOldInteraction = null,
  submitCorporateRegistrationLead = null,
  setActiveCustomer = null,
  getFullCustomerAction = null,
  FetchBillingAccountsByCustomerId = null,
  history,
  ticketItem,
  partnerdetails,
  category,
  index,
  ActiveIndex
}) => {
  const associateID = associateId || serviceId;
  return (
    <Paper
      className={classNames(
        classes.root,
        index === ActiveIndex ? classes.activeCard : ''
      )}
      rounded="true"
      onClick={() => onCardClick(ticketItem, index)}
    >
      <Grid container>
        <Grid
          item
          container
          direction="column"
          spacing={1}
          // className={classes.statusSection}
        ></Grid>
        <Grid
          item
          container
          direction="column"
          spacing={1}
          // className={classNames(classes.contentSection, classes.leftContent)}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={2}
              className={index === ActiveIndex ? classes.activeNew : ''}
            >
              <Grid item>
                <Typography
                  className={classes.ticketID}
                  variant="caption"
                  style={{
                    color: index === ActiveIndex && '#000'
                  }}
                >
                  {requestLabel}:
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  className={classes.ticketIDValue}
                  style={{
                    color: index === ActiveIndex && '#999'
                  }}
                >
                  {requestId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography
                  variant="h2"
                  className={index === ActiveIndex ? classes.activeNew : ''}
                >
                  {' '}
                  {_.get(ticketItem?.relatedEntity, '[0].name', '...')}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Typography  variant="h4">
                  {_.get(ticketItem?.relatedEntity, '[0].id', '...')}
                </Typography> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ fontSize: '14px' }}
              className={
                index === ActiveIndex ? classes.activeNew : classes.titleChanges
              }
              spacing={2}
            >
              <Grid item>
                {isToday(ticketItem?.createdDate) ||
                isYesterday(ticketItem?.createdDate) ? (
                  <>
                    <div style={{ display: 'flex' }}>
                      <p>
                        {isToday(ticketItem?.createdDate)
                          ? `Today,`
                          : 'Yesterday,'}
                      </p>
                      <p>
                        {moment(ticketItem?.createdDate).format(' h:mm:ss a')}
                      </p>
                    </div>
                  </>
                ) : (
                  moment(ticketItem?.createdDate).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )
                )}
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
          {/* 
          <Grid item>
            <Typography className={classes.headerTitle} variant="body1">
              {heading}
            </Typography>
            {showTime && (
              <Grid item>
                {isToday(ticketItem?.createdDate) ? (
                  <Typography variant="subtitle2" className={classes.subTitle}>
                    <Trans id="Today"></Trans>
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" className={classes.typeCss}>
                    {time}
                  </Typography>
                )}
              </Grid>
            )}
          </Grid> */}
        </Grid>

        <Grid
          item
          container
          direction="column"
          spacing={1}
          className={classes.contentSection}
          alignItems="flex-end"
        >
          {/* {associateID && (
            <>
              {_get(selectedRow, 'status', '') ===
                constants.status.INPROGRESS && (
                <Grid
                  item
                  container
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                ></Grid>
              )}
              <Grid
                item
                container
                spacing={1}
                alignItems="flex-end"
                justify="flex-end"
                className={classes.associateHeading}
              >
                <Typography
                  variant="body1"
                  className={classes.associateHeading}
                >
                  {associateID}
                </Typography>
              </Grid>
              <Grid
                item
                container
                spacing={1}
                alignItems="flex-end"
                justify="flex-end"
              >
                <Typography variant="body1" className={classes.typeCss}>
                  {type}
                </Typography>
              </Grid>
            </>
          )} */}
        </Grid>
      </Grid>
    </Paper>
  );
};

BackOfficeTicketCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  requestId: PropTypes.string,
  associateId: PropTypes.string,
  heading: PropTypes.string,
  time: PropTypes.string,
  type: PropTypes.string,
  selected: PropTypes.bool,
  status: PropTypes.string,
  onCardClick: PropTypes.func,
  selectedRow: PropTypes.object
};

BackOfficeTicketCard.defaultProps = {
  requestId: null,
  associateId: null,
  heading: '',
  time: null,
  type: '',
  selected: false,
  status: '',
  onCardClick: null,
  selectedRow: null
};

export default withStyles(styles)(withRouter(BackOfficeTicketCard));

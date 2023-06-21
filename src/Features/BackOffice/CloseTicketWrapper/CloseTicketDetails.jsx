import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  IconButton,
  Menu,
  Chip,
  MenuItem,
  Button
} from '@material-ui/core';
import { useStateful } from 'react-hanger';

import Statuses from 'lib/constants/statuses';
import partnerFactory from 'Factory/Partner';
import dayjs from 'dayjs';
import SelectDropDown from 'Components/Dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TicketApi from 'Http/api/TroubleTicketApis/TicketSystem';
import ProductDetails from 'Features/TaskDetails/ProductDetails/CloseDetails';

import _isEmpty from 'lodash/isEmpty';

const styles = makeStyles((theme) => ({
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
  boxAlign: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e2e2',
    borderRadius: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '16px',
    rowGap: '10px'
  },
  commBox: {
    border: '1px solid #e2e2e2',
    borderRadius: '16px'
  },
  headerTitle: {
    width: 190,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  settBox: {
    border: '1px solid #e2e2e2',
    borderRadius: '16px',
    marginBottom: '10px'
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
    backgroundColor: theme.palette.common.white,
    height: '128px',
    marginRight: -6,
    maxWidth: '100%'
  },
  warningIcon: {
    color: theme.palette.warning.main
  },
  ticketID: {
    color: '#999999',
    fontWeight: 300,
    fontSize: '12px'
  },
  associateHeading: {
    marginLeft: '-2px'
  },
  bg: {
    background: 'red !important'
  },
  green: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  },
  red: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  },
  orange: {
    backgroundColor: theme.palette.common.gold,
    color: theme.palette.common.white
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  paperSpace: {
    '& .MuiMenu-paper': {
      backgroundColor:
        theme.palette.type === 'dark'
          ? theme.palette.common.gray
          : theme.palette.primary.black,
      padding: 0,
      width: '100px'
    }
  },
  iconStyle: {
    color: theme.palette.type === 'dark' ? '#fff !important' : '#757575'
  }
}));
const Settlement = ({ values }) => {
  // console.log(values,'syatttt')
  return (
    <>
      {values?.MainObj?.map((item) => {
        return (
          <>
            {Object.keys(item).map((field) => {
              return (
                <>
                  {field === 'settlementCycle' ? (
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="subtitle2">
                            {partnerFactory.removeUnderScore(field)}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            style={{ wordBreak: 'break-word' }}
                          >
                            {item[field].map((item) => {
                              return (
                                <>
                                  {item.from} - {item.to}
                                </>
                              );
                            })}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : field === 'path' ? (
                    <></>
                  ) : field === 'href' ? (
                    <></>
                  ) : field === '@baseType' ? (
                    <></>
                  ) : field === '@schemaLocation' ? (
                    <></>
                  ) : (
                    <Grid item xs={4}>
                      <Grid container direction="column">
                        <Grid item>
                          <Typography variant="subtitle2">
                            {partnerFactory.removeUnderScore(field)}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            style={{ wordBreak: 'break-word' }}
                          >
                            {field === 'createdDate' ? (
                              <>{dayjs(item[field]).format('DD MMM YYYY')}</>
                            ) : (
                              item[field]
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
};
const CommissionRules = ({ values }) => {
  const classes = styles();
  const rangeLabels = ['RangeFrom', 'RangeTo', 'RangeValue', 'RangeType'];

  const removeFields = (data) => {
    if (
      data['commissionType'] === 'Tier' ||
      data['commissionType'] === 'Volume'
    ) {
      return _.omit(data, [
        'path',
        'href',
        'baseType',
        '@schemaLocation',
        '_class',
        'status'
      ]);
    } else {
      return _.omit(data, [
        'path',
        'href',
        'baseType',
        '@schemaLocation',
        '_class',
        'status',
        'commissionRuleRange'
      ]);
    }
  };
  //console.log(values,'syattttsyatttt')
  return (
    <>
      {values?.MainObj?.map((item) => {
        return (
          <Paper elevation={0}>
            <>
              {Object.keys(removeFields(item)).map((field) => {
                return (
                  <>
                    {field !== 'commissionRuleRange' && (
                      <Grid item xs={3}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="subtitle2">
                              {item['commissionType'] === 'Tier' ||
                              item['commissionType'] === 'Volume' ? (
                                field === 'commissionValue' ? (
                                  '--'
                                ) : (
                                  <>{partnerFactory.removeUnderScore(field)}</>
                                )
                              ) : (
                                <>{partnerFactory.removeUnderScore(field)}</>
                              )}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <Typography
                              variant="subtitle1"
                              style={{ wordBreak: 'break-word' }}
                            >
                              {field === 'createdDate' ? (
                                <>
                                  {dayjs(item['createdDate']).format(
                                    'DD MMM YYYY'
                                  )}
                                </>
                              ) : item['commissionType'] === 'Tier' ||
                                item['commissionType'] === 'Volume' ? (
                                field === 'commissionValue' ? (
                                  ''
                                ) : (
                                  item[field]
                                )
                              ) : (
                                item[field]
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    {field === 'commissionRuleRange' && (
                      <Grid container spacing={12}>
                        <Grid item xs={12}>
                          <Grid container direction="row">
                            {item['commissionType'] === 'Tier' ||
                            item['commissionType'] === 'Volume' ? (
                              <>
                                {rangeLabels.map((label) => {
                                  return (
                                    <Grid
                                      item
                                      xs={3}
                                      style={{ padding: '0.5rem' }}
                                    >
                                      <Typography variant="subtitle2">
                                        {partnerFactory.removeUnderScore(label)}
                                      </Typography>

                                      {label === 'RangeFrom' ? (
                                        <>
                                          {item['commissionRuleRange']?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeFrom}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : label === 'RangeTo' ? (
                                        <>
                                          {item['commissionRuleRange']?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeTo}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : label === 'RangeValue' ? (
                                        <>
                                          {item['commissionRuleRange']?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeValue}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : label === 'RangeType' ? (
                                        <>
                                          {item['commissionRuleRange']?.map(
                                            (range) => {
                                              return (
                                                <>
                                                  <Typography variant="subtitle1">
                                                    {range.rangeType}
                                                  </Typography>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : (
                                        ''
                                      )}
                                    </Grid>
                                  );
                                })}
                              </>
                            ) : null}
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </>
                );
              })}
            </>
          </Paper>
        );
      })}
    </>
  );
};
const TicketDetails = ({
  values,
  partnerdetails,
  AssignUserList,
  DynamicMenusltems = [],
  openModal,
  handleAssignChange,
  contractObj,
  contractPreview
}) => {
  const classes = styles();

  //console.log(values, AssignUserList, 'valus');

  const StatusList = useStateful([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedVal, setSelectedVal] = React.useState('');

  // const userInfo = useSelector((state) => state.hierarchy.userInfo);

  // const authpermisson = useSelector((state) => state.auth.user);

  const open = Boolean(anchorEl);
  const getStatusColor = (lead) => {
    // if (
    //   contractObj.AddContractFor?.ContractInformation?.Contract_Current_Status
    // ) {
    //   return 'orange';
    // } else {
    //   return Statuses.statuses[lead?.status]?.color || 'orange';
    // }
    return Statuses.statuses[lead?.status]?.color || 'orange';
  };

  const Status = async () => {
    const res = await TicketApi._getTicketStatuslist();
    StatusList.setValue(res);
  };

  React.useEffect(() => {
    Status();
  }, []);
  // const getparser = (data) => {
  //   return _.map(data, (item) => {
  //     return {
  //       ...item,
  //       name: item?.username,
  //       code: item?.username
  //     };
  //   });
  // };

  const getparser = (data) => {
    if (data?.length > 0) {
      return _.map(data, (item) => {
        return {
          ...item,
          name: item?.username,
          code: item?.username
        };
      });
    } else {
      let arr = [];
      arr.push(data);
      return _.map(arr, (item) => {
        return {
          ...item,
          name: item?.username,
          code: item?.username
        };
      });
    }
  };

  getparser(AssignUserList), AssignUserList, 'title';
  const onClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    //console.log('selected item', event.currentTarget);
  };

  const modifyContract = () => {
    // console.log(contractObj, 'heyooon');
    openModal({
      id: 'FormsCreation',
      context: {
        formIdentity: 'Add_Contract',
        header: '',
        nodeDetails: {
          partnerId: values?.relatedParty[0]?.name,
          commissionCode:
            contractObj?.AddContractFor?.CommissionRuleDetails
              ?.Commission_Rule ||
            contractObj?.AddContractFor?.ContractInformation?.Commission_Code,
          settlementCode:
            contractObj?.AddContractFor?.SettlementRuleDetails?.Settlement_Rule
        },
        user: '',
        contractType: 'ProductContract',
        message: 'Partner Contract Modification Request submitted successfully'
      }
    });
  };
  const onClose = (event, action) => {
    // console.log(action?.name, values, 'action seeding');
    if (action.name) {
      event.stopPropagation();
      setAnchorEl(null);

      // onAction(action);

      openModal({
        id: 'ApprovalReason',
        context: {
          modalFrom: 'Tickets',
          data: values,

          row: {},
          actions: action,
          modalStatus: action?.name
        }
      });
    }
    event.stopPropagation();
    setAnchorEl(null);
  };
  const formIdentity = {
    Partner_Profile: {
      title: 'Partner Information',
      code: 'PartnerProfileCreation'
    },
    Add_Product: {
      title: 'Product Information',
      code: 'AddProduct'
    },
    Add_Contract: {
      title: 'Contract Information',
      code: 'AddContractFor'
    },
    ['@baseType']: {
      title: 'Adjust Information',
      code: 'Adjustment'
    },
    Tenant_Partner_Profile: {
      title: 'Tenant Information',
      code: 'TenantProfileCreation'
    }
  };

  useEffect(() => {
    if (!_isEmpty(values)) {
      //  console.log(
      //     _.filter(getparser(AssignUserList), [
      //       'username',
      //       values?.assignees?.id
      //     ])[0]?.username,
      //     'frefre',
      //     values?.assignees[0]?.id,
      //     AssignUserList
      //   );
    }
  }, [values]);

  // console.log(selectedVal,values, 'valuess');

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          {!_.includes(['Approve', 'Reject', 'Open'], values?.status) && (
            <Grid container direction="row" justifyContent="flex-end">
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={onClick}
                >
                  <MoreVertIcon className={classes.iconStyle} />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={onClose}
                  className={classes.paperSpace}
                >
                  {DynamicMenusltems?.map((option) => (
                    <MenuItem
                      key={option.id}
                      onClick={(e) => onClose(e, option)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Grid>
          )}

          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography variant="h2">
                {` ${_.get(values?.relatedEntity, '[0].name', 'Ticket')} `}
              </Typography>
            </Grid>

            <Grid item>
              {values?.status === 'Approve' &&
              values?.relatedEntity[0]?.name === 'Contract Modification' &&
              contractObj.AddContractFor?.ContractInformation
                ?.Contract_Current_Status === 'Modify Contract' ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={modifyContract}
                >
                  Modify contract
                </Button>
              ) : (
                <>
                  {!_.includes(['Approve', 'Reject'], values?.status) && (
                    <SelectDropDown
                      label="Assign Users"
                      handleChange={(e) => {
                        handleAssignChange(e, values);
                        setSelectedVal(e.target.value);
                      }}
                      //value={selectedVal}
                      value={
                        values?.status?.toLowerCase() === 'inprogress'
                          ? _.filter(getparser(AssignUserList), [
                              'username',
                              values?.assignees?.id
                            ])[0]?.username ||
                            selectedVal ||
                            values?.assignees[0]?.id
                          : selectedVal
                      }
                      // value={_.get(values, 'assignees.[0].id', "")}
                      options={getparser(AssignUserList) || []}
                      // value={_.get(values, 'assignees.[0].id', '')}
                      selectedUserData={true}
                    />
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* <Grid container spacing={4}> */}

        <Grid
          item
          container
          direction="column"
          spacing={6}
          // className={classNames(classes.contentSection, classes.leftContent)}
        >
          <Grid item xs>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Chip
                  className={classes[getStatusColor(values)]}
                  style={{ fontSize: '12px' }}
                  label={_.get(values, 'status', '')}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{padding:"0px"}}>
            {values?.relatedEntity && (
              <ProductDetails
                preview
                maintitle={'Partner Information'}
                // contractPreview={contractPreview}

                contractPreview={false}
                productData={values?.relatedData?.openAccount}
                values={values?.relatedData?.openAccount}
                ticket={values}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TicketDetails;

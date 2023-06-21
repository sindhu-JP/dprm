import _ from 'lodash';
import Alert from 'Store/Alert';
import Modal from 'Store/Modals';
import LeadsAPI from 'Http/api/leads';
import LeadFactory from 'Factory/Lead';
import DocumnetsAPI from 'Http/api/documents';
import config from 'config';
import AnalyticsData from 'Http/api/analytics';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { history } from 'Store';
import hierarchyApi from 'Http/api/hierarchy';

const create = createAsyncThunk(
  'leads/create',
  async (
    { id, status, data, isSaveAndExit, parent },
    { dispatch, getState }
  ) => {
    const user = getState().auth.user;

    const payload = {
      id,
      status,
      statusChange: [
        {
          id: 2,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ],
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      createdBy: {
        name: data?.assignment?.name,
        email: data?.assignment?.email
      },
      channel: [
        {
          id: user.sub,
          name: 'DLPM',
          referredType: 'Channel'
        }
      ],
      ...LeadFactory.makeNewLeadPayload(data)
    };

    const lobchecking = await hierarchyApi
      .digitalSales(payload.leadAssignment.name)
      .catch((err) => {
        throw Error('Failed to Digital sales. Please try again.');
      });

    let serviceofLob = payload.lob.split(',');
    let assignlob = lobchecking.lob.split(',');

    var lobCheck = assignlob.filter((e) => serviceofLob.indexOf(e) !== -1);

    // if(_.isMatch(assignlob, serviceofLob)){
    if (_.isEqual(serviceofLob, lobCheck)) {
      const res = await LeadsAPI.create(payload);
      await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

      //  const  notifyId=config.dev.server.dlpm_base_url?"1942":"1656"
      const notificationPayload = {
        // notificationId: notifyId,
        // notificationId: "2352",
        notificationCode: 'LeadCreation',
        emailTo: payload.leadAssignment.email,
        inputValue: {
          user: payload.leadAssignment.name,
          lead: payload.companyDetails.companyName,
          loggedUser: user.sub
        }
      };
      const Notificationres =
        !isSaveAndExit &&
        (await LeadsAPI.shareNotification(notificationPayload));

      dispatch(Modal.close('leadCreation'));

      dispatch(
        Alert.open({
          type: 'Success',
          message: `Lead ${data.companyDetails.companyName} ${
            isSaveAndExit ? 'saved' : 'created'
          } successfully.`
        })
      );
      // return {};
      return res;
    } else {
      dispatch(
        Alert.open({
          type: 'error',
          message: ` ${payload.leadAssignment.name} doesnt have ${payload.lob} as LoB ,Please try with different user 
      `
        })
      );
    }
  }
);

const NewLead = createAsyncThunk(
  'leads/NewLead',
  async ({ id, status, data, parent }, { dispatch, getState }) => {
    const user = getState().auth.user;
    const payload = {
      id,
      status,
      statusChange: [
        {
          id: 2,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ],
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      channel: [
        {
          id: user.sub,
          name: 'DLPM',
          referredType: 'Channel'
        }
      ],

      ...data
    };

    const res = await LeadsAPI.create(payload);
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    dispatch(Modal.close('leadCreation'));

    dispatch(
      Alert.open({
        type: 'Success',
        message: `Lead ${
          data.companyDetails.companyName
        } ${'created'} successfully.`
      })
    );

    dispatch(
      Modal.open({
        id: 'opportunityCreation',
        context: {
          lead: res,
          NewOpp: false,
          user: user
        }
      })
    );

    // return {};
    return res;
  }
);

/**
 * Load all leads
 */

const existingCustomer = createAsyncThunk(
  'leads/existingCustomer',
  async ({ user }, { dispatch }) => {
    const response = await LeadsAPI.getAllexisting().catch((err) => {});
    return response;
  }
);

const loadAll = createAsyncThunk(
  'leads/loadAll',
  async ({ user, count, usergrpinfo }, { dispatch }) => {
    const response = await LeadsAPI.loadleadAll({ user, count, usergrpinfo });
    // const exiting= await LeadsAPI.getAllexisting().catch(err=>console.log(err));
    // await dispatch(existingCustomer())
    // if(authState.token){
    //   await dispatch(hierarchy.loadHirarchy({user, authState}))
    // }

    // const usergrpinfo = await hierarchyApi.digitalSales(payload).catch((err) => {
    //   throw Error('Failed to Digital sales. Please try again.')
    // })
    return response;
  }
);

//  lead search

const LeadSearch = createAsyncThunk(
  'leads/LeadSearch',
  async (value, { dispatch }) => {
    const lead = await LeadsAPI.leadOnsearch(value);
    return lead;
  }
);

const LeadStatusCount = createAsyncThunk(
  'leads/LeadStatusCount',
  async (dispatch) => {
    const lead = await LeadsAPI.leadStatusCount();
    return lead;
  }
);

const SlaTiming = createAsyncThunk(
  'leads/SlaTiming',
  async (value, { dispatch }) => {
    const lead = await LeadsAPI.slaTiming(value);
    return lead;
  }
);

const LeadTableFilter = createAsyncThunk(
  'leads/LeadTableFilter',
  async (value, { dispatch }) => {
    const lead = await LeadsAPI.LeadTableFilter(value);
    return lead;
  }
);

/**
 * Approve Lead
 */
const approve = createAsyncThunk(
  'leads/approve',
  async (
    {
      status,
      id,
      statusChangeReason,
      modalId,
      quoteId,
      duration,
      leadData,
      user,
      oppId,
      payload,
      parent
    },

    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status,
      statusChange: [
        {
          statusId: 3,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ],
      statusChangeReason,
      oppId
    }).catch((err) => {
      throw Error('Failed to approve. Try again.');
    });

    dispatch(Modal.close(modalId));
    //  await dispatch(reassign({
    //   status,
    //   id,
    //   statusChangeReason,
    //   modalId,
    //   quoteId,
    //   duration,
    //   leadData,
    //   user,
    //   oppId,
    //   payload,
    //  }))

    // await LeadsAPI.updateStatusHistory(id, {
    //   status,
    // }).catch((err) => {
    //   throw Error("Failed to update status history. Please try again.");
    // });
    const GetKpi = await AnalyticsData.getKpi({ duration }).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    const notificationPayload = {
      // notificationId: "1941",
      // notificationId: "2351",
      notificationCode: 'LeadApproval',
      emailTo: leadData.lead.leadAssignment.email,
      inputValue: {
        user: leadData.lead.leadAssignment.name,
        lead: leadData.lead.companyDetails.companyName,
        loggedUser: leadData.user.sub
      }
    };
    const Notificationres = await LeadsAPI.shareNotification(
      notificationPayload
    );

    dispatch(Modal.close(modalId));
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Lead Successfully Approved.'
      })
    );

    dispatch(Modal.close('leadView'));
    return { lead, GetKpi };
  }
);

/**
 * Drop Lead
 */
const drop = createAsyncThunk(
  'leads/drop',
  async (
    { id, status, payload, modalId, quoteId, user, oppId, parent },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status,
      ...payload,
      oppId,

      quoteId: quoteId
    }).catch((err) => {
      throw Error('Failed to drop lead. Please try again.');
    });

    // await LeadsAPI.updateStatusHistory(id, {
    //   status,
    // }).catch((err) => {
    //   throw Error("Failed to update status history. Please try again.");
    // });

    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    dispatch(Modal.close(modalId));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Lead Dropped Successfully.'
      })
    );
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return { lead, resdata };
  }
);

/**
 * Reassign Lead
 */
const reassign = createAsyncThunk(
  'leads/reassign',
  async (
    { id, payload, modalId, quoteId, user, oppId, parent },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatus(id, {
      leadAssignment: { ...payload },
      quoteId: quoteId,
      oppId
    }).catch((err) => {
      throw Error('Failed to reassign lead. Please try again.');
    });
    dispatch(Modal.close(modalId));
    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Lead Reassign Successfully.'
      })
    );

    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return { lead, resdata };
  }
);

/**
 *Lead classification
 */

const leadClassification = createAsyncThunk(
  'leads/Leadclassification',
  async (
    { id, reason, modalId, payload, user, oppId, parent },
    { dispatch }
  ) => {
    await LeadsAPI.updateLeadClassiFication(id, payload, reason, oppId).catch(
      (err) => {
        throw Error('Failed to reassign lead. Please try again.');
      }
    );

    // const response = await LeadsAPI.loadAll({user}).catch(err=>console.log(err))

    const lead = await LeadsAPI.updateStatus(id, {}).catch((err) => {
      throw Error('Failed to reassign lead. Please try again.');
    });

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    dispatch(Modal.close(modalId));

    dispatch(Modal.close('quoteview'));

    dispatch(Modal.close('leadView'));

    dispatch(
      Alert.open({
        message: `Lead Classification changed successfully.`,
        type: 'success'
      })
    );

    return lead;
  }
);

/**
 * Create Opportunity
 */
const createOpportunity = createAsyncThunk(
  'leads/createOpportunity',
  async (
    {
      id,
      status,
      serviceOfInterest,
      modalId,
      products,
      user,
      leaddata,
      lob,
      companyDetails,
      leadAssignment,
      opportunities,
      selectedlobs,
      opportunitiesstatus,
      quoteId,
      contractId,
      isSaveAndExit,
      ConcelledQuote,
      parent
    },
    { dispatch }
  ) => {
    if (opportunitiesstatus) {
      let lead = await LeadsAPI.updateStatus(id, {
        // serviceOfInterest,
        // opportunities: _.filter(opportunities,v => _.keys(v).length !== 0)

        companyDetails,
        leadAssignment,
        opportunities: LeadFactory.opportunitypayload(opportunities),

        lob

        // opportunitiesstatus?"":status
      }).catch((err) => {
        throw Error('Failed to add products. Please try again.');
      });
      await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
      if (lob.includes('ICTServices')) {
        dispatch(Modal.close(modalId));
        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));

        !isSaveAndExit &&
          dispatch(
            Modal.open({
              id: 'productConfiguration',
              context: {
                user: user,
                lead: lead,
                opportuntiData: lead.opportunities[0],
                id: lead.opportunities[0].id
              }
            })
          );
      } else {
        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));

        !isSaveAndExit &&
          dispatch(
            Modal.open({
              id: 'productConfiguration',
              context: {
                user: user,
                lead: lead,
                opportuntiData: lead.opportunities[0],
                id: lead.opportunities[0].id
              }
            })
          );
        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));

        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));
      }

      dispatch(Modal.close('existingLead'));

      // await dispatch(loadAll({ user }))
      history.push('/');

      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Opportunity Added Successfully.'
        })
      );

      if (ConcelledQuote && (quoteId || contractId)) {
        dispatch(await cancelledStatus({ quoteId, contractId }));
      }

      return lead;
    } else {
      let lead = await LeadsAPI.updateStatus(id, {
        status,
        // serviceOfInterest,
        // opportunities: _.filter(opportunities,v => _.keys(v).length !== 0)

        companyDetails,
        leadAssignment,
        opportunities: LeadFactory.opportunitypayload(opportunities),
        lob
      }).catch((err) => {
        throw Error('Failed to add products. Please try again.');
      });
      await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
      if (lob.includes('ICTServices')) {
        dispatch(Modal.close(modalId));
        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        !isSaveAndExit &&
          dispatch(
            Modal.open({
              id: 'productConfiguration',
              context: {
                user: user,
                lead: lead,
                opportuntiData: lead.opportunities[0],
                id: lead.opportunities[0].id
              }
            })
          );
        dispatch(Modal.close('quoteview'));
      } else {
        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));

        !isSaveAndExit &&
          dispatch(
            Modal.open({
              id: 'productConfiguration',
              context: {
                user: user,
                lead: lead,
                opportuntiData: lead.opportunities[0],
                id: lead.opportunities[0].id
              }
            })
          );
        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));

        dispatch(Modal.close('opportunityCreation'));
        dispatch(Modal.close('leadView'));
        dispatch(Modal.close('quoteview'));
      }

      dispatch(Modal.close('existingLead'));

      // await dispatch(loadAll({ user }))

      dispatch(
        Alert.open({
          type: 'Success',
          message: 'Opportunity Added Successfully.'
        })
      );
      if (ConcelledQuote && (quoteId || contractId)) {
        dispatch(await cancelledStatus({ quoteId, contractId }));
      }

      return lead;
    }
    // lead/status/id
    // const lead =   await LeadsAPI.updateStatusHistory(id, {

    // }).catch((err) => {
    //   throw Error("Failed to add products. Please try again.");
    // });
    // await LeadsAPI.updateStatusHistory(id, {
    //   status,
    // }).catch((err) => {
    //   throw Error("Failed to add products. Please try again.");
    // });
  }
);

// productsconfigurarion

const modifyPlan = createAsyncThunk(
  'leads/modifyPlan',
  async (
    {
      id,
      status,
      quote,
      duration,
      user,
      leaddata,
      opportunities,
      oppId,
      contract,
      changeplan,
      payload,
      parent
    },
    { dispatch }
  ) => {
    let merge = opportunities.concat(leaddata.opportunities);
    const lead = await LeadsAPI.updateStatus(id, {
      opportunities: merge,
      statusChange: [
        {
          statusId: 5,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to add products. Please try again.');
    });
    // await LeadsAPI.updateStatusHistory(id, {
    //   status,
    // }).catch((err) => {
    //   throw Error("Failed to add products. Please try again.");
    // });

    // dispatch(Modal.close("productConfiguration"));
    // dispatch(Modal.close("leadView"));

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    const GetKpi = await AnalyticsData.getKpi({ duration }).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    if (lead.lob.includes('ICTServices')) {
      dispatch(Modal.close('productConfiguration'));
      dispatch(Modal.close('leadView'));
    } else {
      dispatch(Modal.close('productConfiguration'));

      dispatch(Modal.close('leadView'));
      dispatch(
        Modal.open({
          id: 'quoteGeneration',
          context: {
            user: user,
            lead: lead,
            opportuntiData: {
              quote: quote,
              id: oppId,
              contract: contract
            },
            id: _.get(merge, '[0].id', '')
          }
        })
      );
    }

    dispatch(Modal.close('Addvas'));

    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    history.push('/');
    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Opportunity configuration completed.'
      })
    );
    return { lead, GetKpi };
  }
);

const addproductsconfig = createAsyncThunk(
  'leads/addproductsconfig',
  async (
    {
      id,
      status,
      quote,
      duration,
      user,
      leaddata,
      isSaveAndExit,
      opportunities,
      oppId,
      contract,
      changeplan,
      parent
    },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status,
      quote,
      oppId,
      ...changeplan,
      statusChange: [
        {
          statusId: 6,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to add products. Please try again.');
    });
    // await LeadsAPI.updateStatusHistory(id, {
    //   status,
    // }).catch((err) => {
    //   throw Error("Failed to add products. Please try again.");
    // });

    // dispatch(Modal.close("productConfiguration"));
    // dispatch(Modal.close("leadView"));

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    const GetKpi = await AnalyticsData.getKpi({ duration }).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    // if (lead.lob.includes('ICTServices') || status === 'MANUAL_FEASIBILITY') {
    //   dispatch(Modal.close('productConfiguration'));
    //   dispatch(Modal.close('leadView'));
    // } else {
    //   dispatch(Modal.close('productConfiguration'));

    //   dispatch(Modal.close('leadView'));
    // !isSaveAndExit && dispatch(Modal.open({
    // !isSaveAndExit &&
    //   dispatch(
    //     Modal.open({
    //       id: 'quoteGeneration',
    //       context: {
    //         user: user,
    //         lead: lead,
    //         opportuntiData: {
    //           quote: quote,
    //           id: oppId,
    //           contract: contract,
    //         },
    //         id: _.get(opportunities, '[0].id', ''),
    //       },
    //     }),
    //   )
    // }

    dispatch(Modal.close('Addvas'));

    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    history.push('/');
    dispatch(
      Alert.open({
        type: 'Success',
        message: `Opportunity configuration ${
          isSaveAndExit ? 'saved' : 'completed'
        }.`
      })
    );
    return { lead, GetKpi };
  }
);

/**
 * Create Quotation
 */
const createQuotation = createAsyncThunk(
  'leads/createQuotation',
  async (
    {
      lead,
      quote,
      quoteId,
      user,
      companyDetails,
      oppId,
      isNewQuote,
      leadAssignment,
      status,
      isSaveAndExit,
      statusId,
      parent
    },
    { dispatch }
  ) => {
    //
    if (!isNewQuote) {
      await LeadsAPI.updateQuote(quote, oppId).catch((err) => {
        throw Error('Please fill in the mandatory fields to proceed');
      });
    } else {
      await LeadsAPI.generateQuote(quote, oppId).catch((err) => {
        throw Error('Please fill in the mandatory fields to proceed');
      });
    }

    let quotedata = await LeadsAPI.updateStatusHistory(lead.id, {
      status,
      oppId,
      companyDetails,
      quoteId,
      leadAssignment,
      statusChange: [
        {
          statusId: statusId,

          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Please fill in the mandatory fields to proceed');
    });

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    await LeadsAPI.quoteexpired(lead.id).catch((err) => {
      throw Error('error');
    });
    await LeadsAPI.Contractvalidity(lead.id).catch((err) => {
      throw Error('error');
    });

    const leadres = await LeadsAPI.updateStatus(lead.id, {
      companyDetails,
      leadAssignment
    }).catch((err) => {
      throw Error('Please fill in the mandatory fields to proceed');
    });

    const resdata = await LeadsAPI.getUpdatedQuote(lead.id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    dispatch(Modal.close('quoteGeneration'));
    // dispatch(Modal.close("opportunityCreation"));
    // dispatch(Modal.close("productConfiguration"));
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    dispatch(
      Modal.open({
        id: 'ContractCreation',

        context: {
          user: user,
          lead: quotedata,
          user: user,
          modelID: 'Create Contract',
          opportuntiData: quotedata.opportunities[0],
          id: quotedata.opportunities[0].id
        }
      })
    );

    return { leadres, resdata };
  }
);

/**
 * Reject Quote
 */
const rejectQuote = createAsyncThunk(
  'leads/rejectQuote',
  async (
    {
      status,
      id,
      modalId,
      statusChangeReason,
      quoteid,
      quoteId,
      description,
      user,
      oppId,
      contractId,
      parent
    },
    { dispatch }
  ) => {
    //  await LeadsAPI.updateStatus(id, {
    //   status: status,
    //   reason: statusChangeReason,
    //
    //   quoteId:quoteid
    // }).catch((err) => {
    //   throw Error("Failed to Approve Quote. Please try again.");
    // });

    const lead = await LeadsAPI.updateStatusHistory(id, {
      status: status,
      statusChangeReason,

      quoteId: quoteId,
      description,
      oppId,
      contractId,
      statusChange: [
        {
          statusId: 6,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    dispatch(Modal.close(modalId));

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    dispatch(Modal.close('quoteview'));
    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Quote Rejected Successfully.'
      })
    );
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));

    return { lead, resdata };
  }
);
/**
 * Approve Quote
 */
const approveQuote = createAsyncThunk(
  'leads/approveQuote',
  async (
    {
      id,
      modalId,
      statusChangeReason,
      quoteId,
      user,
      oppId,
      contractId,
      parent
    },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status: 'SHARE',
      reason: statusChangeReason,

      quoteId,
      oppId,
      contractId,

      statusChange: [
        {
          statusId: 9,
          status: 'SHARE',
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    // dispatch(getQuotedata())

    // await LeadsAPI.updateStatusHistory(id, {
    //   status: "SHARE_QUOTATION",
    // }).catch((err) => {
    //   throw Error("Failed to update status history. Please try again.");
    // });

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    await dispatch(Contracttablerow({ id: id }));
    dispatch(Modal.close(modalId));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Quote Approved Successfully.'
      })
    );
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return {
      lead,
      resdata
    };
  }
);

/**
 * Blacklist CHeck
 */
const blackListCheck = createAsyncThunk(
  'leads/blackListCheck',
  async ({ companyName, companyRegistrationNumber }) => {
    const payload = LeadFactory.makeBlackListCheckPayload({
      companyName,
      companyRegistrationNumber
    });

    const response = await LeadsAPI.blackListCheck(payload).catch((err) => {
      throw Error({
        code: 'FAILED_BLACKLIST',
        mesage: 'Blacklist Check failed'
      });
    });

    return response;
  }
);

/**
 * Duplicate Check
 */
const duplicateCheck = createAsyncThunk(
  'leads/suplicateCheck',
  async ({ companyName, companyRegistrationNumber }) => {
    const payload = LeadFactory.makeDuplicateCheckPayload({
      companyName,
      companyRegistrationNumber
    });

    const response = LeadsAPI.duplicateCheck(payload).catch((err) => {
      throw Error({
        code: 'FAILED_DUPLICATE',
        message: 'Duplicate Check Failed'
      });
    });

    const customerId = _.get(response, 'field.details[0].value', null);

    if (customerId) {
      const customer = await LeadsAPI.getCustomer(customerId);
      const organisation = await LeadsAPI.getOrganisation(
        _.get(customer, 'engagedParty.id', null)
      );

      return {
        message: 'Hello'
      };
    } else {
      return {
        code: 'SUCCESS_DUPLICATE',
        message: 'Duplicate Check Passed'
      };
    }
  }
);

/**
 * Share Quotation
 */
const shareQuotation = createAsyncThunk(
  'leads/shareQuotation',
  async (
    {
      id,
      status,
      modalId,
      data,
      email,
      quoteId,
      payload,
      user,
      oppId,
      parent,
      contractId
    },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status: 'CONTRACT_SIGN_OFF',
      quoteId: quoteId,
      oppId,
      contractId,
      statusChange: [
        {
          statusId: 10,
          status: 'SHARE',
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to Share Quote. Please try again.');
    });

    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    await LeadsAPI.shareattachment(payload).catch((err) => {
      throw Error('Failed to Share Quote. Please try again..');
    });

    await dispatch(Quotetablerow({ id: id }));
    await dispatch(Contracttablerow({ id: id }));
    // dispatch(
    //   Modal.open({
    //     id: 'ContractSignoff',
    //     context: {
    //       lead: data?.lead,
    //       opportuntiData: data?.opportuntiData,
    //       user: data?.user,
    //     },
    //   }),
    // )

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    dispatch(Modal.close(modalId));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Quote Shared Successfully.'
      })
    );
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return {
      resdata,
      lead
    };
  }
);

/**
 * Customer Accepted
 */
const customerAccepted = createAsyncThunk(
  'leads/customerAccepted',
  async (
    {
      id,
      modalId,
      status,
      statusChangeReason,
      quoteId,
      user,
      oppId,
      contractId,
      serviceRequestType,
      parent
    },
    { dispatch }
  ) => {
    // const lead = await LeadsAPI.updateStatus(id, {
    //   status,
    //   statusChangeReason,
    // }).catch((err) => {
    //   throw Error("Failed to Accept. Please try again.");
    // });

    const lead = await LeadsAPI.updateStatusHistory(id, {
      // quoteId:quoteId,
      status,
      // statusChangeReason,
      oppId,
      contractId,
      serviceRequestType,
      statusChange: [
        {
          statusId: 12,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    dispatch(Modal.close(modalId));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Accepted Successfully.'
      })
    );

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    await LeadsAPI.getquoteStatus(quoteId, {
      status: 'CUSTOMER_ACCEPTED'
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });
    await LeadsAPI.contractSignoffpatch(contractId, {
      status: 'CUSTOMER_ACCEPTED'
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    // await dispatch(Quotetablerow({id:leadid}))
    await dispatch(Contracttablerow({ id: id }));
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return {
      resdata,
      lead
    };
  }
);

const cancelledStatus = createAsyncThunk(
  'leads/cancelledStatus',
  async ({ quoteId, contractId }, { dispatch }) => {
    if (quoteId) {
      await LeadsAPI.getquoteStatus(quoteId, { status: 'CANCELLED' });
    }
    if (contractId) {
      await LeadsAPI.contractSignoffpatch(contractId, {
        status: 'CANCELLED'
      }).catch((err) => {
        throw Error('Failed to update status history. Please try again.');
      });
    }
  }
);
/**
 * Customer Rejected
 */

// const getQuotedata=createAsyncThunk(
//   "leads/getQuotedata",

// async({},{})=>{

//   //  const resdata= await LeadsAPI.getleadidDetails()

// }

const customerRejected = createAsyncThunk(
  'leads/customerRejected',
  async (
    {
      id,
      modalId,
      status,
      statusChangeReason,
      quoteId,
      description,
      user,
      oppId,
      parent
    },
    { dispatch }
  ) => {
    //  await LeadsAPI.updateStatus(id, {
    //   // status,
    //   // statusChangeReason,
    //   //  quoteId:quoteId
    // }).catch((err) => {
    //   throw Error("Failed to Reject. Please try again.");
    // });

    const lead = await LeadsAPI.updateStatusHistory(id, {
      // status: "CUSTOMER_REJECTED",
      quoteId: quoteId,
      status,
      oppId,

      // statusChangeReason,
      //  quoteId:quoteId
      description
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    dispatch(Modal.close(modalId));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Rejected Successfully.'
      })
    );
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    // dispatch(getQuotedata())

    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return {
      resdata,
      lead
    };
  }
);

/**
 * Download Quote
 */
const downloadQuote = createAsyncThunk(
  'leads/downloadQuote',
  async ({ quoteId }, { dispatch }) => {
    if (!quoteId) {
      return dispatch(
        Alert.open({
          type: 'Error',
          message: 'Failed to download quote.'
        })
      );
    }

    await DocumnetsAPI.downloadPdfReport(quoteId).catch((err) => {
      throw Error('Failed to Reject. Please try again.');
    });

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Quote Downloaded Successfully.'
      })
    );

    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
  }
);

const shareAttachment = createAsyncThunk(
  'leads/shareAttachment',
  async ({ quoteId, fileblob }, { dispatch }) => {
    const lead = await DocumnetsAPI.shareattachment(quoteId).catch((err) => {
      throw Error('Failed to Reject. Please try again.');
    });

    return lead;
  }
);

const ServiceUpdate = createAsyncThunk(
  'leads/ServiceUpdate',
  async (
    {
      id,
      user,
      statusChangeReason,
      lead,
      OppData,
      payload,
      Subscription,
      Stepper,
      duration
    },
    { dispatch }
  ) => {
    const data = await LeadsAPI.updateStatus(id, { statusChangeReason }).catch(
      (err) => {
        throw Error('Failed to Reject. Please try again.');
      }
    );

    dispatch(Modal.close('ServiceUpdate'));
    dispatch(
      Modal.existingOpenModel({
        id: 'opportunityCreation',
        context: {
          duration: duration,
          lead: lead,
          user: user,
          NewOpp: true,
          OppData: OppData,
          Subscription: Subscription,
          payload: payload,
          Stepper: Stepper
        }
      })
    );
    return data;
  }
);

const ManualFeasibilityFailed = createAsyncThunk(
  'leads/ManualFeasibilityFailed',
  async ({ id, user, opportuntiData, parent }, { dispatch }) => {
    //
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status: 'FEASIBILITY_FAILED',
      oppId: opportuntiData?.id
    }).catch((err) => {
      throw Error('Failed to Reject. Please try again.');
    });

    // await LeadsAPI.updateStatusHistory(id, {
    //   status: "FEASIBILITY_FAILED",
    // }).catch((err) => {
    //   throw Error("Failed to update status history. Please try again.");
    // });

    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Feasibility Failed.'
      })
    );

    return lead;
  }
);

const approveManualFeasibility = createAsyncThunk(
  'leads/approveManualFeasibility',
  async (
    { id, modalId, status, statusChangeReason, oppId, data },
    { dispatch }
  ) => {
    await LeadsAPI.updateStatus(id, {
      // status,
      statusChangeReason,
      oppId
    }).catch((err) => {
      throw Error('Failed to Reject. Please try again.');
    });

    let lead = await LeadsAPI.updateStatusHistory(id, {
      status: 'QUOTE_GENERATE',
      oppId,
      statusChange: [
        {
          statusId: 5,
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ]
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    // dispatch(
    //   Modal.open({
    //     id: 'quoteGeneration',
    //     context: {
    //       user: data?.user,
    //       lead: data?.lead,
    //       opportuntiData: {
    //         quote: data?.opportuntiData?.quote,
    //         id: data?.opportuntiData?.id,
    //         contract: data?.opportuntiData?.contract,
    //       },
    //       id: _.get(data.opportuntiData, 'id', ''),
    //     },
    //   }),
    // )

    dispatch(Modal.close(modalId));

    dispatch(Modal.close('leadView'));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'feasibilityComplete Successfully.'
      })
    );

    return lead;
  }
);
const manualFeasibilityRequired = createAsyncThunk(
  'manualFeasibilityRequired/leads',
  async ({ id, payload, user, parent }, { dispatch }) => {
    const lead = await LeadsAPI.updateStatus(id, payload).catch((err) => {
      throw Error('Failed to Reject. Please try again.');
    });

    await LeadsAPI.updateStatusHistory(id, { status: payload.status }).catch(
      (err) => {
        throw Error('Failed to update status history. Please try again.');
      }
    );

    dispatch(Modal.close('feasibilityForm'));
    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Successfully Requested Manual Feasibility.'
      })
    );
    dispatch(Modal.close('leadView'));
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    // return lead;
    return {};
  }
);

//comment section
const commentSection = createAsyncThunk(
  'leads/commentSection',
  async ({ id, note }, { dispatch }) => {
    const lead = await LeadsAPI.updateStatus(id, {
      note: note
    }).catch((err) => {
      throw Error('Failed to Accept. Please try again.');
    });

    return lead;
  }
);

const startonboarding = createAsyncThunk(
  'startonboarding/leads',
  async ({ id, quoteId, status, statusChangeReason }, { dispatch }) => {
    // const lead = await LeadsAPI.updateStatus(id, {
    // status:"ONBOARDED",
    // quoteId:quoteId
    // }).catch((err) => {
    //   throw Error("Failed to Reject. Please try again.");
    // });
    // return window.open(
    //   `${config.dev.server.dlpm_base_url}/dclm-web-ui/`,
    //   "_self"
    // );
  }
);

const ViewProfile = createAsyncThunk(
  'ViewProfile/leads',
  async ({ id, quoteId, status, statusChangeReason }, { dispatch }) => {
    return window.open(
      `${config.dev.server.dlpm_base_url}/dsm-customer-etopup/bulkanGraph`,
      '_blank'
    );
  }
);

const checkautofeacibility = createAsyncThunk(
  'checkautofeacibilitye/leads',
  async ({ id, quoteId, status, statusChangeReason }, { dispatch }) => {
    const lead = await LeadsAPI.checkfeacibilty(id, {
      status: 'ONBOARDED',
      quoteId: quoteId
    }).catch((err) => {
      throw Error('Failed to Reject. Please try again.');
    });

    return lead;
  }
);

const loadgetKpi = createAsyncThunk(
  'loadgetKpi/leads',
  async ({ duration }, { dispatch }) => {
    const GetKpi = await AnalyticsData.getKpi({ duration }).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    return { GetKpi };
  }
);

const Quotetablerow = createAsyncThunk(
  'Quotetablerow/leads',
  async ({ id }, { dispatch }) => {
    const lead = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });

    return lead;
  }
);
const Contracttablerow = createAsyncThunk(
  'Contracttablerow/leads',
  async ({ id }, { dispatch }) => {
    const lead = await LeadsAPI.getUpdatedContract(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    return lead;
  }
);

const customerManagement = createAsyncThunk(
  'leads/customerManagement',
  async ({ id }) => {
    const customer = LeadsAPI.customerManagement(id).catch((err) => {
      throw Error(' ');
    });

    return customer;
  }
);

const runLeadVerification = createAsyncThunk(
  'leads/runLeadVerification',
  async (
    { companyName, registrationNumber, payload, duplicatecheck },
    { dispatch }
  ) => {
    // const lead = await LeadsAPI.duplicateCheck({
    //   companyName,
    //   registrationNumber
    // }).catch(err => {
    //   throw Error(' ')
    // })

    const blacklistLead = await LeadsAPI.blackListCheck(payload).catch(
      (err) => {
        throw Error(' ');
      }
    );

    //  const duplicate=await LeadsAPI.duplicatedenilist(duplicatecheck).catch(
    //   (err) => {
    //     throw Error(" ");
    //   }
    // );
    // if(duplicate){

    // // await dispatch(customerManagement( _.get(duplicate.fieldDetails,"[0].value","")))
    //   }

    //  if(duplicate.result=== "FAIL"){

    //   dispatch(
    //     Modal.open({
    //       id: "duplicateModel",
    //       context: {
    //         title: "Duplicate",
    //       },
    //     })
    //   );

    //  }

    // if (lead.status === "Failed") {
    //   dispatch(Modal.open({
    //     id: "duplicateModel", context: {
    //       title: "Duplicate Check",

    //     }
    //   }));

    // } else

    if (blacklistLead.status === 'FAILED') {
      dispatch(
        Modal.open({
          id: 'Blacklist',
          context: {
            title: 'Blacklist'
          }
        })
      );
    } else {
      return {};
    }

    // if(blacklistLead.status==="Failed"){
    //   dispatch(Modal.open( {id: "Blacklist", context:{
    //     title:"Blacklist",

    //  }}));

    // }else {

    //    return {}
    // }

    return blacklistLead;
  }
);

// const Duplicatechecklead = createAsyncThunk(
//   "leads/Duplicatecheklead",
//   async ({ companyName, registrationNumber, payload }, { dispatch }) => {

//     const lead = await LeadsAPI.duplicateCheck(payload).catch(err => {
//       throw Error(' ')
//     })

//     if (lead.status === "Failed") {
//       dispatch(Modal.open({
//         id: "duplicateModel", context: {
//           title: "Duplicate Check",

//         }
//       }));

//     }

//     if (lead[0].OpportunityStatus === "DUPLICATE_LEAD_EXISTING_OPPORTUNITY") {
//       dispatch(Modal.open({
//         id: "existingLead",
//         context: {
//           lead: lead[1],
//           status: lead[0],
//           duplicateLob: payload.lob
//         }
//       }))

//     } else if (lead[0].OpportunityStatus === "NEW_LEAD ") {

//       dispatch(Modal.open({
//         id: "leadCreation"
//       }))
//     } else if (lead[0].OpportunityStatus === "DUPLICATE_LEAD_NEW_OPPORTUNITY") {
//       dispatch(Modal.open({
//         id: "existingLead",
//         context: {
//           lead: lead[1],
//           status: lead[0],
//           duplicateLob: payload.lob
//         }
//       }))

//     } else if (lead[0].OpportunityStatus.includes("DUPLICATE_CUSTOMER _EXISTING _OPPORTUNITY")) {
//       console.log("caling")
//       dispatch(Modal.open({
//         id: "existingLead",
//         context: {
//           lead: lead[1],
//           status: lead[0],
//           duplicateLob: payload.lob

//         }
//       }))

//     } else if (lead[0].OpportunityStatus.includes("DUPLICATE_CUSTOMER_NEW_OPPORTUNITY")) {
//       console.log("caling")
//       dispatch(Modal.open({
//         id: "existingLead",
//         context: {
//           lead: lead[1],
//           status: lead[0],
//           duplicateLob: payload.lob
//         }
//       }))

//     }

//     return lead
//   }
// );

const Duplicatedenlist = createAsyncThunk(
  'leads/Duplicatedenlist',
  async ({ duplicatecheck, lead, payload, duplicate, user }, { dispatch }) => {
    if (duplicate.result === 'FAIL') {
      const customer = await LeadsAPI.customerManagement(
        _.get(duplicate, 'fieldDetails.[0].value', '')
      ).catch((err) => {
        throw Error(' ');
      });

      let leaddeatils = LeadFactory.MakeLeadpayaload(
        _.get(customer, '[0]', ''),
        payload.lob,
        user
      );
      if (
        lead[0].OpportunityStatus.includes(
          'DUPLICATE_CUSTOMER _EXISTING _OPPORTUNITY'
        ) ||
        duplicate.result === 'FAIL'
      ) {
        dispatch(
          Modal.open({
            id: 'existingLead',
            context: {
              lead: leaddeatils,
              user: user,
              status: {
                OpportunityStatus: 'DUPLICATE_CUSTOMER _EXISTING _OPPORTUNITY'
              },
              duplicateLob: payload.lob
            }
          })
        );
      }

      return customer;
    }
  }
);

const Duplicatechecklead = createAsyncThunk(
  'leads/Duplicatecheklead',
  async (
    { companyName, registrationNumber, payload, duplicatecheck, user },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.duplicateCheck(payload).catch((err) => {
      throw Error(' ');
    });
    if (lead[0].statuscode === '409') {
      dispatch(
        Modal.open({
          id: 'existingLead',
          context: {
            lead: lead[0]
            // status: lead[0],
            // duplicateLob: payload.lob,
          }
        })
      );
    } else if (lead[0].statuscode === '200') {
      dispatch(
        Modal.open({
          id: 'leadCreation',
          data: payload
        })
      );
    }
    // const duplicate = await LeadsAPI.duplicatedenilist(duplicatecheck).catch(
    //   (err) => {
    //     throw Error(' ')
    //   },
    // )
    //   if(duplicate.result==="FAIL"){
    // await dispatch(
    //   Duplicatedenlist({ duplicatecheck, lead, payload, duplicate, user }),
    // )}

    // if (lead.status === 'Failed') {
    //   dispatch(
    //     Modal.open({
    //       id: 'duplicateModel',
    //       context: {
    //         title: 'Duplicate Check',
    //       },
    //     }),
    //   )
    // }

    // if (lead[0].OpportunityStatus === 'DUPLICATE_LEAD_EXISTING_OPPORTUNITY') {
    //   dispatch(
    //     Modal.open({
    //       id: 'existingLead',
    //       context: {
    //         lead: lead[1],
    //         status: lead[0],
    //         duplicateLob: payload.lob,
    //       },
    //     }),
    //   )
    // } else if (
    //   lead[0].OpportunityStatus === 'NEW_LEAD '
    //   //  &&
    //   // duplicate.result === 'PASS'
    // ) {
    //   dispatch(
    //     Modal.open({
    //       id: 'leadCreation',
    //     }),
    //   )
    // } else if (lead[0].OpportunityStatus === 'DUPLICATE_LEAD_NEW_OPPORTUNITY'
    // // &&
    // // duplicate.result === 'PASS'
    // ) {
    //   dispatch(
    //     Modal.open({
    //       id: 'existingLead',
    //       context: {
    //         lead: lead[1],
    //         status: lead[0],
    //         duplicateLob: payload.lob,
    //       },
    //     }),
    //   )
    // } else if (
    //   lead[0].OpportunityStatus.includes(
    //     'DUPLICATE_CUSTOMER _EXISTING _OPPORTUNITY',

    //   )
    //   // &&
    //   // duplicate.result === 'PASS'
    // ) {
    //   dispatch(
    //     Modal.open({
    //       id: 'existingLead',
    //       context: {
    //         lead: lead[1],
    //         status: lead[0],
    //         duplicateLob: payload.lob,
    //       },
    //     }),
    //   )
    // } else if (
    //   lead[0].OpportunityStatus.includes('DUPLICATE_CUSTOMER_NEW_OPPORTUNITY')
    //   // &&
    //   // duplicate.result === 'PASS'
    // ) {
    //   dispatch(
    //     Modal.open({
    //       id: 'existingLead',
    //       context: {
    //         lead: lead[1],
    //         status: lead[0],
    //         duplicateLob: payload.lob,
    //       },
    //     }),
    //   )
    // }

    return lead;
  }
);

const autocheckfeasibility = createAsyncThunk(
  'leads/autocheckfeasibility',
  async ({ payload, Address, Uid }, { dispatch }) => {
    const feasibility = await LeadsAPI.checkfeasibility(payload).catch(
      (err) => {
        throw Error(' Please try again.');
      }
    );

    dispatch(
      Modal.submitcheck({
        id: 'submit',
        Address: Address,

        qualified: feasibility.qualificationResult,

        Uid: Uid
      })
    );
    return feasibility;
  }
);

const DocumentCheck = createAsyncThunk(
  'leads/DocumentCheck',
  async ({ payload }, { dispatch }) => {
    const DocumentCheck = await DocumnetsAPI.DocumentChecking(payload).catch(
      (err) => {
        throw Error(' Please try again.');
      }
    );
    return DocumentCheck;
  }
);

const Updateattachment = createAsyncThunk(
  'leads/Updateattachment',
  async ({ attachment, id }, { dispatch }) => {
    const lead = await LeadsAPI.updateStatus(id, {
      attachment: LeadFactory.Docattachments({ attachment })
    }).catch((err) => {
      throw Error('Failed to reassign lead. Please try again.');
    });

    dispatch(getleaddata({ id }));
    return lead;
  }
);

const getleaddata = createAsyncThunk(
  'leads/getleaddata',
  async ({ id }, { dispatch }) => {
    const lead = await LeadsAPI.getQuoteID(id).catch((err) => {
      throw Error('Failed to reassign lead. Please try again.');
    });
    return lead;
  }
);
const createContract = createAsyncThunk(
  'leads/createContract',

  async ({ payload, id }, { dispatch }) => {
    if (payload.isNewContract) {
      const contract = await LeadsAPI.contractcreate(payload).catch((err) => {
        throw Error(' Please try again.');
      });
      dispatch(
        Alert.open({
          type: 'Success',
          message: `Contract Successfully created `
        })
      );
      await LeadsAPI.Contractvalidity(payload.leadId).catch((err) => {
        throw Error('error');
      });

      dispatch(Modal.close('buttomsheet'));

      return contract;
    } else {
      const contract = await LeadsAPI.updateContractByID(payload).catch(
        (err) => {
          throw Error(' Please try again.');
        }
      );

      dispatch(
        Alert.open({
          type: 'Success',
          message: `Contract Successfully saved `
        })
      );
      await LeadsAPI.Contractvalidity(payload.leadId).catch((err) => {
        throw Error('error');
      });

      dispatch(Modal.close('buttomsheet'));

      return contract;
    }
  }
);

const Contractcreation = createAsyncThunk(
  'leads/Contractcreation',
  async (
    {
      id,
      payload,
      oppId,
      user,
      isSaveAndExit,
      isNewContract,
      status,
      quoteId,
      quote,
      contractId,
      updateStatus,
      parent
    },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      // quoteId:quoteId,
      status: isSaveAndExit ? 'CREATE_CONTRACT' : updateStatus,
      oppId: oppId,

      statusChange: [
        {
          statusId: isSaveAndExit ? 7 : 8,
          status: isSaveAndExit ? 'CREATE_CONTRACT' : updateStatus,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ],
      quoteId
    }).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });
    if (isSaveAndExit) {
      if (lead) {
        let validContracts = lead.opportunities.filter((opp) =>
          _.has(opp, 'contract.id')
        );
        let updatedStatus = await LeadsAPI.contractSignoff(
          validContracts[0].contract.id,
          { status: 'CREATE_CONTRACT' }
        );
      }
    } else {
      if (lead) {
        let validContracts = lead.opportunities.filter((opp) =>
          _.has(opp, 'contract.id')
        );
        let updatedStatus = await LeadsAPI.contractSignoff(
          validContracts[0].contract.id,
          { status: 'APPROVAL' }
        );
      }
    }

    await dispatch(Quotetablerow({ id: id }));
    await dispatch(Contracttablerow({ id: id }));

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    dispatch(
      Alert.open({
        type: 'Success',
        message: `Contract ${isSaveAndExit ? 'saved' : 'done'} Successfully`
      })
    );

    dispatch(Modal.close('ContractCreation'));
    dispatch(Modal.close('leadView'));

    dispatch(Modal.close('quoteview'));
    !isSaveAndExit &&
      dispatch(
        Modal.open({
          id: 'quoteApprovalSent',
          context: {
            lead,
            quoteId: _.get(quote, 'id', '--'),
            contractId: contractId ? contractId : '--',
            validity: `${new Date(quote.validity).toISOString()}`.split('T')[0],
            unit: _.get(
              quote.orderTotalPrice,
              '[0].price.taxIncludedAmount.unit',
              '0/--'
            ),

            total: _.get(
              quote.orderTotalPrice,
              '[0].price.taxIncludedAmount.value',
              '0/--'
            ),

            status: 'Quote Approval'
          }
        })
      );

    return lead;
  }
);

const ContractSignoff = createAsyncThunk(
  'leads/ContractSignoff',

  async (
    {
      id,
      payload,
      oppId,
      leadid,
      user,
      method,
      isSaveAndExit,
      contractId,
      quoteId,
      parent
    },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(
      leadid,

      {
        // quoteId:quoteId,
        status: isSaveAndExit ? 'CONTRACT_SIGN_OFF' : 'CUSTOMER_ACCEPTANCE',
        oppId: oppId,
        quoteId,
        contractId
      },
      {
        statusChange: [
          {
            statusId: isSaveAndExit ? 10 : 11,
            status: isSaveAndExit ? 'CREATE_CONTRACT' : 'APPROVAL',
            changeDate: new Date().toISOString(),
            changeReason: ''
          }
        ]
      },

      method
    ).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    await LeadsAPI.contractSignoff(
      id,
      {
        ...payload
      },
      method
    ).catch((err) => {
      throw Error('Failed to update status history. Please try again.');
    });

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    dispatch(Modal.close('ContractSignoff'));
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    await dispatch(Quotetablerow({ id: leadid }));
    await dispatch(Contracttablerow({ id: leadid }));
    return lead;
  }
);
// reopen lead
const reopen = createAsyncThunk(
  'leads/reopen',
  async (
    { id, status, payload, modalId, quoteId, user, oppId, parent },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status

      // statusChangeReason,
      // oppId
    }).catch((err) => {
      throw Error('Failed to reopen Lead. Try again.');
    });

    // const response = await LeadsAPI.loadAll({user}).catch(err=>console.log(err))

    // const lead = await LeadsAPI.updateStatus(id, {

    // }).catch((err) => {
    //   throw Error("Failed to reassign lead. Please try again.");
    // });

    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));
    dispatch(Modal.close(modalId));

    dispatch(Modal.close('quoteview'));

    dispatch(Modal.close('leadView'));

    dispatch(
      Alert.open({
        message: `Lead re-opened successfully.`,
        type: 'success'
      })
    );

    return lead;
  }
);

//  updateLead for drop
const updateLead = createAsyncThunk(
  'leads/updateLead',
  async ({ id, status, data, isSaveAndExit }, { dispatch, getState }) => {
    const user = getState().auth.user;

    const payload = {
      id,
      status,
      statusChange: [
        {
          status: status,
          changeDate: new Date().toISOString(),
          changeReason: ''
        }
      ],
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      channel: [
        {
          id: user.sub,
          name: 'DLPM',
          referredType: 'Channel'
        }
      ],
      ...LeadFactory.makeNewLeadPayload(data)
    };

    const res = await LeadsAPI.update(payload);

    //  const  notifyId=config.dev.server.dlpm_base_url?"1942":"1656"
    const notificationPayload = {
      // notificationId: notifyId,
      // notificationId: "2352",
      notificationCode: 'LeadCreation',
      emailTo: payload.leadAssignment.email,
      inputValue: {
        user: payload.leadAssignment.name,
        lead: payload.companyDetails.companyName,
        loggedUser: user.sub
      }
    };
    const Notificationres =
      !isSaveAndExit && (await LeadsAPI.shareNotification(notificationPayload));
    dispatch(Modal.close('leadCreation'));
    dispatch(Modal.close('leadView'));

    dispatch(
      Alert.open({
        type: 'Success',
        message: `Lead ${data.companyDetails.companyName} ${
          isSaveAndExit ? 'saved' : 'updated'
        } successfully.`
      })
    );

    // return {};
    return res;
  }
);
const dropOpportunity = createAsyncThunk(
  'leads/dropOpportunity',
  async (
    { id, status, payload, modalId, quoteId, user, oppId, parent },
    { dispatch }
  ) => {
    const lead = await LeadsAPI.updateStatusHistory(id, {
      status,
      ...payload,
      oppId,
      quoteId: quoteId
    }).catch((err) => {
      throw Error('Failed to drop lead. Please try again.');
    });

    // await LeadsAPI.updateStatusHistory(id, {
    //   status,
    // }).catch((err) => {
    //   throw Error("Failed to update status history. Please try again.");
    // });

    const resdata = await LeadsAPI.getUpdatedQuote(id).catch((err) => {
      throw Error('Failed to Approve Quote. Please try again.');
    });
    await dispatch(loadAll({ user, count: 10, usergrpinfo: parent }));

    dispatch(Modal.close(modalId));

    dispatch(
      Alert.open({
        type: 'Success',
        message: 'Opportunity Dropped Successfully.'
      })
    );
    dispatch(Modal.close('leadView'));
    dispatch(Modal.close('quoteview'));
    return { lead, resdata };
  }
);

const getvasproducts = createAsyncThunk(
  'leads/getvasproducts',
  async ({ id, vas }, { dispatch }) => {
    const lead = await LeadsAPI.getVasByID(id).catch((err) => {
      throw Error('Failed to drop lead. Please try again.');
    });

    if (lead.length > 0 && vas) {
      dispatch(
        Modal.vasOpen({
          id: 'vasopen',
          context: lead
        })
      );
    } else if (lead.length <= 0) {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'no vas  found'
        })
      );
    }

    return lead;
  }
);

const dependencyproductlist = createAsyncThunk(
  'leads/dependencyproductlist',
  async ({ ids }, { dispatch }) => {
    let product = await LeadsAPI.dependency(ids).catch((err) => {
      throw Error('Failed to drop lead. Please try again.');
    });

    if (product.length > 0) {
      dispatch(
        Modal.open({
          id: 'DependencyProduct'
        })
      );
    }

    return product;
  }
);

const getContractdetails = createAsyncThunk(
  'leads/getContractdetails',
  async ({ qouteId }, { dispatch }) => {
    let data = await LeadsAPI.GetcontractDetails({ qouteId }).catch((err) => {
      throw Error('Failed to drop lead. Please try again.');
    });

    return data;
  }
);
export default {
  getContractdetails,
  ServiceUpdate,
  getvasproducts,
  ContractSignoff,
  getleaddata,
  DocumentCheck,
  loadgetKpi,
  Updateattachment,
  drop,
  create,
  loadAll,
  approve,
  leadClassification,
  reassign,
  rejectQuote,
  approveQuote,
  downloadQuote,
  blackListCheck,
  duplicateCheck,
  shareQuotation,
  createQuotation,
  customerRejected,
  customerAccepted,
  createOpportunity,
  runLeadVerification,
  manualFeasibilityRequired,
  commentSection,
  approveManualFeasibility,
  ManualFeasibilityFailed,
  addproductsconfig,
  startonboarding,
  checkautofeacibility,
  Quotetablerow,
  Contracttablerow,
  LeadSearch,
  LeadStatusCount,
  autocheckfeasibility,
  SlaTiming,
  LeadTableFilter,
  createContract,
  existingCustomer,
  shareAttachment,
  Contractcreation,
  Duplicatechecklead,
  ViewProfile,
  updateLead,
  reopen,
  dropOpportunity,
  cancelledStatus,
  dependencyproductlist,
  modifyPlan,
  customerManagement,
  NewLead,
  Duplicatedenlist
};

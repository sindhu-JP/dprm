import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import LeadController from 'Controllers/Lead';
import _ from 'lodash';
import LeadsFactory from 'Factory/Lead';

const leadsAdapter = createEntityAdapter();
const Leads = createSlice({
  name: 'leads',
  initialState: leadsAdapter.getInitialState({
    loading: false,
    updating: false,
    Blacklist: {},
    Documentcheck: {},
    feacibilitycheck: false,
    ids: [],
    entities: {},
    tableRows: [],
    serviceTable: {},
    exitingtablerow: [],
    subTablerow: [],
    existingids: {},
    exitingentities: {},
    comment: [],
    quoteDetailsdata: [],
    contractDetailsdata: [],
    Chicklet: [],
    Docattachments: {},
    Duplicatedata: {},
    contractData: {},

    autofeasibility: {},
    customerlead: [],
    PreFillData: {},
    leadstatuscount: {},
    slaTiming: [],
    contractSignOff: {},
    reopenLead: {},
    vasProducts: [],
    oppTableRow: {},
    LeadContract: [],
    dependencyProductitems: [],

    customerDetails: {},

    errors: {
      leads: '',
      creating: '',
      dropLead: '',
      reopenLead: '',
      blackList: '',
      duplicate: '',
      leadApproval: '',
      reassignLead: '',
      quoteApproval: '',
      shareQuotation: '',
      createQuotation: '',
      customerRejection: '',
      manualFeasibility: '',
      customerAcceptence: '',
      opportunityCreation: '',
      addComment: '',
      kpi: '',
      addproductsconfig: '',
      attachment: '',
      PreFillData: '',
      leadstatuscount: '',
      slaTiming: '',
      leadClassificationvalue: '',
      feasibilityComplete: '',
      Quotedata: '',
      Contractdata: '',
      feasibilityfailed: '',
      autocheckfailed: '',
      DocumentError: '',
      createcontract: '',
      Contractcreated: '',
      contractError: '',
      contractSignerror: '',
      upadtelead: '',
      dropOpp: '',
      getvasproduct: '',
      dependency: '',
      contract: '',
      customerDetails: ''
    },
    loading: {
      leads: false,
      creating: false,
      upadtelead: false,
      dropLead: false,
      reopenLead: false,
      blackList: false,
      duplicate: false,
      PreFillData: false,
      leadstatuscount: false,
      slaTiming: false,
      kpi: false,
      reassignLead: false,
      leadApproval: false,
      quoteApproval: false,
      shareQuotation: false,
      createQuotation: false,
      addproductsconfig: false,
      customerRejection: false,
      manualFeasibility: false,
      customerAcceptence: false,
      opportunityCreation: false,
      addComment: '',
      feasibilityComplete: false,
      Quotedata: false,
      Contractdata: false,
      attachment: false,
      feasibilityfailed: false,
      autocheck: false,
      disbled: false,
      Documentloading: false,
      contractloading: false,
      Contractcreated: false,
      showbutton: false,
      contractSign: false,
      dropOpp: false,
      dependency: false,
      getvasproduct: false,
      contract: false,
      customerDetails: false
    }
  }),
  reducers: {},
  extraReducers: {
    // Create Lead
    [LeadController.create.pending]: (state, { payload }) => {
      state.loading.creating = true;
      state.errors.creating = '';
    },
    [LeadController.create.fulfilled]: (state, { payload }) => {
      // state.ids.unshift(payload.id)
      // state.tableRows = {
      //   [payload.id]: LeadsFactory.makeTableRow(payload),
      //   ...state.tableRows,
      // }
      // // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      // state.entities[payload.id] = payload
      state.loading.creating = false;
      state.errors.creating = '';
    },
    [LeadController.create.rejected]: (state, { error }) => {
      state.errors.creating = error.message;
      state.loading.creating = false;
    },

    [LeadController.NewLead.pending]: (state, { payload }) => {
      state.loading.creating = true;
      state.errors.creating = '';
    },
    [LeadController.NewLead.fulfilled]: (state, { payload }) => {
      state.ids.unshift(payload.id);
      state.tableRows = {
        [payload.id]: LeadsFactory.makeTableRow(payload),
        ...state.tableRows
      };
      // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      state.entities[payload.id] = payload;
      state.loading.creating = false;
      state.errors.creating = '';
    },
    [LeadController.NewLead.rejected]: (state, { error }) => {
      state.errors.creating = error.message;
      state.loading.creating = false;
    },

    // Load Leads
    [LeadController.loadAll.pending]: (state, { payload }) => {
      state.loading.leads = true;
      state.errors.leads = '';
    },
    [LeadController.loadAll.fulfilled]: (state, { payload }) => {
      let ids = [];
      let rows = {};
      let exiIds = [];

      let entities = {};
      let existingrow = {};
      let existingids = {};
      let subtable = {};
      let requestTablerow = {};
      // let entitiesids=[]
      let existingentities = {};

      if (payload && payload.length) {
        //  for (var i=0; i<payload.length; i++){
        //   if (!ids.includes(payload[i].id)) {
        //     ids.push(payload[i].id);
        //     entities[payload[i].id] = payload;

        //     // rows[payload[i].id] = LeadsFactory.makeTableRow(payload[i],);

        //     rows[payload[i].id] = LeadsFactory.makeTableRow(payload[i],);
        //   }

        //    for(var j=0; j<payload[i].opportunities.length;j++){
        //     rows[payload[i].id] = LeadsFactory.makeTableRow(payload[i]);

        //   //  rows[payload[i].id].subtablerow=LeadsFactory.makesubTableRow(payload[i].opportunities[j], payload[i])
        //    }

        //  }

        payload.map((lead, i) => {
          if (!ids.includes(lead.id)) {
            ids.push(lead.id);
            entities[lead.id] = lead;
            // rows[lead.id] = LeadsFactory.makeTableRow(lead,);
          }
          if (lead.opportunities) {
            lead.opportunities.map((opp, j) => {
              exiIds.push(opp.id);
              existingids[opp.id] = opp;

              rows[opp.id] = LeadsFactory.makeTableRow(lead, opp);
              requestTablerow[opp.id] = LeadsFactory.requestTable(opp, lead);
            });
          } else if (
            lead.status === 'LEAD_APPROVAL' ||
            lead.status === 'OPPORTUNITY_CREATION' ||
            lead.status === 'LEAD_DROPPED' ||
            lead.status === 'LEAD_GENERATION'
          ) {
            rows[lead.id] = LeadsFactory.makeTableRow(lead);
          }
        });
      }

      // if (payload && payload.exiting.length) {
      //   payload.exiting.map((lead) => {
      //     if (!existingids.includes(lead.id)) {
      //       existingids.push(lead.id);
      //       existingentities[lead.id] = lead;
      //       existingrow[lead.id] = LeadsFactory.makeTableRow(lead);

      //     }

      //      lead.opportunities.map((opp)=>{
      //   subtable[lead.id]=LeadsFactory.makesubTableRow(opp, lead)
      //      })
      //   });

      // }

      state.ids = ids;
      state.tableRows = rows;
      state.exitingtablerow = existingrow;
      state.existingids = existingids;
      state.exitingentities = existingentities;
      state.errors.leads = '';
      state.entities = entities;
      state.loading.leads = false;

      state.subTablerow = subtable;
      state.serviceTable = requestTablerow;
    },
    [LeadController.loadAll.rejected]: (state, { error }) => {
      state.loading.leads = false;

      state.errors.leads = error.message;
    },

    // onSearch table
    [LeadController.LeadSearch.pending]: (state, { payload }) => {
      state.loading.leads = true;
      state.errors.leads = '';
    },
    [LeadController.LeadSearch.fulfilled]: (state, { payload }) => {
      let ids = [];
      let rows = {};
      let exiIds = [];

      let entities = {};
      let existingrow = {};
      let existingids = {};
      let subtable = {};
      // let entitiesids=[]
      let existingentities = {};

      if (payload && payload.length) {
        payload.map((lead, i) => {
          if (!ids.includes(lead.id)) {
            ids.push(lead.id);
            entities[lead.id] = lead;
            // rows[lead.id] = LeadsFactory.makeTableRow(lead,);
          }
          if (lead.opportunities) {
            lead.opportunities.map((opp, j) => {
              exiIds.push(opp.id);
              existingids[opp.id] = opp;
              rows[opp.id] = LeadsFactory.makeTableRow(lead, opp);
            });
          } else if (
            lead.status === 'LEAD_APPROVAL' ||
            lead.status === 'OPPORTUNITY_CREATION' ||
            lead.status === 'LEAD_DROPPED' ||
            lead.status === 'LEAD_GENERATION'
          ) {
            rows[lead.id] = LeadsFactory.makeTableRow(lead);
          }
        });
      }

      state.ids = ids;
      state.tableRows = rows;
      state.exitingtablerow = existingrow;
      state.existingids = existingids;
      state.exitingentities = existingentities;
      state.errors.leads = '';
      state.entities = entities;
      state.loading.leads = false;

      state.subTablerow = subtable;

      // let ids = [];
      // let rows = {};
      // let entities = {};

      // if (payload && payload.length) {
      //   payload.map((lead) => {
      //     if (!ids.includes(lead.id)) {
      //       ids.push(lead.id);
      //       entities[lead.id] = lead;
      //       rows[lead.id] = LeadsFactory.makeTableRow(lead);
      //     }
      //   });
      // }

      // state.ids = ids;
      // state.tableRows = rows;
      // state.errors.leads = "";
      // state.entities = entities;

      // state.loading.leads = false;
    },
    [LeadController.LeadSearch.rejected]: (state, { error }) => {
      state.loading.leads = false;

      state.errors.leads = error.message;
    },

    //onLeadStatusCount

    // [LeadController.LeadStatusCount.pending]: (state, { payload }) => {
    //   state.loading.leadstatuscount = true
    //   state.errors.leadstatuscount = ''
    // },
    // [LeadController.LeadStatusCount.fulfilled]: (state, { payload }) => {
    //   state.leadstatuscount = payload[0]
    //   state.loading.leadstatuscount = false
    // },
    // [LeadController.LeadStatusCount.rejected]: (state, { error }) => {
    //   state.loading.duplicate = false
    //   state.errors.leadstatuscount = error.message
    // },

    //  onLeadStatusCount

    //SlaTIming

    [LeadController.SlaTiming.pending]: (state, { payload }) => {
      state.loading.slaTiming = true;
      state.errors.slaTiming = '';
    },
    [LeadController.SlaTiming.fulfilled]: (state, { payload }) => {
      state.slaTiming = payload;
      state.loading.slaTiming = false;
    },
    [LeadController.SlaTiming.rejected]: (state, { error }) => {
      state.loading.duplicate = false;
      state.errors.slaTiming = error.message;
    },

    //SlaTIming

    // onFilter table
    [LeadController.LeadTableFilter.pending]: (state, { payload }) => {
      state.loading.leads = true;
      state.errors.leads = '';
    },
    [LeadController.LeadTableFilter.fulfilled]: (state, { payload }) => {
      let ids = [];
      let rows = {};
      let exiIds = [];

      let entities = {};
      let existingrow = {};
      let existingids = {};
      let subtable = {};
      let requestTable = {};
      // let entitiesids=[]
      let existingentities = {};

      if (payload && payload.length) {
        payload.map((lead, i) => {
          if (!ids.includes(lead.id)) {
            ids.push(lead.id);
            entities[lead.id] = lead;
            // rows[lead.id] = LeadsFactory.makeTableRow(lead,);
          }
          if (lead.opportunities) {
            lead.opportunities.map((opp, j) => {
              exiIds.push(opp.id);
              existingids[opp.id] = opp;
              rows[opp.id] = LeadsFactory.makeTableRow(lead, opp);
              requestTable[opp.id] = LeadsFactory.requestTable(opp);
            });
          } else if (
            lead.status === 'LEAD_APPROVAL' ||
            lead.status === 'OPPORTUNITY_CREATION' ||
            lead.status === 'LEAD_DROPPED' ||
            lead.status === 'LEAD_GENERATION'
          ) {
            rows[lead.id] = LeadsFactory.makeTableRow(lead);
          }
        });
      }

      state.ids = ids;
      state.tableRows = rows;
      state.exitingtablerow = existingrow;
      state.existingids = existingids;
      state.exitingentities = existingentities;
      state.errors.leads = '';
      state.entities = entities;
      state.loading.leads = false;

      state.subTablerow = subtable;
    },
    [LeadController.LeadTableFilter.rejected]: (state, { error }) => {
      state.loading.leads = false;

      state.errors.leads = error.message;
    },

    // Customer Rejected
    [LeadController.customerRejected.pending]: (state, { payload }) => {
      state.loading.customerRejection = true;
      state.errors.customerRejection = '';
    },
    [LeadController.customerRejected.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;

      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload.lead
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      });
      state.loading.customerRejection = false;
      state.quoteDetailsdata = payload.resdata;
    },

    [LeadController.customerRejected.rejected]: (state, { error }) => {
      state.loading.customerRejection = false;
      state.errors.customerRejection = error.message;
    },

    //  approveManualFeasibility

    [LeadController.approveManualFeasibility.pending]: (state, { payload }) => {
      state.loading.feasibilityComplete = true;
      state.errors.feasibilityComplete = '';
    },
    [LeadController.approveManualFeasibility.fulfilled]: (
      state,
      { payload }
    ) => {
      state.entities[payload.id] = payload;
      // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      payload.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      });
      state.loading.feasibilityComplete = false;
    },
    [LeadController.approveManualFeasibility.rejected]: (state, { error }) => {
      state.loading.feasibilityComplete = false;
      state.errors.feasibilityComplete = error.message;
    },

    //Updateattachment

    [LeadController.Updateattachment.pending]: (state, { payload }) => {
      state.loading.updateattach = true;
      state.errors.updateattach = '';
    },
    [LeadController.Updateattachment.fulfilled]: (state, { payload }) => {
      state.entities[payload.id] = payload;
      state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      state.loading.updateattach = false;
      // state.customerInfo=payload
    },
    [LeadController.Updateattachment.rejected]: (state, { error }) => {
      state.loading.updateattach = false;
      state.errors.updateattach = error.message;
    },

    // getleaddata

    [LeadController.getleaddata.pending]: (state, { payload }) => {
      state.loading.customerdata = true;
      state.errors.customerdata = '';
    },
    [LeadController.getleaddata.fulfilled]: (state, { payload }) => {
      state.customerlead = payload;

      let opprow = {};
      let data = _.get(payload, '[0]', '');
      if (data?.opportunities) {
        data.opportunities.map((item) => {
          opprow[item.id] = LeadsFactory.makeOppTableRow(item, data);
        });
      }

      state.loading.customerdata = false;
      state.oppTableRow = opprow;
    },
    [LeadController.getleaddata.rejected]: (state, { error }) => {
      state.loading.customerdata = false;
      state.errors.customerdata = error.message;
    },
    //

    [LeadController.ManualFeasibilityFailed.pending]: (state, { payload }) => {
      state.loading.feasibilityfailed = true;
      state.errors.feasibilityfailed = '';
    },
    [LeadController.ManualFeasibilityFailed.fulfilled]: (
      state,
      { payload }
    ) => {
      state.entities[payload.id] = payload;
      // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      payload.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      });
      state.loading.feasibilityfailed = false;
    },
    [LeadController.ManualFeasibilityFailed.rejected]: (state, { error }) => {
      state.loading.feasibilityfailed = false;
      state.errors.feasibilityfailed = error.message;
    },

    // Customer Acceptence
    [LeadController.customerAccepted.pending]: (state, { payload }) => {
      state.loading.customerAcceptence = true;
      state.errors.customerAcceptence = '';
    },
    [LeadController.customerAccepted.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload.lead
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      });

      state.loading.customerAcceptence = false;
      state.quoteDetailsdata = payload.resdata;
    },
    [LeadController.customerAccepted.rejected]: (state, { error }) => {
      state.loading.customerAcceptence = false;
      state.errors.customerAcceptence = error.message;
    },

    // Share Quote
    [LeadController.shareQuotation.pending]: (state, { payload }) => {
      state.loading.shareQuotation = true;
      state.errors.shareQuotation = '';
    },
    [LeadController.shareQuotation.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload.lead
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      });

      state.loading.shareQuotation = false;
      state.quoteDetailsdata = payload.resdata;
    },
    [LeadController.shareQuotation.rejected]: (state, { error }) => {
      state.loading.shareQuotation = false;
      state.errors.shareQuotation = error.message;
    },

    // Approve Quote
    [LeadController.approveQuote.pending]: (state, { payload }) => {
      state.loading.quoteApproval = true;
      state.errors.quoteApproval = '';
    },
    [LeadController.approveQuote.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;
      state.quoteDetailsdata = payload.resdata;
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload.lead
          );
        }
      });

      state.errors.quoteApproval = '';
      state.loading.quoteApproval = false;
    },
    [LeadController.approveQuote.rejected]: (state, { error }) => {
      state.loading.quoteApproval = false;
      state.errors.quoteApproval = error.message;
    },

    // Reassign Lead
    [LeadController.reassign.pending]: (state, { payload }) => {
      state.loading.reassignLead = true;
      state.errors.reassignLead = '';
    },
    [LeadController.reassign.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;
      if (payload.lead.opportunities) {
        payload.lead.opportunities.map((opp) => {
          state.existingids[opp.id] = opp;
          state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
          // state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(opp)
        });
      }

      state.loading.reassignLead = false;
      state.quoteDetailsdata = payload.resdata;
    },
    [LeadController.reassign.rejected]: (state, { error }) => {
      state.loading.reassignLead = false;
      state.errors.reassignLead = error.message;
    },

    // leadClassification

    [LeadController.leadClassification.pending]: (state, { payload }) => {
      state.loading.leadClassificationvalue = true;
      state.errors.leadClassificationvalue = '';
    },
    [LeadController.leadClassification.fulfilled]: (state, { payload }) => {
      state.entities[payload.id] = payload;
      // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);

      payload.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload
          );
        }

        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      });

      state.loading.leadClassificationvalue = false;
    },
    [LeadController.leadClassification.rejected]: (state, { error }) => {
      state.loading.leadClassificationvalue = false;
      state.errors.leadClassificationvalue = error.message;
    },

    [LeadController.Contractcreation.pending]: (state, { payload }) => {
      state.loading.Contractcreated = true;
      state.errors.Contractcreated = '';
    },
    [LeadController.Contractcreation.fulfilled]: (state, { payload }) => {
      state.entities[payload.id] = payload;
      // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      state.contractData = {};
      state.loading.showbutton = false;
      payload.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;

        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      });
      state.loading.Contractcreated = false;
    },
    [LeadController.Contractcreation.rejected]: (state, { error }) => {
      state.loading.Contractcreated = false;
      state.errors.Contractcreated = error.message;
    },

    // Contractcreation

    // Dropping Lead
    [LeadController.drop.pending]: (state, { payload }) => {
      state.loading.dropLead = true;
      state.errors.dropLead = '';
    },
    [LeadController.drop.fulfilled]: (state, { payload }) => {
      // state.entities[payload.lead.id] = payload.lead;
      // // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      // payload.lead.opportunities.map(opp => {
      //   state.existingids[opp.id] = opp
      //   state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      // })
      // // payload.lead.opportunities.map(opp=>{
      // //   state.lead.tableRows[payload.lead.id].subtablerow=LeadsFactory.makesubTableRow(opp, payload.lead)
      // //  })
      // state.loading.dropLead = false;
      // state.quoteDetailsdata = payload.resdata

      state.entities[payload.lead.id] = payload.lead;
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);

      if (payload.lead.opportunities) {
        payload.lead.opportunities.map((opp) => {
          state.existingids[opp.id] = opp;
          state.tableRows[opp.id] = LeadsFactory.makeTableRow(
            payload.lead,
            opp
          );
        });
      } else {
        state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(
          payload.lead
        );
        state.loading.dropLead = false;
      }
    },
    [LeadController.drop.rejected]: (state, { error }) => {
      state.loading.dropLead = false;
      state.errors.dropLead = error.message;
    },
    // dropOpportunity
    [LeadController.dropOpportunity.pending]: (state, { payload }) => {
      state.loading.dropOpp = true;
      state.errors.dropOpp = '';
    },
    [LeadController.dropOpportunity.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);

      if (payload.lead.opportunities) {
        payload.lead.opportunities.map((opp) => {
          state.existingids[opp.id] = opp;
          // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
          if (state.oppTableRow) {
            state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
              opp,
              payload.lead
            );
          }
          state.tableRows[opp.id] = LeadsFactory.makeTableRow(
            payload.lead,
            opp
          );
        });
      } else {
        state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(
          payload.lead
        );
        state.loading.dropOpp = false;
      }
    },
    [LeadController.dropOpportunity.rejected]: (state, { error }) => {
      state.loading.dropOpp = false;
      state.errors.dropOpp = error.message;
    },

    // ReopeningLead
    [LeadController.reopen.pending]: (state, { payload }) => {
      state.loading.reopenLead = true;
      state.errors.reopenLead = '';
    },
    [LeadController.reopen.fulfilled]: (state, { payload }) => {
      state.reopenLead = payload;
      state.entities[payload.id] = payload;
      state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      // payload.opportunities.map(opp => {
      //   state.existingids[opp.id] = opp
      //   state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      // })

      state.loading.reopenLead = false;
    },
    [LeadController.reopen.rejected]: (state, { error }) => {
      state.loading.reopenLead = false;
      state.errors.reopenLead = error.message;
    },

    // updateLead
    [LeadController.updateLead.pending]: (state, { payload }) => {
      state.loading.upadtelead = true;
      state.errors.upadtelead = '';
    },
    [LeadController.updateLead.fulfilled]: (state, { payload }) => {
      state.upadtelead = payload;
      state.entities[payload.id] = payload;
      state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      // payload.opportunities.map(opp => {
      //   state.existingids[opp.id] = opp
      //   state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      // })

      state.loading.upadtelead = false;
    },
    [LeadController.updateLead.rejected]: (state, { error }) => {
      state.errors.upadtelead = error.message;
      state.loading.upadtelead = false;
    },

    // Creating LeadQuotation for lead
    [LeadController.createQuotation.pending]: (state, { payload }) => {
      state.loading.createQuotation = true;
      state.errors.createQuotation = '';
    },
    [LeadController.createQuotation.fulfilled]: (state, { payload }) => {
      state.entities[payload.leadres.id] = payload.leadres;
      // state.tableRows[payload.leadres.id] = LeadsFactory.makeTableRow(payload.leadres);
      state.loading.createQuotation = false;
      payload.leadres.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(
          payload.leadres,
          opp
        );

        //  state.tableRows[opp.id]=LeadsFactory.makeOppTableRow(opp)

        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(opp);
        }

        //  state.tableRows[opp.id]=LeadsFactory.makeOppTableRow(opp)
      });
      state.quoteDetailsdata = payload.resdata;
    },
    [LeadController.createQuotation.rejected]: (state, { error }) => {
      state.loading.createQuotation = false;
      state.errors.createQuotation = error.message;
    },

    // Creating Lead oppportunity
    [LeadController.createOpportunity.pending]: (state) => {
      state.loading.opportunityCreation = true;
      state.errors.opportunityCreation = '';
    },
    [LeadController.createOpportunity.fulfilled]: (state, { payload }) => {
      state.entities[payload.id] = payload;
      // state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      payload.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      });

      state.loading.opportunityCreation = false;
    },
    [LeadController.createOpportunity.rejected]: (state, { error }) => {
      state.loading.opportunityCreation = false;
      state.errors.opportunityCreation = error.message;
    },

    // product configation

    [LeadController.addproductsconfig.pending]: (state) => {
      state.loading.addproductsconfig = true;
      state.errors.addproductsconfig = '';
    },
    [LeadController.addproductsconfig.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;

      state.entities[payload.lead.id] = payload.lead;
      state.Chicklet = LeadsFactory.JsonparseData(payload.GetKpi);
      // state.Chicklet= JSON.parse( payload.GetKpi)
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload.lead
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      });
      state.loading.addproductsconfig = false;
    },
    [LeadController.addproductsconfig.rejected]: (state, { error }) => {
      state.loading.addproductsconfig = false;
      state.errors.addproductsconfig = error.message;
    },

    // modifyplan

    [LeadController.modifyPlan.pending]: (state) => {
      state.loading.addproductsconfig = true;
      state.errors.addproductsconfig = '';
    },
    [LeadController.modifyPlan.fulfilled]: (state, { payload }) => {
      state.entities[payload.lead.id] = payload.lead;

      state.entities[payload.lead.id] = payload.lead;
      state.Chicklet = LeadsFactory.JsonparseData(payload.GetKpi);
      // state.Chicklet= JSON.parse( payload.GetKpi)
      // state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(payload.lead);
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload.lead
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      });
      state.loading.addproductsconfig = false;
    },
    [LeadController.modifyPlan.rejected]: (state, { error }) => {
      state.loading.addproductsconfig = false;
      state.errors.addproductsconfig = error.message;
    },

    // Changing Lead Statuses
    [LeadController.approve.pending]: (state, { payload }) => {
      state.errors.leadApproval = '';
      state.loading.leadApproval = true;
    },
    [LeadController.approve.fulfilled]: (state, { payload }) => {
      const json = payload.GetKpi;
      state.entities[payload.lead.id] = payload.lead;

      state.Chicklet = LeadsFactory.JsonparseData(payload.GetKpi);

      state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(
        payload.lead
      );
      state.loading.leadApproval = false;
      // payload.lead.opportunities.map(opp=>{
      //   state.tableRows[payload.lead.id].subtablerow=LeadsFactory.makesubTableRow(opp, payload.lead)
      //  })
      state.errors.leadApproval = '';
    },
    [LeadController.approve.rejected]: (state, { error }) => {
      state.loading.leadApproval = false;
      state.errors.leadApproval = error.message;
    },

    [LeadController.rejectQuote.pending]: (state, { payload }) => {
      state.errors.rejectQuote = '';
      state.loading.rejectQuote = true;
    },
    [LeadController.rejectQuote.fulfilled]: (state, { payload }) => {
      state.loading.showbutton = false;
      state.contractData = {};
      state.entities[payload.lead.id] = payload.lead;
      state.tableRows[payload.lead.id] = LeadsFactory.makeTableRow(
        payload.lead
      );
      payload.lead.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload.lead, opp);
      });
      state.loading.rejectQuote = false;
      state.errors.rejectQuote = '';
      state.quoteDetailsdata = payload.resdata;
    },
    [LeadController.rejectQuote.rejected]: (state, { error }) => {
      state.loading.rejectQuote = false;
      state.errors.rejectQuote = error.message;
    },

    // Requesting Manual Feasibility Check
    [LeadController.manualFeasibilityRequired.pending]: (
      state,
      { payload }
    ) => {
      state.errors.manualFeasibility = '';
      state.loading.manualFeasibility = true;
    },
    [LeadController.manualFeasibilityRequired.fulfilled]: (
      state,
      { payload }
    ) => {
      state.entities[payload.id] = payload;
      state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      state.loading.manualFeasibility = false;
      state.errors.manualFeasibility = '';
      state.feacibilitycheck = true;
      payload.opportunities.map((opp) => {
        state.tableRows[payload.id].subtablerow = LeadsFactory.makesubTableRow(
          opp,
          payload
        );
      });
    },
    [LeadController.manualFeasibilityRequired.rejected]: (state, { error }) => {
      state.loading.manualFeasibility = false;
      state.errors.manualFeasibility = error.message;
    },

    // Checks
    [LeadController.blackListCheck.pending]: (state, action) => {
      state.loading.blackList = true;
    },
    [LeadController.blackListCheck.fulfilled]: (state, action) => {
      state.loading.blackList = false;
    },
    [LeadController.blackListCheck.rejected]: (state, action) => {
      state.loading.blackList = false;
    },
    //comment
    [LeadController.commentSection.pending]: (state, { payload }) => {
      state.loading.addComment = true;
      state.errors.addComment = '';
    },
    [LeadController.commentSection.fulfilled]: (state, { payload }) => {
      state.entities[payload.id] = payload;
      // state.comment = payload.note
      state.tableRows[payload.id] = LeadsFactory.makeTableRow(payload);
      state.loading.addComment = false;
    },
    [LeadController.commentSection.rejected]: (state, { error }) => {
      state.loading.addComment = false;
      state.errors.addComment = error.message;
    },

    [LeadController.Quotetablerow.pending]: (state, { payload }) => {
      state.loading.Quotedata = true;
      state.errors.Quotedata = '';
    },
    [LeadController.Quotetablerow.fulfilled]: (state, { payload }) => {
      state.quoteDetailsdata = payload;
      state.loading.Quotedata = false;
    },
    [LeadController.Quotetablerow.rejected]: (state, { error }) => {
      state.loading.Quotedata = false;
      state.errors.Quotedata = error.message;
    },

    [LeadController.Contracttablerow.pending]: (state, { payload }) => {
      state.loading.Contractdata = true;
      state.errors.Contractdata = '';
    },
    [LeadController.Contracttablerow.fulfilled]: (state, { payload }) => {
      state.contractDetailsdata = payload;
      state.loading.Contractdata = false;
    },
    [LeadController.Contracttablerow.rejected]: (state, { error }) => {
      state.loading.Contractdata = false;
      state.errors.Contractdata = error.message;
    },

    [LeadController.loadgetKpi.pending]: (state, { payload }) => {
      state.loading.kpi = true;
      state.errors.kpi = '';
    },
    [LeadController.loadgetKpi.fulfilled]: (state, { payload }) => {
      state.Chicklet = LeadsFactory.JsonparseData(payload.GetKpi);

      state.loading.kpi = false;
    },
    [LeadController.loadgetKpi.rejected]: (state, { error }) => {
      state.loading.kpi = false;
      state.errors.kpi = error.message;
    },

    [LeadController.shareAttachment.pending]: (state, { payload }) => {
      state.loading.shareQuotation = true;
      state.errors.shareQuotation = '';
    },
    [LeadController.shareAttachment.fulfilled]: (state, { payload }) => {
      state.Docattachments = payload;
      state.loading.shareQuotation = false;
    },
    [LeadController.shareAttachment.rejected]: (state, { error }) => {
      state.loading.shareQuotation = false;
      state.errors.shareQuotation = error.message;
    },

    // [LeadController.runLeadVerification.pending]: (state, { payload }) => {
    //   state.loading.duplicate = true;

    //   state.errors.duplicate = "";
    // },
    // [LeadController.runLeadVerification.fulfilled]: (state, { payload }) => {
    //   state.Duplicatedata = payload.lead
    //   state.Blacklist = payload.blacklistLead
    //   state.loading.duplicate = false;
    // },
    // [LeadController.runLeadVerification.rejected]: (state, { error }) => {
    //   state.loading.duplicate = false;
    //   state.errors.duplicate = error.message;
    // },

    [LeadController.autocheckfeasibility.pending]: (state, { payload }) => {
      state.loading.autocheck = true;

      state.errors.autocheckfailed = '';
    },
    [LeadController.autocheckfeasibility.fulfilled]: (state, { payload }) => {
      state.autofeasibility = payload;

      state.loading.disbled = true;
      state.loading.autocheck = false;
    },
    [LeadController.autocheckfeasibility.rejected]: (state, { error }) => {
      state.loading.duplicate = false;
      state.errors.autocheckfailed = error.message;
    },

    [LeadController.DocumentCheck.pending]: (state, { payload }) => {
      state.loading.Documentloading = true;
      state.errors.DocumentError = '';
    },

    [LeadController.DocumentCheck.fulfilled]: (state, { payload }) => {
      state.Documentcheck = payload?.customer?.document;

      state.loading.Documentloading = false;
    },
    [LeadController.DocumentCheck.rejected]: (state, { error }) => {
      state.loading.duplicate = false;
      state.errors.DocumentError = error.message;
    },

    [LeadController.Duplicatechecklead.pending]: (state, { payload }) => {
      state.loading.PreFillData = true;
      state.errors.PreFillData = '';
    },

    [LeadController.Duplicatechecklead.fulfilled]: (state, { payload }) => {
      state.PreFillData = payload[1];
      state.loading.PreFillData = false;
    },
    [LeadController.Duplicatechecklead.rejected]: (state, { error }) => {
      state.loading.PreFillData = false;
      state.errors.PreFillData = error.message;
    },

    // createContract

    [LeadController.createContract.pending]: (state, { payload }) => {
      state.loading.contractloading = true;
      state.errors.contractError = '';
    },

    [LeadController.createContract.fulfilled]: (state, { payload }) => {
      state.contractData = payload;
      state.loading.showbutton = true;
      state.loading.contractloading = false;
    },
    [LeadController.createContract.rejected]: (state, { error }) => {
      state.loading.contractloading = false;
      state.errors.contractError = error.message;
    },

    // contractSign off

    [LeadController.ContractSignoff.pending]: (state, { payload }) => {
      state.loading.contractSign = true;
      state.errors.contractSignerror = '';
    },

    [LeadController.ContractSignoff.fulfilled]: (state, { payload }) => {
      state.loading.contractSign = false;
      state.entities[payload.id] = payload;
      payload.opportunities.map((opp) => {
        state.existingids[opp.id] = opp;
        // state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
        if (state.oppTableRow) {
          state.oppTableRow[opp.id] = LeadsFactory.makeOppTableRow(
            opp,
            payload
          );
        }
        state.tableRows[opp.id] = LeadsFactory.makeTableRow(payload, opp);
      });
    },

    [LeadController.ContractSignoff.rejected]: (state, { error }) => {
      state.loading.contractSign = false;
      state.errors.contractSignerror = error.message;
    },

    [LeadController.getvasproducts.pending]: (state, { payload }) => {
      state.loading.getvasproduct = true;

      state.errors.getvasproduct = '';
    },
    [LeadController.getvasproducts.fulfilled]: (state, { payload }) => {
      state.vasProducts = payload;
      state.loading.getvasproduct = false;
    },
    [LeadController.getvasproducts.rejected]: (state, { error }) => {
      state.loading.getvasproduct = false;
      state.errors.getvasproduct = '';
    },

    //

    [LeadController.dependencyproductlist.pending]: (state, { payload }) => {
      state.loading.dependency = true;

      state.errors.getvasproduct = '';
    },
    [LeadController.dependencyproductlist.fulfilled]: (state, { payload }) => {
      state.dependencyProductitems = payload;
      state.loading.dependency = false;
    },
    [LeadController.dependencyproductlist.rejected]: (state, { error }) => {
      state.loading.dependency = false;
      state.errors.dependency = '';
    },

    [LeadController.getContractdetails.pending]: (state, { payload }) => {
      state.loading.contract = true;

      state.errors.getvasproduct = '';
    },
    [LeadController.getContractdetails.fulfilled]: (state, { payload }) => {
      state.LeadContract = payload;
      state.loading.contract = false;
    },
    [LeadController.getContractdetails.rejected]: (state, { error }) => {
      state.loading.contract = false;
      state.errors.contract = '';
    },

    [LeadController.Duplicatedenlist.pending]: (state, { payload }) => {
      state.loading.customerDetails = true;

      state.errors.customerDetails = '';
    },
    [LeadController.Duplicatedenlist.fulfilled]: (state, { payload }) => {
      state.customerDetails = LeadsFactory.MakeLeadpayaload(
        _.get(payload, '[0]', '')
      );
      state.loading.customerDetails = false;
    },
    [LeadController.Duplicatedenlist.rejected]: (state, { error }) => {
      state.loading.customerDetails = false;
      state.errors.customerDetails = '';
    }
  }
});

export { Leads };
export default Leads.actions;

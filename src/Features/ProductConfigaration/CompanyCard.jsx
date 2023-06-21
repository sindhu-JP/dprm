import React from 'react';
import { useSelector, connect } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Button,
  makeStyles,
  TextField
} from '@material-ui/core';
import { useWatch } from 'react-hook-form';
import FormStore from 'Store/Form';
import { Form } from 'lib/components';
import _ from 'lodash';
import { getTotalChargeOfType } from 'lib/utils/product';
import Cart from 'Components/Cart';
import LeadUtils from 'lib/utils/lead';
import { useStateful } from 'react-hanger';
// import Checkbox from 'Features/LeadDetails/CheckBox';
import Autocomplete from 'lib/components/Autocomplete';
import { SvgIcon } from 'lib/components';
import SvgIconcomp from 'Assets/Icons/company_1716823.svg';

const schema = {
  id: 'quote',
  title: 'New Quote',
  description: 'New quote for lead.',
  type: 'object',
  fields: {
    quoteName: {
      id: 'quoteName',
      label: 'QUOTE NAME',
      type: 'text',
      validation: {
        description: 'Quote Name',
        type: 'string'
      },
      errors: {
        required: 'Quote name is required.'
      }
    },
    quoteId: {
      id: 'quoteId',
      label: 'QUOTE ID',
      type: 'text',
      validation: {
        required: true,
        description: 'Quote ID',
        type: 'number',
        min: 1000000000,
        max: 9999999999
      },
      errors: {
        required: 'Quote ID is required.'
      }
    },
    validity: {
      id: 'validity',
      label: 'VALIDITY',
      type: 'dateKeyboard',
      validation: {
        required: true,
        description: 'Quote Validity',
        type: 'dateKeyboard'
      },
      errors: {
        required: 'Quote validity is required.'
      }
    },
    quoteType: {
      id: 'quoteType',
      label: 'QUOTE TYPE',
      type: 'autocomplete',
      options: [
        {
          code: 'New Sales',
          name: 'New sales'
        },
        {
          code: 'Cross Sales',
          name: 'Cross Sales'
        },
        {
          code: 'Up Sales',
          name: 'Cross Sales'
        }
      ],
      validation: {
        required: true,
        description: 'Quote Type',
        type: 'string'
      },
      errors: {
        required: 'Quote type is required.'
      }
    },

    // TaxExempted: {
    //   id: "tax",
    //   label: "Tax Exempted",
    //   type: "switch",
    //   options: {
    //     label: "asdasd",
    //     value: false,
    //   },
    // },

    EXEMPTIONTILL: {
      id: 'EXEMPTION TILL',
      label: 'EXEMPTION TILL',
      type: 'date',
      showif: {
        field: 'tax',
        value: true
      },
      validation: {
        required: true,
        description: 'Quote Validity',
        type: 'date'
      },
      errors: {
        required: 'Quote validity is required.'
      }
    },

    EXEMPTEDTAXPOLICY: {
      id: 'EXEMPTEDTAXPOLICYe',
      label: 'EXEMPTED_TAX_POLICY',
      type: 'autocomplete',
      showif: {
        field: 'tax',
        value: true
      },
      options: [
        {
          name: 'CST @6%',
          code: 'CST @6%'
        },
        {
          name: 'NILL @2.5',
          code: 'NILL @2.5'
        }
      ],
      validation: {
        required: true,
        description: 'Quote Type',
        type: 'string'
      },
      errors: {
        required: 'Quote type is required.'
      }
    }
  }
};

const CompanyCard = ({
  id,
  lead,

  control,
  details,
  formOptions,

  handleLeadClasification,
  handleLeadAssignment
}) => {
  const classes = useStyles();
  const [productdetails, setdetails] = React.useState([]);
  const form = useSelector((state) => state.form.forms[id]);
  const masterdata = useSelector((state) => state.master.data);
  const address = useStateful({});

  const classificationLead = useWatch({ control, name: 'leadClassification' });
  const assignmentLead = useWatch({ control, name: 'leadAssignment' });

  React.useEffect(() => {
    if (lead?.companyAddress && masterdata) {
      address.setValue(
        LeadUtils.getPrimaryAddress({
          addressDetails: lead?.companyAddress,
          masterdata
        })
      );
    }
  }, [lead]);
  React.useEffect(() => {
    if (classificationLead) {
      handleLeadClasification(classificationLead);
    }
    if (assignmentLead) {
      handleLeadAssignment(assignmentLead);
    }
  }, [classificationLead, assignmentLead]);

  return (
    <div>
      <div></div>
      <Grid container direction="column" spacing={8}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <Grid container alignItems="center" justify="space-between">
              <Grid itemxs={4}>
                <Grid container alignItems="center" spacing={4}>
                  <Grid item>
                    <img src={SvgIconcomp} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">
                      {`${details.companyName} - ${details.registrationNumber}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <Autocomplete
                      error={false}
                      name="leadAssignment"
                      controllerProps={{
                        defaultValue: details.assignment
                      }}
                      options={formOptions.accountManagers}
                      label="Lead Assigned"
                      variant="standard"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      error={false}
                      controllerProps={{
                        defaultValue: details.classification
                      }}
                      name="classification"
                      options={formOptions.leadClassifications}
                      label="Lead Classification"
                      variant="standard"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  border: {
    border: '1px solid #e2e2e2'
  },
  heading: {
    fontSize: '18px',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium
  },
  upfrontTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.common.gold
  },
  recurringTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.common.indigo
  }
  // subtitle: {
  //   fontWeight: "600",
  // },
}));

export default connect(undefined, {
  updateField: FormStore.updateField
})(CompanyCard);

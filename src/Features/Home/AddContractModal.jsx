import React from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
// import NavigateNext from '@material-ui/icons/NavigateNext';
// import { TextField } from 'formik-material-ui';
// import { KeyboardDatePicker } from '@material-ui/pickers';
// import { Formik, Form, Field } from 'formik';
// import Accordion from '@mui/material/Accordion'
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import FormFields from 'Features/Forms/FormFields';
// import DocumentUpload from 'lib/components/DocumentUpload/DocumentUpload';
// import LeadcompanyDetails from 'Features/360/components/Customer/Details/LeadcompanyDetails';
// import LeadPrimaryContact from 'Features/360/components/Customer/Details/LeadPrimaryContactDetails';
// // import LeadCompanyAddress from 'Features/360/components/Customer/Details/LeadCompanyAddress';
// import AttachedSettlementRule from 'Features/Agent360/AttachedSettlementRule';
// import AttachedCommissionRule from 'Features/Agent360/AttachedCommissionRule';
import contractAPI from 'Http/api/contract';
import CompanyLogo from '../../Assets/Icons/building.svg';
import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';
import DocumentUpload from 'lib/components/DocumentUpload/DocumentUpload';
// import ContractDetails from 'Features/Forms/ContractDetails';
const useStyles = makeStyles((theme) => {
  return {
    grid_item: {
      width: 'calc(100%/3)',
      minWidth: '200px'
    },
    settBox: {
      border: '1px solid #e2e2e2',
      borderRadius: '16px',
      marginBottom: '10px',
      paddingRight: '28px',
      paddingLeft: '28px'
    },
    textArea_container: {
      width: '100%',
      marginTop: '20px'
    },
    Acc: {
      paddingTop: '10px',
      margin: '0 20px 20px 20px !important',

      borderRadius: '16px !important',
      '&:before': {
        height: '0px !important'
      }
    },
    textarea: {
      width: '100%',
      minWidth: '100%',
      // maxWidth: theme.spacing(92),
      // maxHeight: theme.spacing(104),
      border: '#ededf5 2px solid ',
      borderRadius: '10px',
      color: theme.palette.text.primary,
      fontFamily: 'inherit',
      padding: '10px 0 0 20px'
    },
    drawer: {
      backgroundColor: '#ededf5'
    },
    headMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: '20px 20px 0 20px'
    },
    btnn: {
      gap: '10px',
      padding: '5px 5px 5px 0',
      background: 'white',
      marginRight: '20px',
      marginTop: '5px'
    },
    div1: {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: '20px 20px 0 20px'
    },
    div2: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    title: {
      fontWeight: theme.typography.fontWeightBold
    },
    list: {
      width: 250
    },
    fullList: {
      width: 'auto'
    },
    container: {
      height: ({ heightvalue }) => (heightvalue ? heightvalue : '100vh'),
      overflowX: 'hidden',
      overflowY: 'auto',
      backgroundColor: theme.palette.background.main
    },
    header: {
      backgroundColor: theme.palette.primary.bottomHeader,
      '& .MuiIconButton-root': {
        '& .MuiIconButton-label': {
          color: theme.palette.primary.primaryMainContrast
        }
      }
    }
  };
});
const AddContractModal = (props) => {


  const [contractDocument, setContractDocs] = React.useState();

  React.useEffect(() => {
    getDocumentDetails();
  }, []);

  const getDocumentDetails = async () => {

    console.log("here 1xc", props)
    // let subType =
    //   partnerDetails.value?.PartnerProfileCreation?.PartnerDetails
    //     ?.PARTNER_SUB_TYPE;
    // subType.split(' ').join('');

    let payload = {
      pageNumber: 0,
      pageSize: 30,
      sortDirection: 'DESC',
      sortField: 'createdDate',
      useSorting: true,
      categorySearchString: props?.agent?.AgentDetails?.AGENT_TYPE,
      
      // 'BOT',
      subCategorySearchString: props?.agent?.AgentDetails?.AGENT_SUB_TYPE,

      // '360 MALL',
      lobSearchString: '',
      serviceRequestNameSearchString: '',
      formTypeSearchString:props?.agent?.AgentDetails?.AGENT_TYPE.replace(/\s/g, '') + props?.agent?.AgentDetails?.AGENT_SUB_TYPE,

      showSfdtx: false
    };
    let details = await contractAPI.getDocumentDetails(payload);
    setContractDocs(details?.content[0]);
    
  };
  const classes = useStyles();

  console.log(props?.agent,props, 'AddContractModal');

  return (
    <div>
      <Buttonsheet
        open={props?.open}
        onClose={props?.onClose}
        header={'Add Agent Contract'}
      >
        <Grid container direction="column" spacing={6}>
          {/* <ContractDetails details={props} /> */}
          <Box px={5} mt={5}>
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
                            {props.agent?.AgentDetails?.FIRST_NAME} &nbsp; {props.agent?.AgentDetails?.LAST_NAME}
                            {' '}-{' '}
                            {props.agent?.AgentDetails?.Agent_ID}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Grid item>
          <BottomSheetFormFields
            // partnerId={data}
            partnerId= {props.agent?.AgentDetails}
            productId={props}
            contractId={props.agent?.AgentDetails?.LAST_NAME}
            formIdentity="Add_Contract"
            CmsDetails={contractDocument}
            ProductForm={['ContractInformation','CommissionRuleDetails','SettlementRuleDetails', 'UploadDocuments',]}
          />
          </Grid>
          <Grid item>
            <>
              <Grid item>
                <DocumentUpload
                  maintitle={'Contract Documents'}
                  documentDetails={
                  contractDocument
                  }
                 
                />
              </Grid>
            </>
          </Grid>
        </Grid>
      </Buttonsheet>
    </div>
  );
};
export default AddContractModal;

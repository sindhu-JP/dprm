import { Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';
import React from 'react';
import { useStateful } from 'react-hanger';
import CompanyLogo from '../../Assets/Icons/company_1716823.svg';

export default function ContractSignOff({
  onClose,
  modalcontext,
  handleloadcontracts,
  reloadTableData
}) {

  const classes = useStyles();

  const details = useStateful({});
  React.useEffect(() => {
    if (modalcontext) {
      details.setValue(modalcontext.details);
    }
  }, [modalcontext]);

  console.log(modalcontext, "testrunxxx");

  return (
    <Buttonsheet open={true} onClose={onClose}>
      <Grid container direction="column" spacing={6}>
        <Grid item>
          <Typography variant="h4">Contract Association with</Typography>
        </Grid>
        <Grid item>
          <Paper
            // className={classes.aa}

            elevation={0}
          >
            <Grid container direction="row" spacing={3} justify="space-between">
              <Grid item>
                <Grid xs>
                  <Grid container direction="row" spacing={3}>
                    <Grid item>
                      <img className={classes.name} src={CompanyLogo} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">
                        {/* {modalcontext?.partnerDetails?.PartnerProfileCreation
                          ?.PartnerDetails?.PARTNER_NAME ||
                          modalcontext?.partnerDetails?.TenantProfileCreation
                            ?.TenantDetails?.PARTNER_NAME}
                        -ok1{' '}
                        {modalcontext?.partnerDetails?.PartnerProfileCreation
                          ?.PartnerDetails?.Partner_ID ||
                          modalcontext?.partnerDetails?.TenantProfileCreation
                            ?.TenantDetails?.TENANT_ID} */}
                        {details.value?.rowlist?.AddContractFor
                          ?.ContractInformation?.Partner_Name ||  `${modalcontext?.agentObj?.AgentDetails?.FIRST_NAME}  ${modalcontext?.agentObj?.AgentDetails?.LAST_NAME}`
                          || 
                          details.value?.rowlist?.AddContractFor
                            ?.ContractInformation?.TENANT_NAME}{' '} 
                        -{' '}
                        {
                          details.value?.rowlist?.AddContractFor
                            ?.ContractInformation?.Partner_ID ||
                            details.value?.rowlist?.AddContractFor
                            ?.ContractInformation?.TENANT_ID || modalcontext?.agentObj?.AgentDetails?.Agent_ID

                        }
                        {/* ||
                        {
                          details.value?.rowlist?.AddContractFor
                            ?.ContractInformation?.TENANT_ID
                        } */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item>
                <Button
                  size="large"
                  variant="text"
                  color="primary"
                  //   onClick={() => {
                  //     dispatch(Model.open({ id: 'ViewContract' }));
                  //     dispatch(Model.close('ButtomDrawer'));
                  //   }}
                >
                  View Contract
                </Button>
              </Grid> */}
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <BottomSheetFormFields
            formIdentity="Contract_Sign_Off"
            partnerName={
              modalcontext?.partnerDetails?.PartnerProfileCreation
                ?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME ||
              modalcontext?.partnerDetails?.TenantProfileCreation
                ?.PrimaryContactDetails?.PRIMARY_CONTACT_NAME ||  `${modalcontext?.agentObj?.AgentDetails?.FIRST_NAME} ${modalcontext?.agentObj?.AgentDetails?.LAST_NAME}`
            }
            contractId={details.value?.columns?.id}
            partnerId={details.value?.columns?.partnerId || modalcontext?.agentObj?.AgentDetails?.Agent_ID}
            handleloadcontracts={handleloadcontracts}
            message="Contract Sign off done Successfully!"
            modalcontext={modalcontext}
            reloadTableData={reloadTableData}
            onClose={onClose}
          />
        </Grid>
      </Grid>
    </Buttonsheet>
  );
}

const useStyles = makeStyles((theme) => ({
  field: {
    width: 'calc(50vw)',
    minWidth: '150px',
    maxWidth: '360px',
    marginLeft: '16px',
    marginRight: '16px',
    marginBottom: '16px'
  },
  outerdiv: {
    backgroundColor: theme.palette.background.main
  },
  partner: {
    height: '20px',
    marginTop: '0px'
  },
  profile: {
    margin: 10
  },
  main: {
    backgroundColor: theme.palette.background.main,
    padding: '5px'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  aa: {
    marginTop: 10,
    marginBottom: 10
  },
  viewcrt: {
    color: '#1400C8'
  },
  id: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  name: {
    marginRight: 10
  },
  root: {
    width: theme.spacing(60),
    // border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    height: '23.5rem',
    marginLeft: '10px'
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '8.5rem',
    borderWidth: 2,
    borderRadius: 2,
    // borderColor: "#e2e2e2",
    // borderStyle: "dashed",
    backgroundColor: '#ffffff',
    color: theme.palette.common.textSecondary,
    outline: 'none',

    textAlign: 'center',
    minHeight: '100px',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  }
}));

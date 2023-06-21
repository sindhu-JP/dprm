import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import noDataFound from 'Assets/Icons/noDataFound.svg';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import './index.css';
import Slide from '@material-ui/core/Slide';
import Alert from 'Store/Alert';
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core';
// import SearchBar from 'Features/360/Partner360/Financial/SearchBar';
// import NormalSearch from 'Components/TableSearch/NormalSearch';
import TableSearch from './tableSearch';
import { useStateful } from 'react-hanger';
import { useDispatch } from 'react-redux';
import dashboardAPI from '../../Http/api/dashboard';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import SearchCustomerListItem from 'Components/SearchBar/SearchCustomerListItem';
import { history } from 'Store';
const theme = createTheme({
  overrides: {
    MuiDialogPaperWidthMd: {
      maxWidth: '1000px'
    }
  }
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    '& .MuiPaper-root': {
      width: '100%',
      maxWidth: '650px !important' // Set your width here
    }
  },
  avatarPlaceholder: {
    backgroundColor: theme.palette.text.heading,
    width: theme.spacing(16),
    height: theme.spacing(16)
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  paperWidthMd: { maxWidth: '1000px !important' }
});
// () => history.push('/digital-prm-web-ui/suspension');
export default function PartnerSearch({ open, setOpen, setListOpen}) {
  const handleSearchResult = (item) => {
    console.log(item.PartnerProfileCreation?.PartnerDetails?.Partner_Suspension_Request, item, 'llllllllllllllllllllllll')
    if(item.PartnerProfileCreation?.PartnerDetails?.Partner_Suspension_Request === ""||item.PartnerProfileCreation?.PartnerDetails?.Partner_Suspension_Request === "Rejected"){  
    history.push({
      pathname: `/digital-prm-web-ui/suspension`,
      state: {
        partnerDetails:
          item.PartnerProfileCreation || item.TenantProfileCreation
      }
    });
    }else if(item.TenantProfileCreation?.TenantDetails?.Tenant_Suspension_Request === ""||item.TenantProfileCreation?.TenantDetails?.Tenant_Suspension_Request === "Rejected"){
      history.push({
        pathname: `/digital-prm-web-ui/suspension`,
        state: {
          partnerDetails:
            item.PartnerProfileCreation || item.TenantProfileCreation
        }
      });
    }else {
      dispatch(
        Alert.open({
          type: 'error',
          message: 'Suspension Approval is already in Pending'
        })
      );
    }
  };
  const [searchBy, setSearchBy] = React.useState('');
  const SearchText = useStateful('');
  const [searchId, setSearchId] = React.useState('');
  const dispatch = useDispatch();
  const [openList, setOpenList] = React.useState(false);
  const [partnerList, setPartnerList] = React.useState([]);
  const [contractType, setContractType] = React.useState('Partner');
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [text, setText] = React.useState('');
  const resetList = () => {
    setPartnerList([]);
  };
  const classxx = withStyles(styles);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErr(false);
    setLoader(false);
    setOpen(false);
    setPartnerList([]);
    setSearchBy('');
    setContractType('Partner');
    setText('');
  };
  const PartnerOptions = [
    {
      name: 'Partner Id',
      code: 'PartnerProfileCreation.PartnerDetails.Partner_ID',
      Type: 'Partner'
    },
    {
      name: 'Partner Name',
      code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
      Type: 'Partner'
    }
  ];

  const TenantOptions = [
    {
      name: 'Tenant Id',
      code: 'TenantProfileCreation.TenantDetails.TENANT_ID',
      Type: 'Partner'
    },
    {
      name: 'Tenant Name',
      code: 'TenantProfileCreation.TenantDetails.TENANT_NAME',
      Type: 'Partner'
    }
  ];
  const Options = contractType === 'Partner' ? PartnerOptions : TenantOptions;
  const onSearchTable = async (search, value) => {
    let active = `&PartnerProfileCreation.PartnerDetails.Onboarding_Status=ACTIVE`;
    setLoader(true);
    setPartnerList([]);
    setOpenList(false);
    try {
      setErr(false);
      if (contractType === 'Partner') {
        const { data } = await dashboardAPI.getSuspensionPartners(
          100,
          0,
          SearchText.value,
          searchBy,
          active
        );
        
        setPartnerList(data);
        setOpenList(true);
        
      }

      if (contractType === 'Tenant') {
        const { data } = await dashboardAPI.getSuspendTenants(
          100,
          0,
          SearchText.value,
          searchBy
        );
        setPartnerList(data);
        setOpenList(true);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      // console.log(error);
      setErr(true);
    }
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  console.log(
    partnerList,
    'partnerListpartnerListpartnerListpartnerListpartnerList'
  );
  return (
    <div
      style={{
        position: 'absolute',
        top: `-120px`,
        maxWidth: '1000px !important'
      }}
    >
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            top: partnerList?.length > 1 ? '-50px' : '-120px',
            maxWidth: '1000px'
          }
        }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ padding: '0px' }}
          onClose={handleClose}
        >
          <Typography>{'Suspension'}</Typography>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              // display: 'flex',
              justifyContent: 'start'
            }}
          >
            <DialogContentText id="alert-dialog-slide-description">
              <RadioGroup
                onChange={(e) => {
                  setContractType(e.target.value);
                  setSearchBy('');
                }}
                defaultValue={'Partner'}
                value={contractType}
              >
                <Grid container direction="row">
                  {['Partner', 'Tenant'].map((item, index) => (
                    <Grid item key={index}>
                      <FormControlLabel
                        id={index}
                        value={item}
                        label={item}
                        control={<Radio />}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
              {/* <NormalSearch
              Options={[
                {
                  name: 'Partner Id',
                  code: 'PartnerProfileCreation.PartnerDetails.Partner_ID',
                  Type: 'Partner'
                },
                {
                  name: 'Partner Name',
                  code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
                  Type: 'Partner'
                },
                {
                  name: 'Email',
                  code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID',
                  Type: 'Partner'
                },
                {
                  name: 'Mobile',
                  code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER',
                  Type: 'Partner'
                }
              ]}
              onSearchTable={onSearchTable}
              setText={setText}
              text={text}
              setSearchBy={setSearchValueBy}
              searchBy={searchValueBy}
              Text={Text}
              searchText={searchText}
              setSearchId={setSearchId}
              loader={loader}
            /> */}
              <TableSearch
                SearchOptions={'Partner'}
                // onSelectValues={onSelectValues}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchText={SearchText}
                resetList={resetList}
                // onsearch={onPartnersearch}
                setPartnerList={setPartnerList}
                placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
                partnerValue="partnerValue"
                onSearchTable={onSearchTable}
                TableSearchBar={true}
                Options={Options}
                setText={setText}
                text={text}
              />
            </DialogContentText>
          </div>

          {loader && (
            <>
              <Grid item>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  style={{ paddingTop: '50px' }}
                >
                  <Grid item>
                    <CircularProgress size={20} color="primary" />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {err && (
            <Grid item>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                style={{ paddingTop: '50px' }}
              >
                <Grid item>
                  <img src={noDataFound} />
                </Grid>
                <Grid item>No Records Available</Grid>
              </Grid>
            </Grid>
          )}
          <div style={{ overflow: 'scroll', maxHeight: '400px' }}>
            {contractType === 'Partner' &&
              partnerList?.length > 0 &&
              partnerList.map((el) => (
                <SearchCustomerListItem
                  status={
                    el.PartnerProfileCreation?.PartnerDetails?.Onboarding_Status
                  }
                  mail={
                    el.PartnerProfileCreation?.PrimaryContactDetails?.EMAIL_ID
                  }
                  leadId={el.PartnerProfileCreation?.PartnerDetails?.Partner_ID}
                  primaryContact={
                    el.PartnerProfileCreation?.PrimaryContactDetails
                      ?.MOBILE_NUMBER
                  }
                  fullName={
                    el.PartnerProfileCreation?.PartnerDetails?.PARTNER_NAME
                  }
                  contractCount={null}
                  productCount={null}
                  tenantCount={null}
                  CRN={
                    el.PartnerProfileCreation?.PartnerDetails
                      ?.PARTNER_REGISTRATION_NUMBER
                  }
                  searchText={SearchText.value}
                  onCustomerClick={() => handleSearchResult(el)}
                  classes={{
                    avatarPlaceholder: '',
                    root: ''
                  }}
                />
              ))}
          </div>
          <div style={{ overflow: 'scroll', maxHeight: '400px' }}>
            {contractType === 'Tenant' &&
              partnerList?.length > 0 &&
              partnerList.map((el) => (
                <SearchCustomerListItem
                  status={
                    el.TenantProfileCreation?.TenantDetails?.Onboarding_Status
                  }
                  mail={
                    el.TenantProfileCreation?.PrimaryContactDetails?.EMAIL_ID
                  }
                  leadId={el.TenantProfileCreation?.TenantDetails?.TENANT_ID}
                  primaryContact={
                    el.TenantProfileCreation?.PrimaryContactDetails
                      ?.MOBILE_NUMBER
                  }
                  fullName={
                    el.TenantProfileCreation?.TenantDetails?.TENANT_NAME
                  }
                  contractCount={null}
                  productCount={null}
                  tenantCount={null}
                  CRN={
                    el.TenantProfileCreation?.TenantDetails
                      ?.COMPANY_REGISTRATION_NUMBER
                  }
                  searchText={SearchText.value}
                  onCustomerClick={() => handleSearchResult(el)}
                  classes={{
                    avatarPlaceholder: '',
                    root: ''
                  }}
                />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

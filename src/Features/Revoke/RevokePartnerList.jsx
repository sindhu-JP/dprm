import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core';
import TableSearch from './RevokeTableSearch';
import { useStateful } from 'react-hanger';
// import PartnerList from './PartnerListSearch';
// import RevokePartnerList from './RevokePartnerListSearch';
import dashboardAPI from '../../Http/api/dashboard';
import noDataFound from 'Assets/Icons/noDataFound.svg';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SearchCustomerListItem from 'Components/SearchBar/SearchCustomerListItem';
import { history } from 'Store';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

// () => history.push('/digital-prm-web-ui/suspension');
export default function RevokePartnerSearch({ open, setOpen }) {
  const [searchBy, setSearchBy] = React.useState('');
  const SearchText = useStateful('');
  const [searchId, setSearchId] = React.useState('');
  const [openList, setOpenList] = React.useState(false);
  const [revokePartnerList, setRevokePartnerList] = React.useState([]);
  const [contractType, setContractType] = React.useState('Partner');
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [text, setText] = React.useState('');

  // onClick={() =>
  //   history.push({
  //     pathname: `/digital-prm-web-ui/revoke`,
  //     state: {
  //       partnerDetails: item
  //     }
  //   })
  // }
  const handleSearchResult = (item) => {
    history.push({
      pathname: `/digital-prm-web-ui/revoke`,
      state: {
        partnerDetails:
          item.PartnerProfileCreation || item.TenantProfileCreation
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErr(false);
    setLoader(false);
    setOpen(false);
    setRevokePartnerList([]);
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
    // {
    //   name: 'Email',
    //   code: 'PartnerProfileCreation.PrimaryContactDetails.EMAIL_ID',
    //   Type: 'Partner'
    // },
    // {
    //   name: 'Mobile',
    //   code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER',
    //   Type: 'Partner'
    // }
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
  const resetList =()=>{
    setRevokePartnerList([]);
  }
  const onSearchTable = async (search, value) => {
    let active = `&PartnerProfileCreation.PartnerDetails.Onboarding_Status=SUSPENDED`;
    setLoader(true);
    try {
      setErr(false);  
      if (contractType === 'Partner') {
        const { data } = await dashboardAPI.getRevokePartners(
          10,
          0,
          SearchText.value,
          searchBy,
          active
        );
        setRevokePartnerList(data);
        setOpenList(true);
      }

      if (contractType === 'Tenant') {
        const { data } = await dashboardAPI.getRevokeTenants(
          5,
          0,
          SearchText.value,
          searchBy
        );
        setRevokePartnerList(data);
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
            maxWidth: '1000px',
            top: revokePartnerList?.length > 1 ? '-50px' : '-150px'
          }
        }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ padding: '0px' }}
          onClose={handleClose}
        >
          {'Revoke Partner Suspensions'}
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
                defaultValue="Partner"
                value={contractType}
                onChange={(e) => {
                  setContractType(e.target.value);
                  setSearchBy('');
                }}
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
                resetList={resetList}
                // onSelectValues={onSelectValues}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchText={SearchText}
                // onsearch={onPartnersearch}
                setOpen={setOpen}
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
              revokePartnerList?.length > 0 &&
              revokePartnerList.map((el) => (
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
              revokePartnerList?.length > 0 &&
              revokePartnerList.map((el) => (
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

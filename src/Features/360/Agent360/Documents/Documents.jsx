import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  makeStyles,
  Typography,
  Box,
  Paper,
  TextField,
  Tooltip,
  IconButton
} from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
import dayjs from 'dayjs';
import Table from '../../../../Components/Table/RenderTable';
import { DOCUMENTS } from 'lib/constants';
import img from 'Assets/Icons/Notes.svg';
import imgD from 'Assets/Icons/NotesD.svg';
import classNames from 'classnames';
//import SearchIcon from '@material-ui/icons/Search';
import { connect, useDispatch } from 'react-redux';
import { SearchOutlined } from '@material-ui/icons';
import { useBoolean } from 'react-hanger';
// import ModalsStore from 'Store/Modals';
// import PartnertApi from 'Http/api/Partner';
// import PartnerFactory from 'Factory/Partner';
import LeadActionHide from 'Features/360/360QuoteDetails/LeadActionHide';
import { Trans } from '@lingui/react';
import refreshIcon from 'Assets/Icons/RefreshIcon.svg';
import refreshIconLite from 'Assets/Icons/RefreshIconLitee.svg';
// import DocumentSuccessModal from '../../../../Components/DocumentSuccessModel';
// import FormUploadDrawer from '../../../Forms/FormUploadDrawer';

const Documents = (props) => {
  const { customerInfo, quoteDetails } = props;
  const [qoute360ViewOpen, setQoute360ViewOpen] = React.useState(false);
  const [quoteInfo, setQuoteInfo] = React.useState('');
  const enableSearch = useBoolean(false);
  const classes = useStyles();
  const [isFileuploadDrawer, setIsFileuploadDrawer] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [successModal, SetSuccessModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [value, setValue] = React.useState('');
  const [datas, setDatas] = React.useState([]);
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
  };
  const handleChangeRowsPerListPage = (event) => {
    props.loadLeads({
      user: props.user,
      count: event.target.value,
      usergrpinfo: props.hierarchy?.userInfo
    });
    setRowsPerListPage(+event.target.value);
    setMyListPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    // props.loadLeads({
    //   user: props.user,
    //   count: event.target.value,
    //   usergrpinfo: props.hierarchy?.userInfo
    // });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hydratetaskrows = (data) => {
    let temp = [];
    if (!_.isEmpty(data?.UploadDocuments)) {
      Object.keys(data?.UploadDocuments).map((item) => {
        temp.push(
          ...data.UploadDocuments[item].map((list) => {
            if (list?.id) {
              return {
                columns: {
                  ...list,
                  documentType: item,
                  doc: 'doc'
                }
              };
            }
          })
        );
      });
    }

    return _.compact(temp);
  };

  useEffect(() => {
    setDatas(
      hydratetaskrows(props.partnerdetails?.details?.PartnerProfileCreation)
    );
  }, []);
  const handleContractAction = async (action, data) => {};

  const onDrawerOpen = () => {};

  const handleFileUpload = (file) => {
    setSelectedImage(file);
    onDrawerOpen();
  };
  const DownloadDocs = (url) => {
    props.DownloadPreview({ url, contractPreview: false });
  };

  const handleChange = (e) => {  
    setValue(e.target.value);
  };

  const handleSearch = (e) => {
    let tempDataOne = hydratetaskrows(
      props.partnerdetails?.details?.PartnerProfileCreation
    ).filter(
      (item) =>
        (item.columns &&
          item.columns.id.toLowerCase().includes(value.toLowerCase())) ||
        item.columns.documentType.toLowerCase().includes(value.toLowerCase())
    );

    setDatas(tempDataOne);
    setValue('');
  };

  const handleRefresh = () => {
    setDatas(
      hydratetaskrows(props.partnerdetails?.details?.PartnerProfileCreation)
    );
  };
  return (
    <Grid container direction="row" spacing={6}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Box>
            <Grid container direction="column">
              <Grid item>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    style={{ paddingBottom: '18px' }}
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                      spacing={4}
                    >
                      <Grid item className={classes.spaceBtwn}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          spacing={4}
                        >
                          <Grid item>
                          {ThemeType === 'dark' ? (
                              <img src={imgD} className={classes.imglog} />
                            ) : (
                              <img src={img} className={classes.imglog} />
                            )}
                          </Grid>
                          <Grid item>
                            <Typography variant="h2" className={classes.title}>
                              <Trans id="Document Details"></Trans>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <>
                        <Grid item className={classes.alignments}>
                          <TextField
                            fullWidth
                            id="standard-bare"
                            variant="outlined"
                            placeholder={'Search by Document ID, Name'}
                            style={{
                              width: 400
                            }}
                            onChange={(e) => handleChange(e)}
                            value={value}
                            size="small"
                            className={classNames(
                              hasError && hasError === 'text'
                                ? classes.error
                                : ''
                            )}
                            InputProps={{
                              endAdornment: (
                                <Tooltip
                                  title={<Trans id="Search"></Trans>}
                                  placeholder={<Trans id="bottom"></Trans>}
                                >
                                  <IconButton onClick={handleSearch}>
                                    <SearchOutlined
                                      className={classes.outlineSearch}
                                    />
                                  </IconButton>
                                </Tooltip>
                              )
                            }}
                          />
                        </Grid>
                      </>
                      <Grid item>
                        <Tooltip title="Refresh" placement="bottom">
                          <IconButton>
                            {ThemeType === 'dark' ? (<img src={refreshIconLite} onClick={handleRefresh} />) : (<img src={refreshIcon} onClick={handleRefresh} />)}
                            
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      {/* <Grid item>
                        <Tooltip title='Filter' placeholder='bottom'>
                              <img src={filter} />
                            </Tooltip>
                      </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Table
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              role={props.user?.role?.roleName}
              // onRowClick={handleRowClick}
              rows={datas}
              columns={DOCUMENTS.Documents.columns}
              // onRowAction={handleContractAction}
              breackpoint={true}
              DownloadDocs={DownloadDocs}
              handleFileUpload={handleFileUpload}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold
  },
  imglog: {
    width: '21px',
    height: '29px'
  },
  alignments: {
    alignItems: 'center',
    gap: '10px'
  },
  spaceBtwn: {
    flex: 1
  },
  menumodel: {
    marginTop: '8rem'
  }
}));

export default connect((state) => ({}), {})(Documents);

const QuoteCustomers = {
  columns: [
    // {
    //   id: "quoteName",
    //   label: "QUOTE NAME",
    // },
    {
      id: 'oppID',
      label: 'Opportunity ID'
    },
    {
      id: 'lob',
      label: 'Line of Business'
    },
    {
      id: 'validity',
      label: 'Date & Time',
      format: (date) => dayjs(date).format('D MMMM, YYYY h: mm A')
    },
    {
      id: 'requestType',
      label: 'Request Type'
    },

    {
      id: 'status',
      label: 'STATUS',
      render: ({ status, role, action }) => (
        // <Actions status={status} role={role} onClick={action} />
        <LeadActionHide
          role={role}
          status={status}
          action={action}
          hide={true}
        />
      )
    }
  ]
};

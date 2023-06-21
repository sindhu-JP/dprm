import React from 'react'
import {
    Paper,
    Box,
    Typography,
    // IconButton,
    // TablePagination,
    // InputBase,
    makeStyles
} from '@material-ui/core'

import {downloadFile} from '../../Hooks/FormSubmitHook';

import { useHistory } from 'react-router-dom';

// import { Trans } from '@lingui/react'
import { useStateful } from 'react-hanger';
// import TableSearch from '../../Components/TableSearch';
// import SearchIcon from '@material-ui/icons/Search'
import myNotesIcon from '../../Assets/Icons/myNotesIcon.svg'
import fileUpload from '../../Assets/Icons/fileUpload.svg'
import fileDownload from '../../Assets/Icons/fileDownload.svg'

import {downloadReport} from "../../Http/api/documents"

// import FileOne from "./documents/Donation.csv";
// import FileTwo from "./documents/Marketing-Partners.csv";


const BulkRequestTemplate = () => {
  const classes = useStyles();

  const [searchBy, setSearchBy] = React.useState('');
  const onSelectValues = useStateful({})
  const FilterObj = useStateful({});

  const history = useHistory();

  const redirectTo = () => {
    history.push('/digital-prm-web-ui/UploadFile');
  }

  const download = (fileType) => {
    // const { downloadFile } = FormSubmitHook();

    downloadReport(fileType)
      .then((response) => {

        downloadFile(response, fileType, 'csv');
      })
      .catch((err) => {});
 
  }


  const onPartnersearch = (value) => {
  };
  const clearFilters = () => {
    FilterObj.setValue({});
  };
  const handleParnerRefresh = () => {

  };

  const FilterApply = (limitValue, offsetvalue) => {

  };

  const onSearchTable = (data, value) => {
    onSelectValues.setValue(value);
    // props.orderTracking({ limit: rowsPerPage, offset: page, value: value });
};

  const Options=[

    {
      name: 'Request ID',
      code: 'PartnerProfileCreation.PartnerDetails.PARTNER_NAME',
      Type: 'Partner'
    },

    {
      name: 'Status',
      code: 'PartnerProfileCreation.PrimaryContactDetails.MOBILE_NUMBER',
      Type: 'Partner'
    }
  ]

  return (
    <Paper elevation={0}>

      {/* <Box py={2}>
        <TableSearch
          showwIcon={false}
          SearchOptions={'Partner'}
          title={'Bulk Request Templates'}
          onSelectValues={onSelectValues}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          onsearch={onPartnersearch}
          clearFilters={clearFilters}
          handleRefresh={handleParnerRefresh}
          FilterObj={FilterObj}
          handlFilter={FilterApply}
          filter={'true'}
          placeholder={'Partner ID, Partner Name, Mobile Number, Email'}
          partnerValue="partnerValue"
          onSearchTable={onSearchTable}
          TableSearchBar={true}
          showStatus={true}
          Options={Options}
        />


      </Box> */}

      <Box py={2}>
        <Typography variant='h1'>Bulk Request Templates</Typography>
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '1rem', border: '1px solid lightgrey', margin: '1.5rem 0', padding: '0.6rem' }}>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ width: '1rem', marginRight: '0.3rem' }} src={myNotesIcon} />
          <Typography style={{fontSize:'14px'}}>Marketing Partner commisssioning</Typography>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <img style={{ width: '0.9rem', marginRight: '0.3rem' }} src={fileDownload} />

          <Typography onClick={() => download('MarketingPartner')} style={{fontSize:'14px'}}>Download Template</Typography>
          
        </Box>
        <Box onClick={redirectTo} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <img style={{ width: '0.9rem', marginRight: '0.3rem' }} src={fileUpload} />
          <Typography style={{fontSize:'14px'}}>Upload File</Typography>
        </Box>
      </Box>

      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '1rem', border: '1px solid lightgrey', margin: '1.5rem 0', padding: '0.6rem' }}>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ width: '1rem', marginRight: '0.3rem' }} src={myNotesIcon} />

          <Typography style={{fontSize:'14px'}}>Donation Partner commisssioning</Typography>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <img style={{ width: '0.9rem', marginRight: '0.3rem' }} src={fileDownload} />
          <Typography onClick={() => download('DonationPartner')} style={{fontSize:'14px'}}>Download Template</Typography>
        </Box>

        <Box onClick={redirectTo} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <img style={{ width: '0.9rem', marginRight: '0.3rem' }} src={fileUpload} />
          <Typography style={{fontSize:'14px', cursor: 'pointer'}}>Upload File</Typography>
        </Box>
      </Box>


    </Paper>

  )
}

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    border: '2px solid lightgrey',
    padding: '6px',
    width: 'max-content',
    height: '48px',
    borderRadius: '2rem'
  },

}))


export default BulkRequestTemplate

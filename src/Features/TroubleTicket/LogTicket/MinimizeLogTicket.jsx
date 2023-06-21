import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio
} from '@material-ui/core';
import React from 'react';
import {
  Button,
  Box,
  Grid,
  // makeStyles,
  Typography,
  TextField,
  IconButton
} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
// import { RadioGroup } from 'formik-material-ui';
import { Autocomplete } from 'Components';
import { Trans } from '@lingui/react';
import AttachmentIcon from '@material-ui/icons/AttachFile';
// import ClearIcon from '@material-ui/icons/ClearIcon';
import { ArrowForward } from '@material-ui/icons';

const styles = makeStyles((theme) => ({
  buttonProgress: {
    position: 'absolute',
    color: theme.palette.success.main,
    right: theme.spacing(11)
  },
  loader: {
    color: theme.palette.success.main
  },
  radioGrp: {
    background: theme.palette.background.inactive
  },
  accountData: {
    background: theme.palette.background.main,
    borderRadius: theme.spacing(2)
  },
  iconClearSearch: {
    float: 'right',
    position: 'absolute',
    left: theme.spacing(73),
    background: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.white
    }
  },
  result: {
    width: '30%',
    position: 'absolute',
    zIndex: 1,
    height: 'fitContent',
    overflowY: 'auto'
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.background.inactive
    }
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: '1',
    background: theme.palette.background.inactive
  },

  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    // border: '1px solid #e2e2e2',
    border: '1px solid #e2e2e2',
    backgroundColor: '#F3F4F9',
    height: '5rem',
    borderRadius: '10px'
  }
}));
const MinimizeLogTicket = ({
  OnsearchValue,
  partnerDropdownlist,
  handleSelect,
  ProductDropDownList,
  SelectedProduct,
  LogTicket_ProductObj,
  onDocumentChange,
  logTicketMinMode
}) => {
  const classes = styles();

  const ticketTypesList = [
    { code: 'Complaint', name: 'Complaint', checked: true },
    { code: 'Query', name: 'Query', checked: false },
    { code: 'Request', name: 'Request', checked: false }
  ];
  const fileNames = [];

  const OnchangeProduct = () => {};
  return (
    <div>
      <Grid container direction="column" justify="center">
        <Grid item className={classes.radioGrp}>
          <Box my={3} mx={5}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="ticketType"
                className="inSameline"
                // onChange={(e) => {
                //   handleSelect(e, setType);
                //   setSearchCategory('');
                //   setCategory([]);
                //   setSubCategory([]);
                //   loadCategoriesList(e.target.value);
                //   loadSubcategories(e.target.value);
                // // }}
                // value={type}
              >
                {ticketTypesList &&
                  ticketTypesList.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={item.code}
                        checked={item.checked}
                        disabled={!item.checked}
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs>
          <Box my={5} mx={5} px={3}>
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={6}>
                <Autocomplete
                  label="Search Partner/Tenant"
                  onchangeCode={OnsearchValue}
                  options={partnerDropdownlist || []}
                  onChange={handleSelect}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  label="Select Product"
                  onChange={SelectedProduct}
                  onchangeCode={OnchangeProduct}
                  options={ProductDropDownList || []}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs>
          <Box my={5} mx={5} px={3}>
            <Grid container spacing={6} direction="row">
              <Grid item xs={6}>
                <Autocomplete
                  label="Catagory"
                  // onChange={handleSelect}
                  options={[]}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  label="Sub-Catagory"
                  // onChange={handleSelect}
                  options={[]}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs>
          {!_.isEmpty(LogTicket_ProductObj) && (
            <Box my={5} mx={5} px={3} py={2} className={classes.border}>
              <Box py={2}>
                <Grid
                  container
                  spacing={6}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h2" className={classes.title}>
                      {LogTicket_ProductObj?.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2" className={classes.title}>
                      Product ID:{_.get(LogTicket_ProductObj, 'code', '')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box py={1}>
                <Grid
                  container
                  spacing={6}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h6" className={classes.title}>
                      {_.get(
                        LogTicket_ProductObj.searchlist.AddProduct,
                        'ProductDetails.PRODUCT_LOB',
                        ''
                      )}{' '}
                      &nbsp;&nbsp; | &nbsp; &nbsp;{' '}
                      {_.get(
                        LogTicket_ProductObj.searchlist.AddProduct,
                        'ProductDetails.PRODUCT_TECHNOLOGY',
                        ''
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs>
          <Box my={5} mx={5} px={3} py={2}>
            <TextField label="Description" fullWidth />
          </Box>
        </Grid>
        <Grid item></Grid>
        <Grid item>
          <Box py={4} mx={5}>
            <Grid container direction="row" spacing={4}></Grid>
          </Box>
          <Box py={4} mx={5}>
            <Grid container direction="row" spacing={4}></Grid>
          </Box>
        </Grid>
        <Grid>
          <Box px={10} pb={25}>
            <Grid container direction="column" spacing={6}>
              {fileNames.length > 0 &&
                fileNames.map((fileName, index) => (
                  <Grid item key={index}>
                    <Box p={2} className={classes.attachmentRoot}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item>
                          <Typography className={classes.fileNames}>
                            {fileName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            className="p0"
                            onClick={() => onDeleteFile(fileName)}
                          >
                            {/* <ClearIcon fontSize="small" className="grayText" /> */}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item className={logTicketMinMode ? '' : classes.footer}>
          <Box mr={2}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.radioGrp}
            >
              <Grid item md={2}>
                <Grid container alignItems="center">
                  <Grid item md>
                    <IconButton className="p0">
                      <label className="p15">
                        <Box display="none">
                          <input
                            id="file"
                            multiple
                            type="file"
                            onChange={onDocumentChange}
                            // accept={constants.troubleTicketDoc.types}
                          />
                        </Box>
                        <AttachmentIcon className={classes.attachIcon} />
                      </label>
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={6} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForward />}
                >
                  <Trans id="Proceed"></Trans>

                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default MinimizeLogTicket;

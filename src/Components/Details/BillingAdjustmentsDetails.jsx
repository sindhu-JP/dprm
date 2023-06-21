import React from 'react';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';
import _ from 'lodash';
import Table from 'Components/Table/RenderTable';
import ORDER from 'lib/constants/Financial/ConfigTable';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const BillingAdjustmentsDetails = ({
  values,
  modalcontext,
  invoicedetails,
  billingAdjustmentRow,
  orderPayload
}) => {
  const classes = useStyles();
  const optionalSectionExpanded = useBoolean(false);
  const companyDetails = useStateful({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeListPage = (event, newPage) => {
    setMyListPage(newPage);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const maketablelist = (data) => {
    let rows = _.map(data, (item) => {
      return {
        ...item
      };
    });

    return rows;
  };
  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid
            container
            direction="row"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h2" className={classes.title}>
                Billing Adjustments
              </Typography>
            </Grid>
            <Grid item style={{ marginRight: '7rem' }}>
              <Typography variant="h6" className={classes.title}>
                Total Adjustments: KWD{' '}
                {_.get(orderPayload, 'billingAdjustmentAmount', '00.00')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box mb={4}>
          <Table
            page={page}
            rows={maketablelist(billingAdjustmentRow)}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            columns={ORDER.BillingAdjustments.columns}
            // onRowAction={props.handleInvoiceRowAction}
            // onRowClick={props.handleInvoiceRowClick}
          />
        </Box>
      </Box>
    </Paper>
  );
};
export default BillingAdjustmentsDetails;

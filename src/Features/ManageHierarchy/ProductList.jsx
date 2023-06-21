import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React, { useState } from 'react';

import { useStateful } from 'react-hanger';

import { CircularProgress, Grid } from '@material-ui/core';

import { Paper } from '@material-ui/core';
import Table from '../../Components/Table/RenderTable';
import PRODUCT_TABLE from 'lib/constants/Financial/ConfigTable';
import { useDispatch } from 'react-redux';
import ModalsStore from 'Store/Modals';
import { PARTNER_TABLE_CONFIG } from 'lib/constants';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Alert from 'Store/Alert';
import noDataFound from 'Assets/Icons/noDataFound.svg';
import Statuses from 'lib/constants/statuses';
import { Trans } from '@lingui/react';
const ProductList = ({
  open,
  onClose,
  modalcontext,
  getproductLists,
  productrowlist,
  getPendingProdcutlist,
  PendingProdcutrow,
  openModal,
  user
}) => {
  const details = useStateful({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const bulkcontext = useStateful({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getPendingProdcutlist({
      id: modalcontext?.details?.id,
      type: Statuses.thorwErrormsg[modalcontext.details.partnerType].type,
      limit: rowsPerPage,
      offset: newPage
    });
  };
  const handleChangeRowsPerPage = (event) => {
    getPendingProdcutlist({
      id: modalcontext?.details?.id,
      type: Statuses.thorwErrormsg[modalcontext.details.partnerType].type,
      limit: event.target.value,
      offset: page
    });
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    if (modalcontext?.details?.id) {    
      bulkcontext.setValue(modalcontext);
      getPendingProdcutlist({
        id: modalcontext?.details?.id,
        type: Statuses.thorwErrormsg[modalcontext.details.partnerType].type,
        limit: 10,
        offset: 0,
        searchQuery: '',
        setLoader
      });
    }
  }, [modalcontext]);

  const handleMakerow = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      if (row.columns.validate === 'Approved') {
        rows.push({
          rowlist: row.products,
          columns: {
            ...row.columns
          }
        });
      }
    });

    return rows;
  };

  const handlaction = (action, data) => {
    dispatch(
      ModalsStore.open({
        id: action.modalId,
        context: {
          formIdentity: 'Add_Contract',
          details: data,
          contractType: 'ProductContract',
          partnerdata: modalcontext.details
        }
      })
    );
    dispatch(ModalsStore.close('ProductList'));
  };
  const hydratetaskrows = (data) => {
    let rows = [];

    Object.values(data).map((row) => {
      rows.push({
        mytasks: row.mytasks,
        tasks: row.tasks,

        columns: {
          ...row.columns,
          Initiator: user
        }
      });
    });

    return rows;
  };
  const handleTaskAction = async (action, partner) => {
    openModal({
      id: action.modalId,
      context: {
        data: partner.mytasks,

        row: partner.tasks,
        actions: action
      }
    });
  };

  React.useEffect(() => {
    if (_.isEmpty(PendingProdcutrow) && _.isEmpty(productrowlist)) {
      // dispatch(Modalclose.close('ProductList'))
    }
  }, [PendingProdcutrow, productrowlist]);
  const handleError = () => {
    dispatch(
      Alert.open({
        type: 'error',
        message: 'Partner Products are not available'
      })
    );
  };

  return (
    <div>
      <Buttonsheet open={true} onClose={onClose} header={'Select Product'}>
        <Grid container direction="column" spacing={5}>
          {!_.isEmpty(PendingProdcutrow) ? (
            <Grid item>
              <Paper elevation={0}>
                <Box pl={2} py={4}>
                  <Typography variant="h4">Pending Products</Typography>
                </Box>
                <Table
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rows={hydratetaskrows(PendingProdcutrow)}
                  columns={PARTNER_TABLE_CONFIG.Mytasks.columns}
                  onRowAction={handleTaskAction}
                />
              </Paper>
            </Grid>
          ) : (
            ''
          )}
          {!_.isEmpty(productrowlist) ? (
            <Grid item>
              <Paper elevation={0}>
                <Box pl={2} py={4}>
                  <Typography variant="h4">Products</Typography>
                </Box>
                <Table
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rows={handleMakerow(productrowlist)}
                  columns={PRODUCT_TABLE.productList.columns}
                  onRowAction={handlaction}
                  BreackRowPoint={true}
                  loader={loader}
                />
              </Paper>
            </Grid>
          ) : loader ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <img src={noDataFound} />
              </Grid>
              <Grid item>
                <Trans id="No Information Available"></Trans>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container direction="column" spacing={6}></Grid>
      </Buttonsheet>
    </div>
  );
};

export default ProductList;

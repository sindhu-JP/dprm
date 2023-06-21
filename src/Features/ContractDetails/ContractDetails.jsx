import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';

import CompanyProfile from './CompanyProfile';
import ContractTable from './ContractTable';

import ButtomDrawer from './BottomSheet';

import PartnerLayout from 'Layouts/Partner';
import { TecnotreedigitalSales } from '../../Http/axios';

import { useSelector } from 'react-redux';
import ViewContract from './ViewContract';
// import Payment from 'Features/Payments';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main
  },
  profile: {
    margin: 10
  }
}));

const ContractDetails = (props) => {
  const classes = useStyles();
  // const [payment, setPayment] = React.useState(initialState);
  const [draweropen, setopen] = React.useState(false);
  const [contractList, setContractList] = React.useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const closedrawer = () => setopen(false);
  const modalState = useSelector((state) => state.modals);
  const handleComponentOpen = () => {
    setopen(true);
  };
  const getRowData = (row) => {
    setSelectedRow(row);
  };

  let data;
  if (Array.isArray(props.location.state.details)) {
    let filteredElement = props.location.state.details.find((item) => {
      if (item.pid !== '') {
        return item;
      }
    });
    data = filteredElement;
  } else {
    data = props.location.state.details;
  }
  let partnerId = data.id;
  let partnerType = data.partnerType;

  const getTableData = (resp) => {
    let rowList = resp.data[0].rowList,
      finalArr = [],
      jsonData = resp.data[0];
    finalArr = rowList.map((row) => {
      let obj = {};
      if (jsonData[row]) {
        jsonData[row].forEach((item) => {
          obj = Object.assign(obj, item);
        });
        return obj;
      }
    });
    return finalArr;
  };

  const getCollectiondata = () => {
    // LoadingSpin(true);
    // API.get(`/list/${val}`)
    TecnotreedigitalSales.get(
      `/list/LINKEDFORM0Z7ZA170?Partner_ID=${partnerId}`
    )
      .then((resp) => {
        let data = [];
        let final = [];
        final = getTableData(resp);
        setDataSource(final);
        // LoadingSpin(false);
      })
      .catch((err) => {
        if (err.response) {
          try {
            // LoadingSpin(false);
            message.error(`${err.response.data.message}`, 1);
          } catch (erry) {
            // LoadingSpin(false);
            message.error(`${erry.message}`, 1);
          }
        }
      });
  };

  const getTenantContractList = () => {
    // LoadingSpin(true);
    // API.get(`/list/${val}`)
    TecnotreedigitalSales.get(
      `/list/LINKEDFORMBO3OUB14?Partner_ID=${partnerId}`
    )
      .then((resp) => {
        let data = [];
        let final = [];
        final = getTableData(resp);
        setDataSource(final);
        // LoadingSpin(false);
      })
      .catch((err) => {
        if (err.response) {
          try {
            // LoadingSpin(false);
            message.error(`${err.response.data.message}`, 1);
          } catch (erry) {
            // LoadingSpin(false);
            message.error(`${erry.message}`, 1);
          }
        }
      });
  };

  useEffect(() => {
    if (partnerType === 'master') {
      getCollectiondata();
    } else if (partnerType === 'tenant') {
      getTenantContractList();
    }
  }, []);

  return (
    <PartnerLayout activeIndex={2}>
      <div className={classes.root}>
        {/* <Navbar /> */}
        <Box
          py={6}
          px={10}
          style={{
            maxHeight: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: '140px',
            paddingRight: '0px',
            paddingLeft: '0px'
          }}
        >
          <Grid container direction="column">
            <Grid></Grid>
            <Grid className={classes.profile}>
              <CompanyProfile rowSignOff={selectedRow} details={data} />
            </Grid>
            {/* <LinkList /> */}
            <Grid className={classes.profile}>
              <ContractTable
                partnerId={data}
                dataSource={dataSource}
                openDrawer={handleComponentOpen}
                rowDetails={getRowData}
              />
            </Grid>
            {/* <Table dataSource={dataSource} /> */}

            {/* <Button onClick={handleComponentOpen}>Click</Button>                    */}
          </Grid>
          {modalState.ButtomDrawer && (
            <ButtomDrawer
              rowSignOff={selectedRow}
              open={modalState.ButtomDrawer}
              close={closedrawer}
              callAPI={true}

              // displayComponent={<ContractSignOff />}
            />
          )}
          {modalState.ViewContract && (
            <>
              <>
                <ViewContract
                  rowSignOff={selectedRow}
                  open={modalState.ViewContract}
                  // close={closedrawer}
                  // contractDetails={contractDetails}
                />
              </>
            </>
          )}
        </Box>

        {/* <Payment payment={true} /> */}
      </div>
    </PartnerLayout>
  );
};

export default ContractDetails;

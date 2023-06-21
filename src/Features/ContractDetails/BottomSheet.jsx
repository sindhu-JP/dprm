import React from 'react';

import { Box, Grid, Drawer, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// import DocumentDetails from './DocumentDetails';
// import Statuses from "lib/constants/statuses";
import ContractSignOff from './ContractSignOff';
import { useDispatch } from 'react-redux';
import Model from 'Store/Modals';
const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(70),
    height: 'auto',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  paper: {
    color: 'white',
    width: '100vw',
    height: '90vh'
  },

  closeIcon: {
    width: theme.spacing(8),
    cursor: 'pointer',
    color: theme.palette.text.primary
  },

  drawer: {
    backgroundColor: theme.palette.background.main
  }
}));
const BottomSheet = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //   const getStatusColor = (status) => {
  //     return Statuses.docStatus[status]?.color || "orange";
  //   };

  const handleClose = () => {
    props.close(false);
  };

  return (
    <div>
      <Drawer
        // anchor="bottom"
        classes={{ paper: classes.paper }}
        open={props.open}
        onClose={props.close}
        anchor={'bottom'}
        style={{ height: '95vh', width: '100vw' }}
      >
        <Box className={classes.drawer}>
          {/* <Box className={classes.progress}></Box> */}
          <Box className={classes.details} p={5}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={4}
                  justify="space-between"
                >
                  <Grid item></Grid>
                  <Grid
                    item
                    onClick={() => dispatch(Model.close('ButtomDrawer'))}
                  >
                    <CloseIcon iconName="close" className={classes.closeIcon} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {/* {props.displayComponent} */}

          <ContractSignOff
            details={props.rowSignOff}
            // openDrawer={handleViewContract}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default BottomSheet;

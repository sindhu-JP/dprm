import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Chip
} from '@material-ui/core';
import { useBoolean, useStateful } from 'react-hanger';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// import LeadProductPrice from "Features/360/components/Customer/Details/LeadProductprice";
import ModalsStore from 'Store/Modals';
import { connect } from 'react-redux';
const ServiceOfInterst = ({
  values,
  user,
  openModal,
  lead,
  openModalvas,
  open,
  isvalid
}) => {
  const classes = useStyles();
  const [lob, setlob] = useState([]);

  const customerDetails = useStateful({});
  const Editproducts = useBoolean(false);

  React.useEffect(() => {
    // let temp = [];
    // if (values) {
    //   let lobs = values.lob?.split(",") || lead.lob.split(",");
    //   temp.push(lobs);
    //   setlob(lobs);
    // }
  }, [values]);

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Box mb={4}>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <ShoppingCartOutlinedIcon fontSize={'large'} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h2" className={classes.title}>
                        Service of Interest
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box py={3}>
          <Grid container spacing={4}>
            {lob?.map((i) => (
              <Grid key={i}>
                <Chip color="primary" label={i} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals,
    leadsState: state.leads,
    usersState: state.users,
    masterdata: state.master.data
  }),
  {
    // openModal: ModalsStore.open,
    openModal: ModalsStore.existingOpenModel,
    openModalvas: ModalsStore.open,
    open: ModalsStore.open
  }
)(ServiceOfInterst);

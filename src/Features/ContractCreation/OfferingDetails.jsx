import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';

// import LeadProductPrice from 'Features/360/components/Customer/Details/LeadProductprice'
import ModalsStore from 'Store/Modals';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import ContractProducts from './ContractProdcuts';

import CreateIcon from '@material-ui/icons/Create';
import DrawerForm from './DrawerFrom';
const OfferingDetails = ({
  values,
  user,
  openModal,
  lead,
  masterdata,
  constractId,
  createContract,
  open,
  onclose,
  submitting,
  error,
  data,
  showbutton,
  oppQuote,
  Buttonlabel,
  isNewContract
}) => {
  const classes = useStyles();

  const [draweropen, setdraweropen] = React.useState(false);

  const [product, setproducts] = React.useState([]);

  const editopportunityCreation = () => {
    openModal({
      id: 'opportunityCreation',

      context: {
        lead: lead,
        user: user
      }
    });
  };
  // const onclose = () => {
  //   setdraweropen(false);
  // };

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
                      <Typography variant="h2" className={classes.title}>
                        Offering Details
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                    spacing={4}
                  >
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                        spacing={4}
                      >
                        <Grid item>
                          <Typography variant="h6" className={classes.title}>
                            Quote ID: {oppQuote?.quoteRef?.id}
                          </Typography>
                        </Grid>

                        <Grid item>
                          <SearchIcon fontSize={'large'} />
                        </Grid>

                        <Grid item>
                          <Grid item>{/* <img src={filter} /> */}</Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.layout}>
          <Grid container direction="column" spacing={6}>
            <Grid item>
              <Box px={6}>
                {!isNewContract ? (
                  <Button
                    endIcon={<CreateIcon />}
                    className={classes.btn}
                    // onClick={() => setdraweropen(true)}
                    onClick={() =>
                      openModal({
                        id: 'buttomsheet'
                      })
                    }
                  >
                    {` Contract ID:${constractId}`}
                  </Button>
                ) : (
                  <Button
                    startIcon={<CreateIcon />}
                    className={classes.btn}
                    onClick={() =>
                      openModal({
                        id: 'buttomsheet'
                      })
                    }
                  >
                    {Buttonlabel}
                  </Button>
                )}
              </Box>
            </Grid>
            {oppQuote && (
              <Grid item>
                {oppQuote &&
                  oppQuote?.products?.map((product) => (
                    <Grid item>
                      <Box px={6} py={3}>
                        <ContractProducts
                          product={product}
                          values={oppQuote?.quote}
                          dataproduct={oppQuote}
                        />
                      </Box>
                    </Grid>
                  ))}

                {oppQuote &&
                  oppQuote?.products.map((product) => (
                    <>
                      {product?.vas?.map((vas) => {
                        return (
                          <Grid item>
                            <Box px={6} py={3}>
                              <ContractProducts
                                product={vas}
                                values={oppQuote?.quote}
                                dataproduct={oppQuote}
                              />
                            </Box>
                          </Grid>
                        );
                      })}
                    </>
                  ))}
              </Grid>
            )}
          </Grid>
        </Box>
        <DrawerForm
          open={open}
          onclose={onclose}
          masterdata={masterdata}
          constractId={constractId}
          createContract={createContract}
          opp={oppQuote}
          leadid={values?.id}
          quoteID={oppQuote?.quoteRef?.id}
          products={oppQuote?.products}
          submitting={submitting}
          error={error}
          data={data}
          showbutton={showbutton}
          isNewContract={isNewContract}
        />
      </Box>
    </Paper>
  );
};
const useStyles = makeStyles((theme) => ({
  border: {
    border: '1px, solid #4933D3'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },

  layout: {
    backgroundColor: '#F3F4F9',
    minHeight: '25rem',
    maxHeight: '30rem',
    overflowY: 'auto',
    overflowX: 'hidden'
  },

  //  buttoncolor:{
  //   fontSize:"16px", color:'#57606F',
  //   fontWeight:600,
  //  },

  btn: {
    // fontFamily: "Manrope",
    // borderColor: "#57606F",
    fontSize: '16px',
    color: '#57606F',
    fontWeight: 600,

    '&:hover': {
      // backgroundColor: "#15e577",
      color: '#1400C8',
      border: '1px solid #1400C8'
    }
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
    openModal: ModalsStore.buttomdraweropen
  }
)(OfferingDetails);

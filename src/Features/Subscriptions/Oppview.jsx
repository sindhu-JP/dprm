import React from 'react';
import { useWatch } from 'react-hook-form';
import { useStateful } from 'react-hanger';
import {
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Offers from '../../OpportunityCreation/Offers';
import { SvgIcon } from 'lib/components';
// import FeasibilityList from "./feasibilityList";
// import FeasibilityCheck from "./FeasibilityCheck";
//import Autocomplete from "lib/components/Autocomplete";
// import ProductCard from './ProductCard';
const Oppview = ({
  control,
  details,
  updateForm,
  formOptions,
  productSearch,
  cart,
  products,
  updateVas,
  selectedVas,
  reloadProducts,
  updateProducts,
  selectedProducts,
  selecttedItems,
  lobkey,
  submitFeasibilityCheck,
  checkstatus,
  Checkfeacibility,
  unseleteditem,
  installationAddress,
  leadsState,
  selecttedVasItems,
  unseletedvasitem,
  updatedvasProducts,
  leadproducts,
  productlists,
  counterdecrement,
  counterincrement,
  lead,
  vascount,
  counter,
  handleLeadClasification,
  handleLeadAssignment,
  captureLead,
  setleadAssignment,
  setleadClassification,
  retainedvas,
  handleLobselection,
  handleunselecion,
  increamnetcount,
  companyname,
  companyreg,
  data
}) => {
  const selectedLobs = useStateful({});
  //   const lobSelection = useWatch({ control, name: "lob" });
  //const [Lobsection, setlob] = React.useState('');
  //const feasibilityCheckRequired = useStateful(false);
  //const classificationvalu = useWatch({ control, name: 'classification' });
  //const classificationLead = useWatch({ control, name: 'leadClassification' });
  //const assignmentLead = useWatch({ control, name: 'leadAssignment' });
  const unselectLob = (lob) => {
    let temp = { ...selectedLobs.value };
    delete temp[lob.code];
    reloadProducts(temp);
    selectedLobs.setValue(temp);
    handleunselecion(lob);
  };
  //     for (let lob in selection) {
  //       let feasibility = FeasibilityList[lob];
  //       if (feasibility?.isFeasible === "YES") {
  //         flag = true;
  //       }
  //     }

  //   const handlechangesearch = (e) => {
  //     if (e.target.value.length >= 3) {
  //       setlob(e.target.value);
  //       productSearch(e.target.value);
  //     }
  //   };
  //   React.useEffect(() => {
  //     if (lobSelection) {
  //       let temp = { ...selectedLobs.value };
  //       if (temp[lobSelection.code]) {
  //         delete temp[lobSelection.code];
  //       } else {
  //         temp[lobSelection.code] = lobSelection;
  //       }

  //       selectedLobs.setValue(temp);
  //     }
  //   }, [lobSelection]);

  React.useEffect(() => {}, []);

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Grid container alignItems="center" justify="space-between">
            <Grid itemxs={4}>
              <Grid container alignItems="center" spacing={4}>
                <Grid item>
                  <SvgIcon iconName="company" />
                </Grid>
                <Grid item>
                  <Typography variant="h2">
                    {`${companyname} - ${companyreg}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {/* <ProductCard data={data} /> */}
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={0}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={4}>
              {/* <Autocomplete
                error={false}
                name="lob"
                options={formOptions.serviceTypes}
                label="LOB"
                variant="standard"
                control={control}
              /> */}

              <TextField
                style={{ width: '400px' }}
                id="standard-basic"
                name="lob"
                fullWidth
                placeholder="Search Order ID, Name"
                InputProps={{
                  disableunderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        fontSize="large"
                        // className={classes.iconSearch}W
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Autocomplete
                error={false}
                name="lob"
                options={formOptions.serviceTypes}
                label="LOB"
                variant="standard"
                control={control}
              /> */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Offers
          cart={cart}
          lead={lead}
          leadproducts={leadproducts}
          products={products}
          counter={counter}
          updateVas={updateVas}
          updatedvasProducts={updatedvasProducts}
          unselectLob={unselectLob}
          selectedVas={selectedVas}
          Checkfeacibility={Checkfeacibility}
          selectedLobs={selectedLobs.value}
          updateProducts={updateProducts}
          selectedProducts={selectedProducts}
          selecttedItems={selecttedItems}
          unseleteditem={unseleteditem}
          selecttedVasItems={selecttedVasItems}
          increamnetcount={increamnetcount}
          unseletedvasitem={unseletedvasitem}
          counterincrement={counterincrement}
          productlists={productlists}
          counterdecrement={counterdecrement}
          vascount={vascount}
          retainedvas={retainedvas}
        />
      </Grid>
    </Grid>
  );
};

Oppview.defaultProps = {
  feasibilityCheckRequired: false
};

export default Oppview;

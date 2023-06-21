import React from "react";
import _ from "lodash";

import { useSelector } from "react-redux";
import { useForm } from "Hooks/Form";
import ResponseParsers from "Http/parsers/res";

import { Radios, AutocompleteDropdown } from "lib/components";
import {
  Box,
  Chip,
  Grid,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const Feasibility = ({ onClose, onSubmit, submitting }) => {
  const classes = useStyles();
  const masterdata = useSelector((state) => state.master.data);
  const [disableButton, setDisableButton] = React.useState(false)
  const [errorState, setError] = React.useState(false)

  const form = useForm({
    initialState: {
      city: "",
      country: "",
      genericDetailsHolder: {},
      stateOrProvince: "",
      addressLine1: "",
    },
    onSuccess: (value) => {
      let response = {}
      response.addressLine1 = value.addressLine1;
      response.landmark = value.landmark;
      response.postcode = value.poBox;
      response.country = value.country.code;
      response.stateOrProvince = value.stateOrProvince.code;
      response.city = value.city.code;

      if (value.addressLine1 && value.poBox && value.country.code && value.stateOrProvince.code && value.city.code !== "") {
        setError(false)
        //   setDisableButton(true)
        onSubmit(response);
      }
      else {
        setError(true)
      }
    },
  });

  return (
    <Box className={classes.root}>
      <Grid container direction="column" className={classes.inner} spacing={6}>
        {errorState ?
          <Grid item>
            <Typography className={classes.errorStateColor}>Please enter the mandatory fields</Typography>
          </Grid> : ""}

        <Grid item>
          <Typography variant="h4">Check Feasibility</Typography>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography className={classes.fontBold} variant="h6">
                Service of Interset
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {/* {lobs?.map((lob, key) => (
                  <Grid item key={key}>
                    <Chip size="medium" label={lob.name} color="secondary" />
                  </Grid>
                ))} */}
                <Grid item>
                  <Chip
                    size="medium"
                    label={"ICT Services"}
                    color="secondary"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid contianer direction="column">

            <Grid item>
              <Typography className={classes.fontBold} variant="h6">
                Enter Installation Address
              </Typography>
            </Grid>
            <Grid item>
              <Radios
                type="single"
                value={["street_format"]}
                options={[
                  {
                    label: "Street Format",
                    value: "street_format",
                  },
                ]}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={form.update}
                    name="addressLine1"
                    value={form.value.addressLine1}
                    fullWidth
                    label="ADDRESS LINE 1"
                  />
                </Grid>

                <Grid item xs={4}>
                  <AutocompleteDropdown
                    name="country"
                    onChange={form.update}
                    label="COUNTRY"
                    value={form.value?.country}
                    options={ResponseParsers.prepareListForDropdownOptions({
                      list: _.get(masterdata, "country", []),
                      nameField: "name",
                      nameKey: "label",
                      codeField: "code",
                      codeKey: "value",
                    })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <AutocompleteDropdown
                    name="stateOrProvince"
                    label="STATE OF ORIGIN"
                    onChange={form.update}
                    value={form.value?.stateOrProvince}
                    options={ResponseParsers.prepareListForDropdownOptions({
                      list: _.get(form.value, "country.province", []),
                      nameField: "name",
                      nameKey: "label",
                      codeField: "code",
                      codeKey: "value",
                    })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <AutocompleteDropdown
                    name="city"
                    label="CITY"
                    value={form.value?.city}
                    onChange={form.update}
                    options={ResponseParsers.prepareListForDropdownOptions({
                      list: _.get(form.value, "stateOrProvince.city", []),
                      nameField: "name",
                      nameKey: "label",
                      codeField: "code",
                      codeKey: "value",
                    })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    required
                    onChange={form.update}
                    name="poBox"
                    value={form.value.poBox}
                    fullWidth
                    label="PO BOX"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="LANDMARK"
                    onChange={form.update}
                    name="landmark"
                    value={form.value.landmark}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justify="flex-end" spacing={4}>
                <Grid item>
                  <Button
                    size="large"
                    color="primary"
                    variant="text"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={form.submit}
                    disabled={disableButton}
                  >
                    {submitting ? "Submitting ... " : "submit"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: "auto",
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4),
  },
  fontBold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  errorStateColor: {
    fontSize: "16px",
    color: "red",
    textAlign: "center"
  }
}));

Feasibility.propTypes = {};
export default Feasibility;

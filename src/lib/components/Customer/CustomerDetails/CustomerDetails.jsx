import React from "react";
import PropTypes from "prop-types";
import { useBoolean } from "react-hanger";
import {
  Collapse,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { SvgIcon, AutocompleteDropdown } from "lib/components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const CustomerDetails = ({
  company = {},
  data = {},
  handleChange,
  leadClassificationChange,
}) => {
  const classes = useStyles();
  const expanded = useBoolean(false);
  
  return (
    <Paper elevation={0}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={7}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item>
              <SvgIcon iconName="company" />
            </Grid>
            <Grid item>
              <Typography className={classes.title} variant="h2">
                {`${company.name} - ${company.registrationNumber}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={5}>
              <AutocompleteDropdown
                name="leadAssignment"
                value={company.leadAssignment}
                options={data.leadAssignments}
                label="LEAD ASSIGNMENT"
                onChange={(e) => handleChange(e, data.leadAssignments)}
              />
            </Grid>
            <Grid item xs={5}>
              <AutocompleteDropdown
                name="leadClassification"
                value={company.leadClassification}
                label="LEAD CLASSIFICATION"
                onChange={(e) =>
                  leadClassificationChange(e, data.leadClassifications)
                }
                options={data.leadClassifications}
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={expanded.toggle}>
                <KeyboardArrowDownIcon
                  className={expanded.value ? classes.expandIconFlipped : ""}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Collapse in={expanded.value} timeout="auto" unmountOnExit>
        <Grid container spacing={6}>
          <Grid item>
            <TextField
              label="Email"
              value={company.leadAssignment?.email}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="MobileNumber"
              value={company.leadAssignment?.mobileNumber}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {},
  expandIconFlipped: {
    transform: "rotateX(180deg)",
  },
}));

CustomerDetails.defaultProps = {
  data: {
    leadClassifications: [],
    leadAssignments: [],
  },
  company: {
    name: "",
    registrationNumber: "",
    leadClassification: {},
    leadAssignment: {},
    email: "",
    mobileNumber: "",
  },
};

CustomerDetails.propTypes = {};
export default CustomerDetails;

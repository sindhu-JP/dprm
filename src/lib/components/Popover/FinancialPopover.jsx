import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";

import DateOfBirthPicker from "../calendar/DateOfBirthPicker";

const style = (theme) => ({
  title: {
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  root: {},
  rootCheckbox: {
    marginTop: 20,
  },
  apply: {
    float: "right",
    background: theme.palette.secondary.main,
    width: 108,
    height: 40,
    borderRadius: 8,
  },
  reset: {
    float: "right",
    background: "transparent",
    width: 108,
    height: 40,
    borderRadius: 8,
  },
  applyTitle: {
    color: "white",
    textTransform: "initial",
  },
  resetTitle: {
    textTransform: "initial",
  },
  footer: {
    marginTop: 40,
  },
  datePciker: {
    marginTop: 20,
  },
  customLabel: {
    textAlign: "left",
    font: "Regular 13px Roboto",
    color: theme.palette.text.primary,
  },
});

const FinanacialPopOver = ({
  classes,
  checkboxValues = [
    { lable: "Unpaid", value: "Unpaid" },
    { lable: "Paid", value: "Paid" },
    { lable: "Partially Paid", value: "Partially Paid" },
  ],
}) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Filters
      </Typography>
      <div className={classes.datePciker}>
        <Typography className={classes.customLabel}>Invoice Date</Typography>
        <Formik
          render={(props) => (
            <Field
              InputLabelProps={{ shrink: true }}
              name="birthDate"
              path="birthDate"
              component={DateOfBirthPicker}
              isExpiryDate={false}
              isIssueDate={false}
              showDefaultInputIcon={false}
              isDob
              fullWidth
              // onChange={e => setFieldValue(birthDate, dayjs(e.target.value).format(constants.dateFormat.dob))}
            />
          )}
        />
      </div>
      <div className={classes.rootCheckbox}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1" className={classes.title}>
            Status
          </Typography>
          <FormGroup>
            {checkboxValues.map((check, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography variant="body1" className={classes.title}>
                      {check.lable}
                    </Typography>
                  }
                  labelPlacement="end"
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.footer}>
        <Button size="small" variant="contained" className={classes.apply}>
          <Typography variant="body1" className={classes.applyTitle}>
            Apply
          </Typography>
        </Button>
        <Button size="small" variant="contained" className={classes.reset}>
          <Typography variant="body1" className={classes.resetTitle}>
            Clear
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default withStyles(style)(FinanacialPopOver);

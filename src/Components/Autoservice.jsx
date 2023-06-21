import React from "react";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import { TextField, Paper, makeStyles } from "@material-ui/core";

const BodyWrapper = ({ children }) => (
  <Paper style={{ padding: 0 }}>{children}</Paper>
);

const Autocomplete = ({
  options,
  label,
  onChange,
  name,
  required,
  value,
  clearlabel,
  ...props
}) => {

  // const onInputChange=(event, newInputValue, reason) => {
  //   if (reason === 'reset') {
 
      
  //   } else {
  //    clearlabel()
      
     
  //   }
  // }
  
  return (
    <MuiAutocomplete
      style={{
        width: "350px",
        //  paddingTop:'20px'
      }}
      options={options}
      getOptionLabel={(option) => `${option?.addressLine1}` || ""}
      value={value}
      required={required}
     
      renderOption={(option) => (

        <React.Fragment>
          {"Address-"} &nbsp;{option?.addressLine1},&nbsp;{option?.postcode}




        </React.Fragment>
      )}
      InputLabelProps={{ required: true }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ required: true }}
          margin={props.margin}
          label={label}
          InputLabelProps={{ required: props.required }}
        />
      )}
      onChange={(e, v) => {
     
        if (v && typeof onChange === "function") {
          onChange({ target: { name, value: v.value, ...v } });
        }
      }}
      {...props}
    />
  );
};

Autocomplete.defaultProps = {
  margin: "none",
};
export default Autocomplete;

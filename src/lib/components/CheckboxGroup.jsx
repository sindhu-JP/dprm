import React from "react";
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

const Checkbox = ({ control, name, label, defaultValue }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value, name, ref, defaultValue }) => (
        <FormControlLabel

          control={
            <MuiCheckbox
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.checked)}
              checked={value}
              inputRef={ref}
              name={name}



            />
          }
          label={label}
        />
      )}
    />
  );
};

Checkbox.propTypes = {};

export default Checkbox;

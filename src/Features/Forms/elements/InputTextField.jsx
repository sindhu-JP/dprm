import React from "react";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

const InputTextField = ({
  label,
  name,
  placeHolder,
  required,
  _handleChange,
}) => {
  return (
    <Field
      placeHolder={placeHolder}
      onChange={_handleChange}
      required={required}
      name={name}
      label={label}
      component={TextField}
      autoComplete="off"
    />
  );
};
export default InputTextField;

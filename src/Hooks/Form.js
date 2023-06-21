import Validator from "validatorjs";
import useSetState from "react-hanger/useSetState";
import set from "lodash/set";
 import React from'react'

export const useForm = ({
  initialState,
  rules,
  options,
  onSuccess,
  address,
  onChange = () => {},
}) => {
  const { state, setState, resetState } = useSetState(  address||initialState );
  const validation = new Validator(state, rules);

//   Basic Usage
// let validation = new Validator(data, rules [, customErrorMessages]);
// data {Object} - The data you want to validate

// rules {Object} - Validation rules

// customErrorMessages {Object} - Optional custom error messages to return

   const [issubmitting, setissubmitting]=React.useState(true)
 

  const update = (event, name) => {
    let temp = { ...state };

    if (event) {
      if (name && typeof name === "string") {
        set(temp, name, event);
      } else {
        set(temp, event.target.name, event.target.value);
      }
    }

    setState(temp);
    onChange(temp);
    setissubmitting(false)
  };

  const submit = (id, data, index) => {
    if (validation.passes && !validation.hasErrors) {


      onSuccess(state, id, data, index);
      
      setissubmitting(true)
    }
  };

  return {
    update,
    submit,
    clear: resetState,
    value: state,
    hasErrors: validation.fails(),
    canSubmit: validation.passes(),
    errors: validation.errors.all(),
    issubmitting:issubmitting
  };
};

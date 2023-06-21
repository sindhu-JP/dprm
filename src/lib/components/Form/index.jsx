import React from "react";
import FormView from "./Form";
import { useSelector, connect } from "react-redux";

import Forms from "Store/Form";

const Form = ({ id, formSchema, updateValues }) => {
  const form = useSelector((state) => state.form.forms[id] || {});

  const handleChange = (values) => {
    if (id) {
      updateValues({
        id,
        fields: Object.keys(values).map((key) => ({
          name: key,
          value: values[key],
        })),
      });
    }
  };
  return (
    <FormView
      formSchema={formSchema}
      values={form.values}
      meta={form.meta}
      fieldOptions={form.fields}
      onChange={handleChange}
    />
  );
};

export default connect(null, {
  updateValues: Forms.updateValues,
})(Form);
